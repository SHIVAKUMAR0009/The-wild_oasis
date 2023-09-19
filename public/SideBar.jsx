import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Side = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
`;
function SideBar() {
  return (
    <Side>
      <Logo />
      <MainNav />
    </Side>
  );
}

export default SideBar;
