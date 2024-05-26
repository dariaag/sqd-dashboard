import React from "react";

interface MiniWidgetProps {
  title: string;
  data: string | number;
}

const MiniWidget: React.FC<MiniWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white backdrop-filter	content-center align-middle	 backdrop-blur-sm bg-opacity-0  rounded-lg p-4 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-90 w-44 h-24">
      <h2 className="text-2xl font-normal text-center mb-2 font-mont text-black">
        {title} {data}
      </h2>
    </div>
  );
};

export default MiniWidget;
