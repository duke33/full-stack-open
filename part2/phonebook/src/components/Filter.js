import React from "react";

const Filter = ({ handler }) => {
  return (
    <form>
      filter shown with
      <input type="search" placeholder="Search..." onChange={handler} />
    </form>
  );
};

export default Filter;
