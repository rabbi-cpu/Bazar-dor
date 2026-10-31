"use client"
import Image from "next/image";
import image from "@/app/assets/bazar-hero.png";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-2 mt-2 flex flex-col items-center justify-between gap-10 rounded-2xl bg-white px-6 py-6 shadow-xl shadow-gray-200/70 sm:mx-4 sm:px-8 md:mx-6 md:flex-row md:gap-10 md:px-12 lg:mx-10 lg:px-16">
      <div className="flex-1">
        <p className="inline-block rounded-lg bg-green-100 px-3 py-1 font-medium text-green-700">
          {date}
        </p>

        <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-2xl lg:text-3xl">
          আজকের বাজারের দাম এক নজরে
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button
          type="button"
          onClick={() => {
            document.getElementById("all-products")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="btn mt-6 border-green-600 bg-green-600 text-white hover:bg-green-700"
        >
          সব পণ্য দেখুন
        </button>
      </div>

      <div className="w-full flex-1">
        <Image
          src={image}
          alt="বাজার দর Hero"
          width={550}
          height={550}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;
