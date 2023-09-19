import { useDarkMode } from "../context/DarkModeProvider";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
function DarkModeToggle() {
  const { darkMode, handler } = useDarkMode();

  return (
    <ButtonIcon onClick={handler}>
      {" "}
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
