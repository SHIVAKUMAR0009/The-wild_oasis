/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();
function Modal({ children }) {
  const [openModal, setopenModal] = useState("");

  function close() {
    setopenModal("");
  }

  return (
    <ModalContext.Provider value={{ openModal, setopenModal, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, modaltoopen }) {
  const { setopenModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => setopenModal(modaltoopen) });
}
function Window({ children, name }) {
  //react-portal--lets u to place an element wherever on the dom tree but it orginal position remains well within its parent
  const { openModal, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);
  // const ref = useRef();
  // useEffect(
  //   function () {
  //     function handleClick(e) {
  //       if (ref.current && !ref.current.contains(e.target)) close();
  //     }
  //     document.addEventListener("click", handleClick, true);

  //     return () => document.removeEventListener("click", handleClick);
  //   },

  //   [close]
  // );
  if (name !== openModal) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close()}>{<HiXMark />}</Button>

        {cloneElement(children, { closeModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
