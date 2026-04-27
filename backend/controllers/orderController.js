import Order from '../models/Order.js';
import { sendCustomerConfirmationEmail, sendAdminNotificationEmail } from '../services/emailService.js';

// ✅ GÉNÉRATION PRO DU NUMÉRO
const generateOrderNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(10000 + Math.random() * 90000);
  return `CMD-${date}-${random}`;
};

export const createOrder = async (req, res) => {
  try {
    console.log('\n🔥🔥🔥 CREATE ORDER REQUEST 🔥🔥🔥');
    console.log('📩 Body received:', JSON.stringify(req.body, null, 2));
    console.log('👤 UserId:', req.userId);
    console.log('Token Present:', !!req.headers.authorization);
    
    const { customerName, customerEmail, customerPhone, items, totalAmount, paymentMethod } = req.body;

    // Verify user is authenticated
    if (!req.userId) {
      console.error('❌ User not authenticated - no userId');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('✅ User authenticated:', req.userId);

    // Validation
    if (!customerName) {
      console.error('❌ Missing customerName');
      return res.status(400).json({ message: 'customerName is required' });
    }

    if (!totalAmount) {
      console.error('❌ Missing totalAmount');
      return res.status(400).json({ message: 'totalAmount is required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      console.error('❌ Items invalid:', { isArray: Array.isArray(items), length: items?.length });
      return res.status(400).json({ message: 'items must be a non-empty array' });
    }

    // Normalize item ids to string so local catalog ids (c3, l1...) and Mongo ids both work.
    const normalizedItems = items.map((item) => {
      const rawProductId = item.product_id || item.productId || item.id || item._id || null;
      const normalizedProductId = rawProductId ? String(rawProductId) : null;

      return {
        ...item,
        product_id: normalizedProductId,
        productId: normalizedProductId,
        image: item.image || null,
      };
    });

    console.log('✅ Validation passed');
    console.log('📦 Items details:', normalizedItems.map(i => ({ name: i.name, qty: i.quantity, price: i.price, product_id: i.product_id })));

    // ✅ GÉNÉRER L'ORDERNUMBER ICI
    const orderNumber = generateOrderNumber();
    console.log('🏷️  Generated orderNumber:', orderNumber);

    const newOrder = new Order({
      orderNumber,  // ✅ TOUJOURS PASSÉ
      userId: req.userId,
      customerName,
      customerEmail,
      customerPhone,
      items: normalizedItems,
      totalAmount,
      paymentMethod: paymentMethod || 'whatsapp',
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    console.log('⏳ Saving to MongoDB...');

    await newOrder.save();

    console.log('✅✅✅ Order created successfully!');
    console.log('🎉 Order ID:', newOrder._id);
    console.log('🏷️  Order Number:', newOrder.orderNumber);
    
    return res.status(201).json({
      _id: newOrder._id,
      id: newOrder._id,
      orderNumber: newOrder.orderNumber,
      ...newOrder.toObject()
    });

  } catch (error) {
    console.error('\n❌❌❌ CREATE ORDER ERROR ❌❌❌');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code);
    
    if (error.errors) {
      console.error('Validation Errors:', error.errors);
    }
    
    console.error('Full Error:', error);
    console.error('Stack:', error.stack);

    return res.status(500).json({ 
      message: error.message || 'Server error',
      details: error.message,
      type: error.name,
      code: error.code
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    // Si admin, retourner toutes les commandes
    // Sinon, retourner seulement les commandes de l'utilisateur
    let query = {};
    if (!req.isAdmin) {
      query.userId = req.userId;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    console.error('Get Orders Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (!req.isAdmin && order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Get Order Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    console.log('\n📦 UPDATE ORDER STATUS REQUEST');
    console.log('Order ID:', req.params.id);
    console.log('Updates:', JSON.stringify(req.body, null, 2));
    console.log('IsAdmin:', req.isAdmin);

    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    // Trouver la commande d'abord
    const order = await Order.findById(id);
    if (!order) {
      console.error('❌ Order not found:', id);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Vérifier que c'est un admin
    if (!req.isAdmin) {
      console.error('❌ Unauthorized - not an admin');
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Mettre à jour les statuts
    if (orderStatus) {
      console.log('Updating orderStatus from', order.orderStatus, 'to', orderStatus);
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      console.log('Updating paymentStatus from', order.paymentStatus, 'to', paymentStatus);
      order.paymentStatus = paymentStatus;
    }

    order.updatedAt = new Date();
    await order.save();

    console.log('✅ Order updated successfully');
    return res.json(order);
  } catch (error) {
    console.error('❌ Update Order Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (!req.isAdmin && order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Ne pouvoir annuler que si pending
    if (order.orderStatus !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.orderStatus = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error('Cancel Order Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 📢 Notifier l'admin d'une nouvelle commande payée
export const notifyAdminNewOrder = async (req, res) => {
  try {
    const { orderId, orderNumber, customerName, customerEmail, customerPhone, totalAmount, items, transactionId } = req.body;

    console.log('📢 Notification d\'une nouvelle commande:');
    console.log('Order:', orderNumber);
    console.log('Customer:', customerName, customerPhone);
    console.log('Amount:', totalAmount);

    // Valider les données requises
    if (!orderNumber || !customerName) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['orderNumber', 'customerName']
      });
    }

    // Envoyer les emails de notification
    const emailData = {
      orderId,
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      totalAmount,
      items: items || [],
      transactionId
    };

    let customerEmailSent = false;
    let adminEmailSent = false;

    try {
      await sendCustomerConfirmationEmail(emailData);
      console.log(`✅ Email de confirmation envoyé à ${customerEmail}`);
      customerEmailSent = true;
    } catch (err) {
      console.warn(`⚠️ Erreur lors de l'envoi de l'email au client: ${err.message}`);
    }

    try {
      await sendAdminNotificationEmail(emailData);
      console.log(`✅ Email d'admin envoyé à ${process.env.ADMIN_EMAIL}`);
      adminEmailSent = true;
    } catch (err) {
      console.warn(`⚠️ Erreur lors de l'envoi de l'email à l'admin: ${err.message}`);
    }

    return res.json({ 
      success: true,
      message: 'Admin notified',
      customerEmailSent,
      adminEmailSent
    });

  } catch (error) {
    console.error('Notify Admin Error:', error);
    return res.status(500).json({ 
      message: 'Failed to notify admin',
      error: error.message
    });
  }
};

// 💳 Client confirmer le paiement de sa propre commande (après PayTech)
export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;
    const userId = req.userId;

    console.log('💳 ===== CONFIRM PAYMENT REQUEST =====');
    console.log('Order ID:', id);
    console.log('Transaction ID:', transactionId);
    console.log('User ID:', userId);

    // Validate inputs
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Trouver la commande
    const order = await Order.findById(id);
    if (!order) {
      console.log('❌ Order not found:', id);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('✅ Order found');
    console.log('Current payment status:', order.paymentStatus);
    console.log('Current order status:', order.orderStatus);

    // Vérifier que l'utilisateur est propriétaire de la commande
    if (order.userId.toString() !== userId.toString()) {
      console.error('❌ Unauthorized - user is not the owner');
      return res.status(403).json({ message: 'You can only confirm your own orders' });
    }

    console.log('✅ User is owner of this order');

    // Mettre à jour le statut (utiliser les valeurs enum correctes du schema)
    const previousPaymentStatus = order.paymentStatus;
    const previousOrderStatus = order.orderStatus;

    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    order.transactionId = transactionId || order.transactionId;
    order.updatedAt = new Date();
    
    console.log('💾 Updating order statuses:');
    console.log(`  paymentStatus: ${previousPaymentStatus} → ${order.paymentStatus}`);
    console.log(`  orderStatus: ${previousOrderStatus} → ${order.orderStatus}`);

    await order.save();

    console.log('✅ Order saved successfully');
    console.log('🎉 Payment confirmed for order:', id);

    // Envoyer les emails de confirmation
    try {
      const emailData = {
        orderNumber: order.orderNumber,
        customerName: order.customerName || 'Client',
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone || '',
        totalAmount: order.totalAmount || 0,
        items: order.items || [],
        transactionId: transactionId || order.transactionId,
        paymentMethod: order.paymentMethod || 'PayTech'
      };

      console.log('📧 Sending confirmation emails...');
      await sendCustomerConfirmationEmail(emailData);
      console.log('✅ Customer confirmation email sent');

      await sendAdminNotificationEmail(emailData);
      console.log('✅ Admin notification email sent');
    } catch (emailError) {
      console.warn('⚠️ Error sending confirmation emails:', emailError.message);
      // Pas d'erreur fatale - la confirmation est quand même complète
    }

    return res.json({
      success: true,
      message: 'Payment confirmed successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        transactionId: order.transactionId,
        totalAmount: order.totalAmount
      }
    });

  } catch (error) {
    console.error('❌ ===== CONFIRM PAYMENT ERROR =====');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Stack Trace:', error.stack);
    
    return res.status(500).json({ 
      message: 'Failed to confirm payment',
      error: error.message,
      details: error.toString()
    });
  }
};
