import React from "react";
import styles from "./styles.css";

interface TitleProps {
  title: string;
}

const Title = ({
  title
}: TitleProps) => {
  return (
    <h2 className={styles["product-comparator-title"]}>
      {title}
    </h2>
  );
}

export default Title;
