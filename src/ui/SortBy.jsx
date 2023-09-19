/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handler(e) {
    searchParams.set("sortBy", e.target.value);
    setsearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handler}
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
