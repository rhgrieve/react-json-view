import React from "react";
import { StyleSheet, css } from "aphrodite";
// import Clipboard from "clipboard";

// import { useAlert } from "react-alert";

import { TreeKey } from "./TreeKey";

export const TreeKeyValue = ({ objectKey, value, query }) => {
  // const [copyText, setCopyText] = useState("");
  // const alert = useAlert();

  // var clipboard = new Clipboard(val.current);

  // clipboard.on("success", (e) => {
  //   alert("success!");
  // });

  return (
    <p className={css(styles.gray, styles.subelement)}>
      <TreeKey query={query} text={objectKey} />
      <span className={css(styles.value, styles[typeof value])}>
        {value.toString()}
      </span>
    </p>
  );
};

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
  }
});
