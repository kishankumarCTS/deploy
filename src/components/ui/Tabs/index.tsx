"use client";

import React, { useState } from "react";
import { Button } from "../Button";

interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
}

type Tab = {
  id: string;
  heading: string;
  content: React.ReactNode;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveId }) => {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || tabs[0]?.id
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 py-3 border-b border-[#00000033]">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeId === tab.id ? "primary" : "tertiary"}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.heading}
          </Button>
        ))}
      </div>

      <div className="mt-6 p-6 rounded-[20px] bg-themeWhite-900">
        {tabs.map(
          (tab) =>
            activeId === tab.id && (
              <div key={tab.id} className="animate-fadeIn">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
