import React from "react";

const ErrorText = (props) => {
  const { error } = props;

  if (error === "") return null;

  return (
    <div
      style={{
        color: "red",
        fontSize: "1rem",
        textAlign: "center"
      }}
    >
      {error}
    </div>
  );
};

export default ErrorText;
