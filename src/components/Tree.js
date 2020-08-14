import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

import TreeChild from "./TreeChild";

const Tree = (props) => {
  const [filtered, setFiltered] = useState({});

  useEffect(() => {
    setFiltered(props.data);
  }, [props.data]);

  return (
    <>
      {Array.isArray(filtered) ? (
        filtered.map((el, i) => {
          return (
            <TreeChild
              rootElement
              query={props.query}
              key={uuid()}
              element={el}
              i={i}
              expand={props.expandAll}
            />
          );
        })
      ) : (
        <TreeChild
          query={props.query}
          element={filtered}
          expand={props.expandAll}
        />
      )}
    </>
  );
};

export default React.memo(Tree);
