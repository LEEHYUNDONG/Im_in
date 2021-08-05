import React, { useContext } from "react";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { dark_theme, theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import Navigation from "../src/navigations";
import {ProgressProvider,UserProvider,DarkModeProvider, DarkModeContext} from './contexts';
import { ModalPortal } from 'react-native-modals';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 400px;
  top: 450px;
`;



const App = () => {
  const {isDark} = useContext(DarkModeContext);
  console.log(isDark);
  return (
    <DarkModeProvider>
    <ThemeProvider theme={isDark ? dark_theme: theme}>
      <UserProvider>
      <ProgressProvider>
      <StatusBar barStyle="dark-content" />
      <Navigation />
      </ProgressProvider>
      </UserProvider>
      <ModalPortal />
    </ThemeProvider>
    </DarkModeProvider>
  );
};
export default App;
// edit app.jsx file for checking master and branches


//<StatusBar barStyle="black-content"/>