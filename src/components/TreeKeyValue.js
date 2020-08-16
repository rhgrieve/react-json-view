import React from "react";
import { StyleSheet, css } from "aphrodite";

import TreeKey from "./TreeKey";
import displayValue from "../utils/displayValue";

const TreeKeyValue = ({ objectKey, value, query }) => {
  const valueStyle =
    value === null
      ? css(styles.value, styles.nullStyle)
      : css(styles.value, styles[typeof value]);

  return (
    <p className={css(styles.gray, styles.subelement)}>
      <TreeKey query={query} text={objectKey} />
      <span className={valueStyle}>{displayValue(value)}</span>
    </p>
  );
};

export default React.memo(TreeKeyValue);

const styles = StyleSheet.create({
  gray: {
    color: "#495057"
  },
  subelement: {
    // display: "inline-block"
    // padding: "0.2em 0.5em"
  },
  value: {
    borderRadius: "0.5em",
    padding: "0.2em",
    width: "auto",
    cursor: "pointer",
    ":hover": {
      background: "#EFE4F4"
    },
    display: "inline-block"
  },
  number: {
    color: "#e63946"
  },
  string: {
    color: "#457b9d"
  },
  boolean: {
    color: "#e76f51"
  },
  nullStyle: {
    color: "#aaa"
  }
  // bold: {
  //   fontWeight: "bold",
  //   backgroundColor: "#FEF9B8",
  //   borderRadius: "0.2em"
  // },
  // spacing: {
  //   padding: "0.2em 0"
  // }
});

//
