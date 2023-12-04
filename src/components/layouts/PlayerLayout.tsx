import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styled from "styled-components";
import { MiniPlayer } from "../Miniplayer/MiniPlayer";

const StyledNavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const PlayerLayout = () => {
  return (
    <StyledNavLayout className="min-h-screen">
      <div>
        <Outlet />
      </div>
      <MiniPlayer />
      <NavBar />
    </StyledNavLayout>
  );
};