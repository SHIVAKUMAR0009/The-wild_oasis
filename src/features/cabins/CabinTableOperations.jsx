import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No-discount",
          },
          {
            value: "with-discount",
            label: "With-Discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by Name(A-z)",
          },
          {
            value: "name-desc",
            label: "Sort by Name(Z-A)",
          },
          {
            value: "RegularPrice-asc",
            label: "Sort by Price(lowfirst)",
          },
          {
            value: "RegularPrice-desc",
            label: "Sort by Price(Highfirst)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity(lowfirst)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity(highfirst)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
