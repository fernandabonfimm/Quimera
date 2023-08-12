import React, { createContext, useState } from "react";

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    localStorage.setItem("buttonClicked", true);
  };

  setTimeout(() => {
    localStorage.removeItem("buttonClicked");
  }, 36000000);

  return (
    <ButtonContext.Provider value={{ buttonClicked, handleButtonClick }}>
      {children}
    </ButtonContext.Provider>
  );
};

export { ButtonContext, ButtonProvider };
