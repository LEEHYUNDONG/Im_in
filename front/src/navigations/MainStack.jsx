import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "styled-components/native";
import MainTab from "./MainTab";
import {ListCreation,Class,List,RefPage} from '../screens'


const Stack = createStackNavigator();
//어플의 메인 기능들을 관리한다.
const MainStack = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",  //첫 화면을 메인으로 두고 탭에 쓰일 화면 나열
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false
      }}>
      <Stack.Screen name="Home" component={MainTab} />
      <Stack.Screen name="RefPage" component={RefPage} />
      <Stack.Screen name="ListCreation" component={ListCreation} />
      <Stack.Screen name="Class" component={Class} />
    </Stack.Navigator>
  );
};

export default MainStack;
