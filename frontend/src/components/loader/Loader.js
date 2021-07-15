import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loading_wraper}>
      <div className={styles.loading}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
