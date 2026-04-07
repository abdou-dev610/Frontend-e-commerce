import { Link } from "react-router-dom";

const cats = [
  { name: "Lacostes", emoji: "👕" },
  { name: "Chaussures", emoji: "👟" },
  { name: "Abayas", emoji: "👗" },
  { name: "Qamis", emoji: "🕌" },
  { name: "Pullovers", emoji: "🧥" },
  { name: "Ensembles", emoji: "🧢" },
];

const CategoryBanner = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Nos Catégories
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {cats.map((c) => (
          <Link
            key={c.name}
            to={`/produits?cat=${encodeURIComponent(c.name)}`}
            className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background border border-border hover:border-primary hover:shadow-md transition-all group"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{c.emoji}</span>
            <span className="text-sm font-medium text-foreground">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryBanner;
