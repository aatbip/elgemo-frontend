import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const styles = {
    h1Style: {
      fontFamily: "OCR A Std, monospace",
      fontSize: "50px",
      color: "#fff",
    },

    containerStyle: {
      backgroundColor: "#232020",
    },
  };

  const { total, room } = useSelector((store) => store.socket);

  return (
    <div style={styles.containerStyle} className="container">
      <div className="wrapper">
        <h1 style={styles.h1Style}>ELGEMO</h1>
        {room && <p style={{ color: "#fff" }}>{total}+ users active now</p>}
      </div>
    </div>
  );
};

export default Header;
