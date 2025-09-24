import React from "react";

const LoadBalancerDetailPage = ({
  heading,
  data,
}: {
  heading: string;
  data: {
    title: string;
    value: string;
  }[];
}) => {
  return (
    <div className="border border-themeBlue-500 px-8 py-6 rounded-2xl">
      <h2 className="title-large">{heading}</h2>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="text-[18px]">{item.title}</div>
            <div className="text-[18px] text-themeBlack-70">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadBalancerDetailPage;
