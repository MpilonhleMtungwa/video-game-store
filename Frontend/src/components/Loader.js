import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="white"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    backgroundColor: "#000",
  },
};

export default Loader;
