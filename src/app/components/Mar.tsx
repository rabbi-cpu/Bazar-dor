import Marquee from "react-fast-marquee";

interface Marq {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const Mar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Marq[] = await res.json();

  return (
    <div className="bg-base-200 py-4">
      <Marquee speed={150} pauseOnHover>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mx-6 whitespace-nowrap"
          >
            <span className="text-xl">{item.image}</span>

            <span className="font-medium">{item.nameBn}</span>

            <span className="font-bold">
              {item.today}
              টাকা/কেজি
            </span>

            <span
              className={
                item.change.dir === "up"
                  ? "text-green-500 font-semibold"
                  : item.change.dir === "down"
                    ? "text-red-500 font-semibold"
                    : "text-gray-400 font-semibold"
              }
            >
              {item.change.dir === "up"
                ? "▲"
                : item.change.dir === "down"
                  ? "▼"
                  : "●"}{" "}
              {item.change.pct}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Mar;
