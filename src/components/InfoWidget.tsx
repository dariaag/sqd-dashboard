import React from "react";

interface InfoWidgetProps {
  title: string;
  data: Record<string, string | number>;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ title, data }) => {
  return (
    <div className="bg-white lg:grow font-mont backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg p-2 md:p-4 shadow-md transition-transform duration-200 transform sm:w-full  h-auto md:h-45">
      <h2 className="text-xl md:text-2xl font-pixeboy mb-0 text-black">
        {title}
      </h2>
      <hr className="my-2 border-none"></hr>
      <div className=" space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-sm md:text-xl text-black">
            {value.toString().includes("%") &&
            value.toString().includes("-") ? (
              <span className="text-sm font-mont inline-block py-1 px-3  mt-2 rounded-full text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
                <strong>{key}:</strong> {value}
              </span>
            ) : value.toString().includes("%") ? (
              <span className="text-sm font-mont inline-block py-1 px-2  mt-2 rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
                <strong>{key}:</strong> {value}
              </span>
            ) : (
              <span className="text-sm font-mont inline-block py-1 px-2  mt-2 rounded-full text-black-600 bg-gray-100 uppercase last:mr-0 mr-1">
                <strong>{key}:</strong> {value}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoWidget;
