import React from "react";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import Navigation from "../src/navigations";
import {ProgressProvider,UserProvider} from './contexts';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 400px;
  top: 450px;
`;



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <ProgressProvider>
      <StatusBar barStyle="dark-content" />
      <Navigation />
      </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
export default App;
// edit app.jsx file for checking master and branches


//<StatusBar barStyle="black-content"/>