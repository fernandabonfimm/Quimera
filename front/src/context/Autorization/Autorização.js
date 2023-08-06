import React, { createContext, useState } from "react";

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <ButtonContext.Provider value={{ buttonClicked, handleButtonClick }}>
      {children}
    </ButtonContext.Provider>
  );
};

export { ButtonContext, ButtonProvider };
