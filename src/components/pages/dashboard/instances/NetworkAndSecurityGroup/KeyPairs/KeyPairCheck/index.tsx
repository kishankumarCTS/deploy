import React from "react";
import { KeyPair } from "../SelectKeyPair";

const KeyPairCheck = ({ keyPair }: { keyPair: KeyPair }) => {
  return (
    <div className="mt-3 border border-themeBlue-500 h-[62px] flex gap-3 items-center text-themeBlue-500 px-4 rounded-[10px]">
      <input
        type="checkbox"
        name="key-pair"
        id="key-pair"
        checked={true}
        onChange={() => {}}
      />
      <div>{keyPair.name}</div>
    </div>
  );
};

export default KeyPairCheck;
