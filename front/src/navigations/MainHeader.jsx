import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Login } from "../screens";

// 각 screen 마다 띄울 헤더의 타이틀이나 모양을 달리했다가 현재 미사용
const MainHeader = ({ navigation }) => {
  return (
    <Header
      statusBarProps={{ barStyle: "dark-content" }}
      style={{
        backgroundColor: "#ffffff",
        borderBottomColor: "#cfcfcf",
        borderBottomWidth: 1
      }}
      backgroundColor="#ffffff"
      rightComponent={{icon: "login", color: "#000", size: 30}}>
      
      </Header>
  );
};

export default MainHeader;

