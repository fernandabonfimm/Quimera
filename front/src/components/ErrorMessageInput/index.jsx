import React from "react";
import './styles.css'
const ErrorMessageInput = ({children}) => {
    return(
        <span className="error-message">{children}</span>
    );
};
export default ErrorMessageInput;