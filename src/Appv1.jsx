import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Row from "./ui/Row";
const StyledApp = styled.div`
  /* background-color: red; */

  /* height: 100vh; */
`;
const Input = styled.input`
  height: 40px;
  border-radius: 10px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="headings">
          <Heading as="h1"> the World Oasis</Heading>
          <Heading as="h2"> the World Oasis</Heading>
          <Heading as="h3"> the World Oasis</Heading>
        </Row>
        <Row type="inputs">
          <Input placeholder="Enter the Cabin NO" />
          <Input placeholder="Enter the Cabin NO" />
        </Row>
        <Row type="buttons">
          <Button
            // size="small"
            // variation="danger"
            onClick={() => alert("checked in")}
          >
            Check in
          </Button>
          <Button
            size="large"
            variation="primary"
            onClick={() => alert("checked out")}
          >
            Check out
          </Button>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
