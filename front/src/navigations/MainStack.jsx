import React, { useContext ,useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "styled-components/native";
import MainTab from "./MainTab";
import { ListCreation, Class, RefPage,  FaceCheck, FaceRegistration} from '../screens'


const Stack = createStackNavigator();
//어플의 메인 기능들을 관리한다.
const MainStack = ({ navigation,handledark }) => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",  //첫 화면을 메인으로 두고 탭에 쓰일 화면 나열
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.background
        }
      }}>
      <Stack.Screen name='Home' options={{ title: 'Home' }}>
        {(props) => <MainTab {...props} handledark={handledark} />}
      </Stack.Screen>
      <Stack.Screen name="RefPage" component={RefPage} />
      <Stack.Screen name="ListCreation" component={ListCreation} />
      <Stack.Screen name="Class" component={Class} />
      <Stack.Screen name="FaceCheck" component={FaceCheck} />
      <Stack.Screen name="FaceRegistration" component={FaceRegistration} />
    </Stack.Navigator>
  );
};

export default MainStack;
