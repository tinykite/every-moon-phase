import React, { useEffect, useState } from "react";
import { Moon } from "./Moon";
import styled from "styled-components";
import GlobalCSS from "./global";

const { REACT_APP_SERVER_URL } = process.env;

const MoonContainer = styled.div`
  background: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type MoonPhase =
  | "Waxing Crescent"
  | "Waning Crescent"
  | "Third Quarter"
  | "First Quarter"
  | "Full Moon"
  | "New Moon"
  | "Waxing Gibbous"
  | "Waning Gibbous";

const App: React.FC = () => {
  const [activeMoonPhase, setActiveMoonPhase] = useState<MoonPhase | null>(
    null
  );

  useEffect(() => {
    fetch(REACT_APP_SERVER_URL as string)
      .then((response) => response.json())
      .then((data) => setActiveMoonPhase(data.phase));
  }, []);

  return (
    <>
      <GlobalCSS />
      <MoonContainer>
        {activeMoonPhase && <Moon phase={activeMoonPhase} />}
      </MoonContainer>
    </>
  );
};

export default App;
