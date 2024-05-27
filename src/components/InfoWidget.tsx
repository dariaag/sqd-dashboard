import React from "react";

interface InfoWidgetProps {
  title: string;
  data: Record<string, string | number>;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white font-mont backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-4 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-90 w-64 h-45">
      <h2 className="text-2xl font-pixeboy  mb-2 text-black">{title}</h2>
      <hr className="border-none" />
      <div className="mt-2 space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-xl ">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoWidget;
