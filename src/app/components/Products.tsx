import ProductSection from "./ProductSection";
import type { Product } from "./ProductCard";

interface ProductsProps {
  categorySlug?: string;
}

interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

const PRODUCTS_API =
  "https://openapi.programming-hero.com/api/bazardor/products";

const CATEGORIES_API =
  "https://api.api-store.workers.dev/api/bazardor/categories";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(PRODUCTS_API, {
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

async function getCategories(): Promise<Category[]> {
  const res = await fetch(CATEGORIES_API, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Categories API থেকে data আনা যায়নি।");
  }

  const result = await res.json();

  const categories = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.categories)
        ? result.categories
        : [];

  return categories as Category[];
}

const Products = async ({ categorySlug }: ProductsProps) => {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Selected category
  const selectedCategory = categories.find(
    (category) => category.slug.toLowerCase() === categorySlug?.toLowerCase(),
  );

  // Filter products
  const filteredProducts = categorySlug
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === categorySlug.toLowerCase(),
      )
    : products;

  // Price increased
  const increasedProducts = filteredProducts.filter(
    (product) => product.change?.dir === "up",
  );

  // Price decreased
  const decreasedProducts = filteredProducts.filter(
    (product) => product.change?.dir === "down",
  );

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-8">
      {/* Price Increased */}
      {!categorySlug && (
        <ProductSection
          title="🔺 আজ দাম বেড়েছে"
          subtitle="যেসব পণ্যের দাম বেড়েছে"
          products={increasedProducts}
        />
      )}

      {/* Price Decreased */}
      {!categorySlug && (
        <ProductSection
          title="🔻 আজ দাম কমেছে"
          subtitle="যেসব পণ্যের দাম কমেছে"
          products={decreasedProducts}
        />
      )}

      {/* Category Header */}
      <section id="all-products" className="scroll-mt-40 space-y-6">
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {selectedCategory?.icon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory?.nameBn || "সব পণ্য"}
              </h1>
              <p className="text-sm text-gray-600">
            মোট{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length.toLocaleString("bn-BD")}
            </span>{" "}
            টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
            
            </div>
          </div>
        </div>

        {/* Product Count */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            মোট{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length.toLocaleString("bn-BD")}
            </span>{" "}
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        <ProductSection
          title=""
          subtitle=""
          products={filteredProducts}
          showHeader={false}
          showCount={false}
        />
      </section>
    </main>
  );
};

export default Products;
