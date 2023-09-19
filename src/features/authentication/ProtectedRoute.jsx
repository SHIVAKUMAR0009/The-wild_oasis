/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1get user
  const { user, userLoading, isAuthenticated } = useUser();
  /// return loader if loading

  useEffect(
    function () {
      if (!isAuthenticated && !userLoading) navigate("login");
    },
    [isAuthenticated, userLoading, navigate]
  );
  if (userLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
