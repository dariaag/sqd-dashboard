import React from "react";

interface MiniWidgetProps {
  title: string;
  data: [string | number, string | number];
}

const MiniWidget: React.FC<MiniWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white backdrop-filter	content-center align-middle	 backdrop-blur-sm bg-opacity-0  rounded-lg p-4 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-90 w-44 h-24">
      <h2 className="text-4xl font-normal font-term text-center mb-2  text-black">
        {title} {data[0]}
      </h2>{" "}
      <p className="text-center font-mont">{data[1]}</p>
    </div>
  );
};

export default MiniWidget;
