import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { auth } from "@/lib/Auth";
import ProductDetails from "@/app/components/ProductDetails";
import type { Product } from "@/app/components/ProductCard";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Product API থেকে data আনা যায়নি।");
  }

  const result = await res.json();

  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (Array.isArray(result.data)) {
    return result.data as Product[];
  }

  if (Array.isArray(result.products)) {
    return result.products as Product[];
  }

  return [];
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Check logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Login না থাকলে Sign In page-এ পাঠাবে
  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${id}`)}`);
  }

  // User login করা থাকলে product data আনবে
  const products = await getProducts();

  const product = products.find(
    (item) => String(item.id) === id,
  );

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}