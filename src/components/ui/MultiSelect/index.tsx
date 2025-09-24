import { useEffect, useRef, useState } from "react";

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  placeholder?: string;
}

interface Option {
  value: string;
  label: string;
}

// Reusable MultiSelect component
const MultiSelect = ({
  options,
  selected,
  onSelectedChange,
  placeholder = "Select items...",
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onSelectedChange(selected.filter((item) => item !== value));
    } else {
      onSelectedChange([...selected, value]);
    }
    setSearchTerm("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-2 py-2 text-left rounded-lg border border-gray-300 text-gray-300 transition-colors duration-200 h-[50px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap gap-2 pr-8">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="flex items-center rounded-md bg-themeBlue-500 px-3 py-1 text-sm font-medium text-white shadow-sm transition-transform duration-200 ease-in-out transform hover:scale-105"
              >
                {label}
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <svg
          className={`h-5 w-5 ml-2 transition-transform duration-200 text-gray-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Popover content */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-2 rounded-lg border border-gray-300 bg-themeWhite-900 shadow-xl overflow-hidden animate-in fade-in-0 slide-in-from-top-1"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-b-gray-300">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 text-sm rounded-md text-themeBlack-80 placeholder-gray-500"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={selected.includes(option.value)}
                  className="flex items-center justify-between px-4 py-2 cursor-pointer transition-colors duration-200"
                  onClick={() => handleToggle(option.value)}
                >
                  <span className="flex-1 text-themeBlack-80">
                    {option.label}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-sm border transition-colors duration-200 flex items-center justify-center ${
                      selected.includes(option.value)
                        ? "bg-blue-600 border-blue-600"
                        : ""
                    }`}
                  >
                    {selected.includes(option.value) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No results found.
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 4px;
          border: 2px solid #1f2937;
        }
      `}</style>
    </div>
  );
};

export default MultiSelect;
