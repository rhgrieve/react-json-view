import React, { useState } from "react";
import uuid from "react-uuid";
import { StyleSheet, css } from "aphrodite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import { TreeKeyValue } from "./TreeKeyValue";

export const TreeChild = ({
  parent,
  rootElement,
  element,
  i,
  expand,
  query
}) => {
  const [expanded, setExpanded] = useState(expand);

  const handleExpandElement = () => {
    setExpanded((expanded) => !expanded);
  };

  const itemLabel = (element, i) => {
    if (Array.isArray(element)) {
      return `${parent || "array"} [${element.length}]`;
    } else if (
      typeof element === "object" &&
      !Array.isArray(element) &&
      !rootElement
    ) {
      return `${parent || "object"} {${Object.keys(element).length}}`;
    } else {
      return `${i} {${Object.keys(element).length}}`;
    }
  };

  return (
    <div className={css(styles.tree)}>
      <div className={css(styles.element)}>
        <button onClick={handleExpandElement}>
          <FontAwesomeIcon
            fixedWidth
            color="#495057"
            icon={expanded ? faChevronDown : faChevronRight}
            size="xs"
          />
        </button>
        <span className={css(styles.gray)}>{itemLabel(element, i)}</span>
      </div>
      {Object.keys(element).map((subel, i) => {
        return (
          <div
            key={uuid()}
            className={
              !expanded
                ? css(styles.minimize, styles.element)
                : css(styles.element)
            }
          >
            <div className={css(styles.indent)}>
              {typeof element[subel] !== "object" ? (
                <TreeKeyValue
                  query={query}
                  objectKey={subel}
                  value={element[subel]}
                />
              ) : (
                <TreeChild
                  title="List"
                  query={query}
                  index={i}
                  parent={subel}
                  element={element[subel]}
                  expand={expand}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = StyleSheet.create({
  minimize: {
    display: "none"
  },
  element: {
    padding: "0.2em 0",
    marginLeft: "-1em"
  },
  indent: {
    marginLeft: "3em"
  },
  tree: {
    fontFamily: "monospace"
  },
  gray: {
    color: "#495057"
  }
});
