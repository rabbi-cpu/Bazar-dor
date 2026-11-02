
import Link from "next/link";

interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoriesProps {
  activeSlug?: string;
}

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/categories";

async function getCategories(): Promise<Category[]> {
  const res = await fetch(API_URL, {
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

const Categories = async ({ activeSlug }: CategoriesProps) => {
  const categories = await getCategories();

  return (
    <nav className="border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-8">

        {/* All Products */}
        <Link
          href="/#all-products"
          className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium transition ${
            !activeSlug
              ? "bg-green-100 text-green-800"
              : "text-gray-700 hover:bg-green-50 hover:text-green-700"
          }`}
        >
          🛒 সব পণ্য
        </Link>

        {/* Category Items */}
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?category=${encodeURIComponent(
              category.slug,
            )}#all-products`}
            className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium transition ${
              activeSlug === category.slug
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            {category.icon} {category.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Categories;
