import React, { useEffect, useState } from "react";
import { Moon } from "./Moon";
import styled from "styled-components";
import GlobalCSS from "./global";

const { REACT_APP_SERVER_LOCAL_URL, REACT_APP_SERVER_PROD_URL} = process.env
const serverURL = process.env.NODE_ENV === 'production' ? REACT_APP_SERVER_PROD_URL :  REACT_APP_SERVER_LOCAL_URL

console.log(process.env.NODE_ENV)
console.log(REACT_APP_SERVER_PROD_URL)

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
    fetch(serverURL as string)
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
