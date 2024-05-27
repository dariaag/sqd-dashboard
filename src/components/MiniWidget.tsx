import React from "react";

interface MiniWidgetProps {
  title: string;
  data: [string | number, string | number];
}

const MiniWidget: React.FC<MiniWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white backdrop-filter content-center align-middle backdrop-blur-sm bg-opacity-0 rounded-lg p-2 md:p-4 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-90 w-36 h-20 md:w-44 md:h-24">
      <h2 className="text-2xl md:text-4xl font-normal font-term text-center mb-1 md:mb-2 text-black">
        {title} {data[0]}
      </h2>
      <p className="text-center font-mont text-sm md:text-base">{data[1]}</p>
    </div>
  );
};

export default MiniWidget;
