import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "@supabase/supabase-js/cors";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, payment_method, description } = await req.json();

    if (!amount || !payment_method) {
      return new Response(
        JSON.stringify({ error: "amount and payment_method are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PAYTECH_API_KEY = Deno.env.get("PAYTECH_API_KEY");
    const PAYTECH_SECRET_KEY = Deno.env.get("PAYTECH_SECRET_KEY");

    if (!PAYTECH_API_KEY || !PAYTECH_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Paytech credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call Paytech API
    const paytechResponse = await fetch("https://paytech.sn/api/payment/request-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API_KEY": PAYTECH_API_KEY,
        "API_SECRET": PAYTECH_SECRET_KEY,
      },
      body: JSON.stringify({
        item_name: description || "Commande Boutique Fashion",
        item_price: amount.toString(),
        currency: "XOF",
        ref_command: `BF-${Date.now()}`,
        command_name: description || "Commande Boutique Fashion",
        env: "prod",
        success_url: `${req.headers.get("origin") || "https://boutique-fashion.lovable.app"}/`,
        cancel_url: `${req.headers.get("origin") || "https://boutique-fashion.lovable.app"}/panier`,
        custom_field: JSON.stringify({ payment_method }),
      }),
    });

    const paytechData = await paytechResponse.json();

    if (paytechData.success === 1 || paytechData.redirect_url) {
      return new Response(
        JSON.stringify({ redirect_url: paytechData.redirect_url || paytechData.payment_url }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Payment initiation failed", details: paytechData }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
