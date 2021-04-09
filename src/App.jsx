import React from "react";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import Navigation from "../src/navigations";


const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 400px;
  top: 450px;
`;



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};
export default App;


//<StatusBar barStyle="black-content"/>