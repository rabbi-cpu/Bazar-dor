
import ProductCard, { type Product } from "./ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductSection = ({
  title,
  subtitle,
  products,
}: ProductSectionProps) => {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
          {products.length}টি পণ্য
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
