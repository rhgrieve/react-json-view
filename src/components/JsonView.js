import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Code } from "react-content-loader";

import { Tree } from "./Tree";
import { TreeControls } from "./TreeControls";
import { PrismView } from "./PrismView";

import { filterObjectByKey } from "../utils/filter";

const Loader = () => <Code width="400" />;

export const JsonView = (props) => {
  const [data, setData] = useState({});
  const options = {
    showControls: props.controls || true
  };

  const [filtered, setFiltered] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);
  const [isValidJson, setIsValidJson] = useState({
    valid: true,
    message: null
  });
  const [isLoadingJson, setIsLoadingJson] = useState(false);

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
    if (props.data && validateJson(JSON.stringify(props.data))) {
      setData(props.data);
    }
  }, [props.data]);

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      setIsValidJson({ valid: false, message: e.message });
      return false;
    }
    setIsValidJson({ valid: true, message: null });
    return true;
  };

  const loadJsonFromURL = async (url) => {
    try {
      await fetch("https://rough-glade-7b9a.alkmt.workers.dev", {
        method: "post",
        body: url
      })
        .then(async (res) => {
          console.info("Loading json...");
          return await res.json();
        })
        .then((json) => {
          if (validateJson(JSON.stringify(json))) {
            setData(json);
            console.info("json loaded");
          } else {
            console.log("could not validate json");
          }
        });
    } catch (e) {
      console.warn("This doesn't look like a JSON document...");
    }
    setIsLoadingJson(false);
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
    isValidJson: isValidJson.valid,
    isLoadingJson,
    setIsLoadingJson
  };

  const treeProps = {
    data: filtered,
    expandAll,
    query: searchValue
  };

  return (
    <>
      {options.showControls && <TreeControls {...controlProps} />}
      {props.data ? (
        <div className={css(styles.contentArea)}>
          {isLoadingJson ? (
            <div>
              <Loader />
              <Loader />
              <Loader />
            </div>
          ) : (
            <>
              {isValidJson.valid ? (
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
                <div className={css(styles.message, styles.error)}>
                  <p>Please enter valid JSON: {isValidJson.message}</p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className={css(styles.message, styles.info)}>
          <p>Add JSON to view</p>
        </div>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  prismView: {
    padding: "1em",
    fontFamily: "monospace"
  },
  message: {
    padding: "1em",
    borderRadius: "0.5em",
    marginTop: "1em"
  },
  error: {
    backgroundColor: "#E69595",
    border: "1px solid #964B4B",
    color: "#964B4B"
  },
  info: {
    backgroundColor: "#A3D0F3",
    border: "1px solid #386282",
    color: "#386282"
  },
  contentArea: {
    margin: "2em"
  }
});
