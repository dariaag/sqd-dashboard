import React from "react";

interface InfoWidgetProps {
  title: string;
  data: Record<string, string | number>;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white font-mont backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-2 md:p-4 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-90 w-full sm:w-64 h-auto md:h-45">
      <h2 className="text-xl md:text-2xl font-pixeboy mb-2 text-black">
        {title}
      </h2>
      <hr className="border-none" />
      <div className="mt-2 space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-sm md:text-xl text-black">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoWidget;
