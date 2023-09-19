// import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  // console.log(cabins);
  // const { data: cabins, isLoading } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;
  ///1) FIltering
  const FilterValue = searchParams.get("discount") || "all";
  let FilterCabins;
  if (FilterValue === "all") FilterCabins = cabins;

  if (FilterValue === "no-discount")
    FilterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (FilterValue === "with-discount")
    FilterCabins = cabins.filter((cabin) => cabin.discount > 0);
  ///2) sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  // console.log(sortBy);
  const [field, direction] = sortBy.split("-");
  // console.log(field);
  // console.log(direction);
  const modifier = direction === "asc" ? 1 : -1;
  // console.log(modifier);

  const sortedCabins = FilterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  // console.log(sortedCabins);

  return (
    <Menus>
      <Table columns="0.6fr 1.2fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
