import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

import { Tree } from "./Tree";
import { TreeControls } from "./TreeControls";
import { PrismView } from "./PrismView";

import { filterObjectByKey } from "../utils/filter";

export const JsonView = (props) => {
  const data = props.data;
  const options = {
    showControls: props.controls || true
  };

  const [filtered, setFiltered] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll((expandAll) => !expandAll);
  };

  // comment

  const toggleCodeView = () => {
    setShowCodeView((showCodeView) => !showCodeView);
  };

  useEffect(() => {
    setExpandAll(true);

    const filterData = (q) => {
      const openQueryRegex = /^\{/;
      const closeQueryRegex = /^\{[a-zA-Z1-9]*.[a-zA-Z1-9]*\}$/;
      let filtered;

      if (openQueryRegex.test(q)) {
        if (closeQueryRegex.test(q)) {
          // filtered = filterObjectByQuery(q, data);
        } else {
          return;
        }
      } else {
        filtered = filterObjectByKey(q, data);
        // let filtered = data.map((f) => filterObjectByKey(q, f));
      }

      // let filtered = data.map((f) => filterObjectByQuery(q, f));
      setFiltered(filtered);
    };

    filterData(searchValue);
  }, [data, searchValue]);

  // FOR CUSTOM INPUT FIELD
  // const handleChange = (value) => {
  //   setSearchValue(value);
  // };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const controlProps = {
    handleChange,
    toggleExpandAll,
    expandAll,
    showCodeView,
    toggleCodeView
  };

  const treeProps = {
    data: filtered,
    expandAll,
    query: searchValue
  };

  return (
    <div>
      {options.showControls && <TreeControls {...controlProps} />}
      {showCodeView ? (
        <PrismView
          className={css(styles.prismView)}
          code={JSON.stringify(data, null, 4)}
        />
      ) : (
        <Tree {...treeProps} />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  prismView: {
    padding: "1em",
    fontFamily: "monospace"
  }
});
