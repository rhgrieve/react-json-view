import React from "react";
import { StyleSheet, css } from "aphrodite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import ReactTooltip from "react-tooltip";

export const TreeControls = (props) => {
  const inputProps = {
    className: css(styles.filterInput),
    type: "text",
    placeholder: "filter",
    onChange: props.handleChange,
    disabled: props.showCodeView
  };

  const expandAllButtonProps = {
    onClick: props.toggleExpandAll,
    disabled: props.showCodeView
  };

  return (
    <div className={css(styles.controls)}>
      <button {...expandAllButtonProps}>
        {props.expandAll ? (
          <FontAwesomeIcon icon={faMinusSquare} fixedWidth />
        ) : (
          <FontAwesomeIcon icon={faPlusSquare} fixedWidth />
        )}
      </button>
      <input {...inputProps} />
      <button
        data-tip
        data-for="toggleCodeView"
        className={
          props.showCodeView
            ? css(styles.codeButton, styles.active)
            : css(styles.codeButton)
        }
        onClick={props.toggleCodeView}
      >
        <FontAwesomeIcon icon={faCode} fixedWidth />
      </button>
      <ReactTooltip id="toggleCodeView" effect="solid" place="bottom">
        <span>Raw JSON</span>
      </ReactTooltip>
    </div>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginBottom: "1em"
  },
  filterInput: {
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
    }
  },
  active: {
    color: "black"
  }
});
