import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

import { Tree } from "./Tree";
import { TreeControls } from "./TreeControls";
import { PrismView } from "./PrismView";

import { filterObjectByKey } from "../utils/filter";

export const JsonView = (props) => {
  const [data, setData] = useState({});
  const options = {
    showControls: props.controls || true
  };

  const [filtered, setFiltered] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);
  const [isValidJson, setIsValidJson] = useState(null);

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

  useEffect(() => {
    if (validateJson(JSON.stringify(props.data))) {
      setData(props.data);
      setIsValidJson(true);
    }
  }, [props.data]);

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      setIsValidJson(false);
      return false;
    }
    return true;
  };

  const loadJsonFromURL = async (url) => {
    await fetch("https://rough-glade-7b9a.alkmt.workers.dev", {
      method: "post",
      body: url
    })
      .then(async (res) => await res.json())
      .then((json) => loadData(json));
  };

  const loadData = (json) => {
    console.log("Validating json...");
    if (validateJson(JSON.stringify(json))) {
      setData(json);
      console.log("json set");
    } else {
      console.log("could not validate json");
    }
  };

  const toggleExpandAll = () => {
    setExpandAll((expandAll) => !expandAll);
  };

  const toggleCodeView = () => {
    setShowCodeView((showCodeView) => !showCodeView);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const controlProps = {
    handleChange,
    toggleExpandAll,
    expandAll,
    showCodeView,
    toggleCodeView,
    loadJsonFromURL,
    isValidJson
  };

  const treeProps = {
    data: filtered,
    expandAll,
    query: searchValue
  };

  return (
    <>
      {options.showControls && <TreeControls {...controlProps} />}
      {isValidJson ? (
        <div>
          {showCodeView ? (
            <PrismView
              className={css(styles.prismView)}
              code={JSON.stringify(data, null, 4)}
            />
          ) : (
            <Tree {...treeProps} />
          )}
        </div>
      ) : (
        <p>Please enter valid JSON</p>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  prismView: {
    padding: "1em",
    fontFamily: "monospace"
  }
});
