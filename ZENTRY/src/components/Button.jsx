import React from "react";

function Button({
  children, //children is nothing just text for that button
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props //rest of the properties
}) {
  return (
    <Button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default Button;
