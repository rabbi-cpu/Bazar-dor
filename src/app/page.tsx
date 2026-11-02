import Banner from "./components/Banner";
import Products from "./components/Products";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;

  return (
    <>
      {!category && <Banner />}

      <Products categorySlug={category} />
    </>
  );
}