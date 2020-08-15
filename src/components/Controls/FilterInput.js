import React from "react";
import { StyleSheet, css } from "aphrodite";


const FilterInput = ({ placeholder, onChange, showCodeView, isValidJson }) => {
  const disableInput = showCodeView || !isValidJson;

  return (
    <input
      className={css(styles.input)}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      disabled={disableInput}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    border: "1px solid #aaaaaa",
    padding: "0.5em",
    margin: "0 1em",
    borderRadius: "0.5em",
    outline: "none"
  }
});

export default FilterInput;
