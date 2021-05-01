import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "styled-components/native";
import MainTab from "./MainTab";
import {ListDetail} from '../screens'


const Stack = createStackNavigator();

const MainStack = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false
      }}>
      <Stack.Screen name="Home" component={MainTab} />
      <Stack.Screen name="ListDetail" component={ListDetail} />
    </Stack.Navigator>
  );
};

export default MainStack;
