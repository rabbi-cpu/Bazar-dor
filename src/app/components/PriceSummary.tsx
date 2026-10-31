
interface PriceSummaryProps {
  minPrice: number;
  maxPrice: number;
  todayPrice: number;
}

const PriceSummary = ({
  minPrice,
  maxPrice,
  todayPrice,
}: PriceSummaryProps) => {
  const summaries = [
    {
      label: "সর্বনিম্ন বাজারদর",
      price: minPrice,
      color: "text-green-700",
      background: "bg-green-50",
    },
    {
      label: "আজকের দাম",
      price: todayPrice,
      color: "text-blue-700",
      background: "bg-blue-50",
    },
    {
      label: "সর্বোচ্চ বাজারদর",
      price: maxPrice,
      color: "text-orange-700",
      background: "bg-orange-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {summaries.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl border border-gray-100 p-5 ${item.background}`}
        >
          <p className="text-sm text-gray-600">{item.label}</p>

          <p className={`mt-2 text-2xl font-bold ${item.color}`}>
            ৳{item.price}
            <span className="ml-1 text-sm font-normal">/ কেজি</span>
          </p>
        </div>
      ))}
    </section>
  );
};

export default PriceSummary;
