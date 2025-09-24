"use client";
import Image from "next/image";
import React from "react";

const CompanyLogo = () => {
  return (
    <div>
      <Image src="/logo.svg" alt="Company Logo" width={150} height={50} />
    </div>
  );
};

export default CompanyLogo;
