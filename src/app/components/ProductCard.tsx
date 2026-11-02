
import Link from "next/link";

export interface Product {
  id: number | string;
  nameBn: string;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Product Name */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 transition group-hover:text-green-700">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          আজকের দাম
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-gray-900">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>

          {/* Price Change */}
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
              isUp
                ? "bg-red-50 text-red-600"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp
              ? "▲"
              : isDown
                ? "▼"
                : "—"}{" "}
            {product.change?.pct.toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
