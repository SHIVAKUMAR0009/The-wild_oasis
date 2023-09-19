import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { styled } from "styled-components";

const Applayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  display: flex;

  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <Applayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Applayout>
  );
}

export default AppLayout;
