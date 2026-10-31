
import type { MarketPrice } from "./ProductCard";

interface MarketPriceTableProps {
  prices: MarketPrice[];
}

const MarketPriceTable = ({ prices }: MarketPriceTableProps) => {
  if (!prices || prices.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 p-6 text-center text-gray-500">
        এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-600px text-left text-sm">
          <thead className="bg-green-50 text-gray-700">
            <tr>
              <th className="px-5 py-4 font-semibold">বাজার</th>
              <th className="px-5 py-4 font-semibold">বিভাগ</th>
              <th className="px-5 py-4 text-right font-semibold">
                সর্বনিম্ন
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                সর্বোচ্চ
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {prices.map((item, index) => (
              <tr
                key={`${item.market}-${item.division}-${index}`}
                className="transition hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium text-gray-800">
                  {item.market}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {item.division}
                </td>

                <td className="px-5 py-4 text-right font-semibold text-green-700">
                  ৳{item.min}
                </td>

                <td className="px-5 py-4 text-right font-semibold text-orange-600">
                  ৳{item.max}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPriceTable;
