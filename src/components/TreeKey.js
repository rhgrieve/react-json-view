import React from "react";
import { StyleSheet, css } from "aphrodite";

export const TreeKey = ({ query, text }) => {
  const [prefix, suffix] = text.split(query);

  return (
    <span className={css(styles.spacing)}>
      {text.includes(query) && query !== "" ? (
        <>
          {prefix}
          <span className={css(styles.bold)}>{query}</span>
          {suffix}
          :&nbsp;
        </>
      ) : (
        <>{text}:&nbsp;</>
      )}
    </span>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    backgroundColor: "#FEF9B8",
    borderRadius: "0.2em"
  },
  spacing: {
    padding: "0.2em 0"
  }
});
