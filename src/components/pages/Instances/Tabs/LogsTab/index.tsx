"use client";

import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/CommonInput";
import { Separator } from "@/components/ui/Separator";
import { useEffect, useRef, useState } from "react";
import { FaExpandAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDownload } from "react-icons/md";

function LogsTab() {
  const [logs, setLogs] = useState([]);
  const [logsLength, setLogsLength] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const logsWrapperRef = useRef<HTMLDivElement | null>(null);
  //fetching logs

  const handleChangeLogs = (value: any) => {
    setLogsLength(value);
  };

  const handleEnterFullscreen = () => {
    if (logsWrapperRef.current) {
      logsWrapperRef.current.requestFullscreen();
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3 mb-4">
          <InputField
            type="number"
            placeholder="Enter log length"
            value={logsLength}
            onChange={handleChangeLogs}
            labelClassName="hidden"
            inputClassName="!p-2"
          />
          <Button variant="square" onClick={() => {}} classNames="!py-2 !px-4">
            Fetch Logs
          </Button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <button
            className="py-2 px-4 text-primary rounded-md border-2 border-themeBlue-500 cursor-pointer"
            onClick={() => {}}
          >
            <MdDownload size={18} />
          </button>
          <button
            className="py-2 px-4 text-primary rounded-md border-2 border-themeBlue-500 cursor-pointer"
            onClick={() => {
              handleEnterFullscreen();
            }}
          >
            <FaExpandAlt size={18} />
          </button>
        </div>
      </div>
      <div
        className={`min-h-[500px] py-3 px-2 text-themeGray-500 bg-themeGray-400 opacity-80 rounded-lg ${
          isFullScreen ? "!p-6 bg-themeWhite-900 opacity-100" : ""
        }`}
        ref={logsWrapperRef}
      >
        {isFullScreen && (
          <>
            <div className="flex justify-between items-center gap-3 mb-4">
              <h2 className="title-large">Logs</h2>
              <button
                className="h-full text-error cursor-pointer"
                onClick={() => {
                  handleExitFullscreen();
                }}
              >
                <IoMdClose size={20} />
              </button>
            </div>
            <Separator />
          </>
        )}
        <div
          className={`${
            isFullScreen
              ? " min-h-[500px] mt-4 py-3 px-2 bg-themeGray-400 opacity-80 rounded-lg"
              : ""
          }`}
        >
          {logs.length > 0 ? "logs data" : "No logs found"}
        </div>
      </div>
    </div>
  );
}

export default LogsTab;
