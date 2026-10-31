
import Link from "next/link";
import type { Product } from "./ProductCard";
import MarketPriceTable from "./MarketPriceTable";

interface ProductDetailsProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  // বাজারের min ও max-এর মধ্যবিন্দুর গড়।
  // এটি API-এর প্রকৃত average নয়।
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  const changeDir = product.change?.dir ?? "flat";
  const changePct = product.change?.pct ?? 0;

  const changeColor =
    changeDir === "up"
      ? "text-red-600"
      : changeDir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changeText =
    changeDir === "up"
      ? "গতকালের তুলনায় আজ দাম বেড়েছে"
      : changeDir === "down"
        ? "গতকালের তুলনায় আজ দাম কমেছে"
        : "গতকালের তুলনায় আজ দামের পরিবর্তন নেই";

  const unit =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "piece"
        ? "পিস"
        : product.unit;

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-6 text-gray-900 md:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <span>{product.categoryNameBn}</span>

          <span>›</span>

          <span className="font-medium text-gray-900">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-[#dce7dc] bg-[#fbfdfb] p-4 md:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-3xl sm:h-16 sm:w-16">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="text-sm text-gray-600">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                {changeText}{" "}
                <span className={changeColor}>
                  {changeDir === "up"
                    ? "▲"
                    : changeDir === "down"
                      ? "▼"
                      : "●"}{" "}
                  {formatPrice(changePct)}%
                </span>
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-[#eff5ef] px-3 py-3 text-center sm:min-w-24 sm:px-5">
              <p className="text-xs text-gray-600">আজকের দাম</p>

              <p className="text-2xl font-bold sm:text-3xl">
                {formatPrice(product.today)}
              </p>

              <p className="text-xs text-gray-600">
                টাকা / {unit}
              </p>

              <p className={`mt-1 text-xs ${changeColor}`}>
                {changeDir === "up"
                  ? "▲"
                  : changeDir === "down"
                    ? "▼"
                    : "●"}{" "}
                {formatPrice(changePct)}%
              </p>
            </div>
          </div>
        </section>

        {/* Market Summary */}
        <section className="rounded-2xl border border-[#dce7dc] bg-[#fbfdfb] p-4 md:p-5">
          <h2 className="mb-3 text-lg font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-xl border border-[#dce7dc] p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatPrice(minPrice)} টাকা
              </p>

              <p className="text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dce7dc] p-4">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </p>

              <p className="text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dce7dc] p-4">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatPrice(averagePrice)} টাকা
              </p>

              <p className="text-xs text-gray-500">
                প্রতি {unit}-এর আনুমানিক মধ্যবিন্দুর গড়
              </p>
            </div>
          </div>

          {/* Market-wise Prices */}
          <div className="mt-5">
            <h2 className="mb-3 text-lg font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-hidden rounded-xl border border-[#dce7dc]">
              {markets.length > 0 ? (
                <MarketPriceTable prices={markets} />
              ) : (
                <p className="p-6 text-center text-sm text-gray-500">
                  এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
