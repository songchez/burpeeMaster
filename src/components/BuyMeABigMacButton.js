import React from "react";

function BuyMeABigMac() {
  return (
    <div>
      <strong className="text-yellow-400">
        유용하셨다면 개발자에게 탄단지가 완벽한 빅맥을 사주세요!
      </strong>
      <a
        href="https://www.buymeacoffee.com/tama4840X"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-white bg-[#FFB533] rounded-lg border border-transparent px-6 py-3 text-lg font-bold shadow-md transition-all duration-300 ease-in-out hover:bg-[#FFA726] hover:shadow-lg hover:opacity-90 cursor-pointer"
      >
        <p className="text-xl mr-3">🍔</p>
        <span className="text-xl font-bold">Buy me a Big Mac</span>
      </a>
    </div>
  );
}

export default BuyMeABigMac;
