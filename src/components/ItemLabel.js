import React from "react";

export const ItemLabel = (parent, rootElement, element, i) => {
  const itemLabel = (element, i) => {
    if (Array.isArray(element)) {
      return `array [${element.length}]`;
    } else if (
      typeof element === "object" &&
      !Array.isArray(element) &&
      !rootElement
    ) {
      return parent;
    } else {
      return i;
    }
  };

  return <>{itemLabel(element, i)}</>;
};
