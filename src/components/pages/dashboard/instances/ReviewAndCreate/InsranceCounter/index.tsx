"use client";

import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

const InstanceCounter = () => {
  const limit = 10;
  const [counter, setCounter] = useState(0);

  const handleCounter = (type: string) => {
    if (type === "increment" && counter < limit) {
      setCounter((prev) => prev + 1);
    }
    if (type === "decrement" && counter > 1) {
      setCounter((prev) => prev - 1);
    }
  };
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="text-[18px] font-[500]">Number of Instances</div>
      <div className="flex items-center gap-8 justify-between bg-themeBlue-50 p-2 rounded-xl">
        <button
          className="flex items-center justify-center w-[56px] aspect-square bg-themeBlue-100 rounded-xl text-xl cursor-pointer"
          onClick={() => handleCounter("decrement")}
          disabled={counter <= 1}
        >
          <FaMinus />
        </button>
        <div className="title-large">{counter}</div>
        <button
          className="flex items-center justify-center w-[56px] aspect-square bg-themeBlue-100 rounded-xl text-2xl cursor-pointer"
          onClick={() => handleCounter("increment")}
          disabled={counter >= 10}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default InstanceCounter;
