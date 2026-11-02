
"use client";

import { useMemo, useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  showHeader?: boolean;
  showCount?: boolean;
}

const ProductSection = ({
  title,
  subtitle,
  products,
  showHeader = true,
  showCount = true,
}: ProductSectionProps) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortBy === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.nameBn.localeCompare(b.nameBn, "bn"),
      );
    }

    return result;
  }, [products, sortBy]);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      {showHeader && (
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="text-4xl">
            {title.includes("দাম বেড়েছে")
              ? "🔺"
              : title.includes("দাম কমেছে")
                ? "🔻"
                : "🛒"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {title}
            </h2>

            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Product Count + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {showCount ? (
          <p className="text-sm text-gray-600">
            মোট{" "}
            {products.length.toLocaleString("bn-BD")}টি পণ্য
            দেখানো হচ্ছে
          </p>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-sm text-gray-600"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
className="select select-sm min-w-40 rounded-xl border border-gray-200 bg-white px-3 text-center text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"          >
            <option value="default">ডিফল্ট</option>

            <option value="low-to-high">
              দাম: কম থেকে বেশি
            </option>

            <option value="high-to-low">
              দাম: বেশি থেকে কম
            </option>

           
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white  text-center">
          
        </div>
      )}
    </section>
  );
};

export default ProductSection;
