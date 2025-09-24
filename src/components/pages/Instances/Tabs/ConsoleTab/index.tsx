"use client";

import { useRef } from "react";

function ConsoleTab() {
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const handleEnterFullscreen = () => {
    if (consoleRef.current) {
      consoleRef.current.requestFullscreen();
    }
  };
  return (
    <div>
      <div className="p-4 bg-themeGray-400 rounded-lg opacity-80">
        <p>
          If console is not responding to keyboard input: click the gray status
          bar below.{" "}
          <button
            className="text-error text-opacity-80 cursor-pointer"
            onClick={handleEnterFullscreen}
          >
            Click here to show only console
          </button>
        </p>
        <p>
          To exit the fullscreen mode, click the browser&apos;s back button.
        </p>
      </div>
      <div ref={consoleRef}>
        <iframe
          id="console-frame"
          title="console-frame"
          width="100%"
          height="400px"
          src="https://console-noi.acecloud.ai:13080/vnc_auto.html?path=%3Ftoken%3Ftoken%3Dcd74107c-96b1-4753-8988-0519c4cf5d38"
        ></iframe>
      </div>
    </div>
  );
}

export default ConsoleTab;
