import React from "react";
import uuid from "react-uuid";
import { StyleSheet, css } from "aphrodite";

const HighlightQuery = ({ query, children }) => {
  const splitRegex = new RegExp(`(?<=${query})|(?=${query})`, "i");
  const splitText = children.split(splitRegex);
  console.log(splitText);

  // let [prefix, suffix] = children.split(query, 2);

  return (
    <>
      {splitText.map((chars) => {
        const charsAreQuery = chars.toLowerCase() === query.toLowerCase();
        return (
          <span key={uuid()} className={charsAreQuery ? css(styles.bold) : ""}>
            {chars}
          </span>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    backgroundColor: "#FEF9B8",
    borderRadius: "0.2em"
  }
});

export default HighlightQuery;
