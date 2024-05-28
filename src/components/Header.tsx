// components/Header.tsx
import React, { useState } from "react";

const Header = ({ onToggleScene }) => {
  const [isSceneVisible, setIsSceneVisible] = useState(false);

  const handleToggle = () => {
    setIsSceneVisible(!isSceneVisible);
    onToggleScene(!isSceneVisible);
  };

  return (
    <header className="flex items-center bg-black p-2 bg-opacity-0 z-20">
      <button
        className={`flex items-center justify-center w-8 h-8 ml-2 rounded-full ${
          isSceneVisible ? "bg-pink-500" : "bg-orange-500"
        }`}
        onClick={handleToggle}
      >
        <span className="text-white text-xl">
          {isSceneVisible ? "🙈" : "👀"}
        </span>
      </button>
    </header>
  );
};

export default Header;
