import React from "react";
import { StyleSheet, css } from "aphrodite";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";

export const ExpandAllButton = ({ onClick, disabled, expandAll }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {expandAll ? (
        <FontAwesomeIcon icon={faMinusSquare} fixedWidth />
      ) : (
        <FontAwesomeIcon icon={faPlusSquare} fixedWidth />
      )}
    </button>
  );
};

export const ToggleCodeViewButton = ({ onClick, disabled, showCodeView }) => {
  const codeViewButtonStyles = showCodeView
    ? css(styles.codeButton, styles.active)
    : css(styles.codeButton);

  return (
    <>
      <button
        data-tip
        data-for="toggleCodeView"
        className={codeViewButtonStyles}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faCode} fixedWidth />
      </button>
      <ReactTooltip id="toggleCodeView" effect="solid" place="bottom">
        <span>View Raw</span>
      </ReactTooltip>
    </>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginBottom: "1em"
  },
  input: {
    border: "1px solid #aaaaaa",
    padding: "0.5em",
    margin: "0 1em",
    borderRadius: "0.5em",
    outline: "none"
  },
  codeButton: {
    color: "#aaaaaa",
    ":hover": {
      color: "black"
    },
    margin: "0 1em 0 0"
  },
  addJsonSection: {
    float: "right"
  },
  plusButton: {
    color: "#C75FD9"
  },
  iconGray: {
    color: "#aaaaaa"
  },
  expandSection: {
    backgroundColor: "pink",
    padding: "1em",
    margin: "1em 0"
  },
  active: {
    color: "black"
  },
  iconValid: {
    color: "#3A9830"
  },
  iconInvalid: {
    color: "#C84730"
  }
});
