import Image from "next/image";

const stats = [
  {
    title: "Current Billing",
    value: "1,284.00",
    change: "11%",
    icon: "/images/overview/current-billing.svg",
  },
  {
    title: "Monthly Forecast",
    value: "1,284.00",
    change: "11%",
    icon: "/images/overview/monthly-forecast.svg",
  },
  {
    title: "Monthly Consumption",
    value: "1,284.00",
    change: "11%",
    icon: "/images/overview/monthly-consumption.svg",
  },
  {
    title: "Spend Trend",
    value: "1,284.00",
    change: "11%",
    icon: "/images/overview/spend-trend.svg",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-white rounded-2xl shadow p-5 border border-gray-200"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-lg">
            <Image
              src={stat.icon}
              alt={stat.title}
              width={56}
              height={56}
              priority
            />
          </div>

          <div>
            <p
              className="text-[#1D4ED8]"
              style={{
                fontFamily: "Readex Pro, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
              }}
            >
              {stat.title}
            </p>

            <h2
              className="text-[#1D4ED8]"
              style={{
                fontFamily: "Readex Pro, sans-serif",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "32px",
              }}
            >
              {stat.value}
            </h2>

            <div className="flex items-center gap-1">
              <Image
                src="/images/overview/increaseIcon.svg"
                alt="Increase"
                width={12}
                height={12}
              />
              <span
                style={{
                  fontFamily: "Readex Pro, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: "20px",
                  letterSpacing: "0%",
                  color: "#5CC49F",
                }}
              >
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
