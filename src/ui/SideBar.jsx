import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const Side = styled.aside`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
`;
function SideBar() {
  return (
    <Side>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </Side>
  );
}

export default SideBar;
