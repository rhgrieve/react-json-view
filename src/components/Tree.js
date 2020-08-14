import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

import { TreeChild } from "./TreeChild";

export const Tree = (props) => {
  const [filtered, setFiltered] = useState(props.data);

  useEffect(() => {
    setFiltered(props.data);
  }, [props.data]);

  return (
    <div>
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
    </div>
  );
};
