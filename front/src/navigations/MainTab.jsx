import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Check, Mode, List, Settings, FaceCheck } from "../screens/index";
import { MaterialIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { logout } from "../utils/firebase";
import { UserContext, ProgressContext } from "../contexts";
import { ThemeContext } from "styled-components/native";

// Tab 변수에 BOTTOMTAB NAVIGATOR를 불러온다.
const Tab = createBottomTabNavigator();

// ICON을 IMPORT 시킨 값을 각각의 이름과 SIZE와 색상으로 매핑한다
const TabIcon = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

// 하단의 MAINTAB 함수
const MainTab = ({ navigation, route, handledark}) => {
  const { dispatch } = useContext(UserContext); //CONTEXT를 통해 전역적으로 DISPATCH 시킨다
  const { spinner } = useContext(ProgressContext); // 로딩시 SPINNER 이용하기 위해 CONTEXT
  const theme = useContext(ThemeContext);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };

  // 상단에 HEADER를 띄워 주기 위한 함수
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Channels";
    return routeName;
  }

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    navigation.setOptions({
      headerTitle: routeName,
      headerRight: () =>
        (getHeaderTitle(route) === "List" && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 ,color:theme.text}}
            onPress={() => navigation.navigate("ListCreation")}
          />
        )) || (
          <MaterialIcons
            name="login"
            size={26}
            style={{ margin: 10 ,color:theme.text}}
            onPress={_handleLogoutButtonPress}
          />
        )
    });
  }, [route,theme]);

  // 리턴 값으로  화면에 RENDERING 해준다.
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        labelPosition: "below-icon",
        style: {
          backgroundColor: theme.background,
          borderTopColor: "#cfcfcf",
          borderTopWidth: 0.3
        },
        activeTintColor: "#000000",
        inactiveTintColor: "#cfcfcf"
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: props => {
          let name = "";
          if (route.name === "Home") name = "home-filled";
          else if (route.name === "Check") name = "account-circle";
          else if (route.name === "List") name = "list";
          else name = "settings";

          return TabIcon({ ...props, name });
        }
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home", //TAB에 라벨값을 달아준다.
          headerTitle: "Home"
        }}
      />
      <Tab.Screen
        name="Check"
        component={FaceCheck}
        options={{
          tabBarLabel: "Check",
          headerTitle: "Check"
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: "List",
          headerTitle: "List"
        }}
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: "Settings",
          headerTitle: "Settings"
        }}
       children={()=><Settings handledark={handledark}/>}
    />
      
    </Tab.Navigator>
  );
};

export default MainTab;
