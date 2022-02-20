import React from "react";

const Filter = ({
  searchTerm,
  setSearchTerm,
  setSelectedCountries,
  allCountries,
}) => {
  const handleOnFilterChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    const regex = new RegExp(searchTerm, "i");
    console.log("regex: ", regex);
    const filteredCountries = allCountries.filter((country) =>
      country.name.common.match(regex)
    );

    setSelectedCountries(filteredCountries);
  };

  return (
    <div>
      find countries{" "}
      <input
        value={searchTerm}
        onChange={(event) => handleOnFilterChange(event.target.value)}
      />
    </div>
  );
};
export default Filter;
