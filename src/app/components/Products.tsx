
import ProductSection from "./ProductSection";
import type { Product } from "./ProductCard";

interface ProductsProps {
  categorySlug?: string;
}

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Products API থেকে data আনা যায়নি।");
  }

  const result: unknown = await res.json();

  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (typeof result === "object" && result !== null) {
    const data = result as {
      data?: unknown;
      products?: unknown;
    };

    if (Array.isArray(data.data)) {
      return data.data as Product[];
    }

    if (Array.isArray(data.products)) {
      return data.products as Product[];
    }
  }

  return [];
}

const Products = async ({ categorySlug }: ProductsProps) => {
  const products = await getProducts();

  // Category অনুযায়ী product filter
  const filteredProducts = categorySlug
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          categorySlug.toLowerCase(),
      )
    : products;

  // যেসব product-এর দাম বেড়েছে
  const increasedProducts = filteredProducts.filter(
    (product) => product.change?.dir === "up",
  );

  // যেসব product-এর দাম কমেছে
  const decreasedProducts = filteredProducts.filter(
    (product) => product.change?.dir === "down",
  );

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-8">
      {/* দাম বেড়েছে */}
      {!categorySlug && (
        <ProductSection
          title="🔺 আজ দাম বেড়েছে"
          subtitle="যেসব পণ্যের দাম বেড়েছে"
          products={increasedProducts}
        />
      )}

      {/* দাম কমেছে */}
      {!categorySlug && (
        <ProductSection
          title="🔻 আজ দাম কমেছে"
          subtitle="যেসব পণ্যের দাম কমেছে"
          products={decreasedProducts}
        />
      )}

      {/* সব পণ্য অথবা নির্বাচিত category-এর পণ্য */}
      <section id="all-products" className="scroll-mt-24">
        <ProductSection
          title={
            categorySlug
              ? "🛒 নির্বাচিত বিভাগের পণ্য"
              : "🛒 সব পণ্য"
          }
          subtitle={`মোট ${filteredProducts.length}টি পণ্যের আজকের বাজারদর`}
          products={filteredProducts}
        />
      </section>
    </main>
  );
};

export default Products;
