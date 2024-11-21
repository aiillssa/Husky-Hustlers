import React, { memo } from "react";
import type { FC } from "react";

import classes from "./SearchBar.module.css";
import magnifyingGlassIcon from "./magnifying_glass.svg"; // Adjust the path as needed

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

/* @figmaId 11:334 */
export const SearchBar: FC<Props> = memo(function SearchBar(props) {
  return (
    <div
      className={`${props.classes?.root || ""} ${props.className || ""} ${
        classes.root
      }`}
    >
      <div className={classes.stateLayer}>
        {/* Magnifying glass icon */}
        <img src={magnifyingGlassIcon} alt="Search" />
        {/* Input field */}
        <input
          className={classes.input}
          placeholder="Type to search by business name..."
          onChange={props.onSearchChange}
          value={props.value}
        />
      </div>
    </div>
  );
});

export default SearchBar;
