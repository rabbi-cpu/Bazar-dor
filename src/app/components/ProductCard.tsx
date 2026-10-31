
import Link from "next/link";

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: string | number;
  nameBn: string;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  image: string;
  slug: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  markets: MarketPrice[];
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {product.change.pct}%
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {product.categoryNameBn}
      </p>

      <h3 className="mt-1 text-lg font-bold text-gray-800 transition group-hover:text-green-700">
        {product.nameBn}
      </h3>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-2xl font-bold text-green-700">
            ৳{product.today}
            <span className="ml-1 text-sm font-normal text-gray-500">
              / {product.unit === "kg" ? "কেজি" : product.unit}
            </span>
          </p>
        </div>

        <span className="text-sm font-medium text-green-700">
          বিস্তারিত →
        </span>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
        গতকাল: ৳{product.yesterday}
      </div>
    </Link>
  );
};

export default ProductCard;
