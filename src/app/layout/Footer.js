import React from "react";

const Footer = () => {
  const styles = {
    containerStyle: {
      position: "fixed",
      left: 0,
      bottom: 0,
      right: 0,
      background: "#232020",
      padding: "5px 10px",
      width: "100%",
    },
    textStyle: {
      fontFamily: "OCR A Std, monospace",
      fontSize: "10px",
      color: "#fff",
    },
  };
  return (
    <div style={styles.containerStyle}>
      <p style={styles.textStyle}>aatbip development, 2022</p>
    </div>
  );
};

export default Footer;
