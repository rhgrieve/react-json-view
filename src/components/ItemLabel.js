import React from "react";
import { StyleSheet, css } from "aphrodite";

import HighlightQuery from "./HighlightQuery";

const itemLabel = (element, i, rootElement, parent) => {
  try {
    if (Array.isArray(element)) {
      return {
        text: parent || "array",
        decorator: `[${element.length}]`
      };
    } else if (
      typeof element === "object" &&
      !Array.isArray(element) &&
      !rootElement
    ) {
      return {
        text: parent || "object",
        decorator: `{${Object.keys(element).length}}`
      };
    } else {
      return {
        text: `${i}` || "object",
        decorator: `{${Object.keys(element).length}}`
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const ItemLabel = ({ element, i, rootElement, parent, query }) => {
  const { text, decorator } = itemLabel(element, i, rootElement, parent);
  // console.log(text);
  return (
    <span className={css(styles.gray)}>
      {text.includes(query) ? (
        <HighlightQuery query={query}>{text}</HighlightQuery>
      ) : (
        <>{text}</>
      )}{" "}
      {decorator}
    </span>
  );
};

export default React.memo(ItemLabel);

const styles = StyleSheet.create({
  gray: {
    color: "#495057"
  }
});

//
