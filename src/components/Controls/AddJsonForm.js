import React from "react";
import { StyleSheet, css } from "aphrodite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const AddJsonForm = ({ handleBlur, handleLoadUrl, isLoadingJson }) => {
  return (
    <div className={css(styles.addJsonSection)}>
      <input
        type="text"
        className={css(styles.input)}
        placeholder="Load URL"
        onBlur={handleBlur}
      />
      {isLoadingJson ? (
        <FontAwesomeIcon icon={faSpinner} pulse fixedWidth color="#aaa" />
      ) : (
        <div className={css(styles.addJsonSection)}>
          <button
            data-tip
            data-for="addJson"
            className={css(styles.plusButton)}
            onClick={handleLoadUrl}
          >
            <FontAwesomeIcon icon={faPlus} fixedWidth />
          </button>
          <ReactTooltip id="addJson" effect="solid" place="bottom">
            <span>Add JSON</span>
          </ReactTooltip>
        </div>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    border: "1px solid #aaaaaa",
    padding: "0.5em",
    margin: "0 1em",
    borderRadius: "0.5em",
    outline: "none"
  },
  addJsonSection: {
    float: "right"
  },
  plusButton: {
    color: "#C75FD9",
    marginTop: "0.5em"
  }
});

export default AddJsonForm;
