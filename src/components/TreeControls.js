import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";
import {
  faCode,
  faPlus,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import ReactTooltip from "react-tooltip";

export const TreeControls = (props) => {
  const [loadUrl, setLoadUrl] = useState("");

  const handleLoadUrl = () => {
    if (loadUrl) {
      console.log(`loading URL: ${loadUrl}`);
      props.loadJsonFromURL(loadUrl);
    }
  };

  const handleBlur = (e) => {
    setLoadUrl(e.target.value);
  };

  const inputProps = {
    className: css(styles.input),
    type: "text",
    placeholder: "filter",
    onChange: props.handleChange,
    disabled: props.showCodeView
  };

  const expandAllButtonProps = {
    onClick: props.toggleExpandAll,
    disabled: props.showCodeView
  };

  const validIconClass = () => {
    if (props.isValidJson === null) {
      return css(styles.iconGray);
    } else if (props.isValidJson) {
      return css(styles.iconValid);
    } else {
      return css(styles.iconInvalid);
    }
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
      <FontAwesomeIcon
        className={validIconClass()}
        icon={props.isValidJson ? faCheckCircle : faTimesCircle}
      />
      <div className={css(styles.addJsonSection)}>
        <input
          type="text"
          className={css(styles.input)}
          placeholder="Load URL"
          onBlur={handleBlur}
        />
        <button
          data-tip
          data-for="addJson"
          className={css(styles.plusButton)}
          onClick={handleLoadUrl}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <ReactTooltip id="addJson" effect="solid" place="bottom">
          <span>Add JSON</span>
        </ReactTooltip>
      </div>
    </div>
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
