import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeProvider";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();
  const img = darkMode ? "logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={img} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
