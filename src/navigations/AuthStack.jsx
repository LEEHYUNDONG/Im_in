import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup,Check,FaceRecognition} from "../screens";

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.headerTintColor,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: "Login",
          headerBackTitleVisible: false,
          headerBackTitle: "Login",
          headerTitleStyle: { fontSize: 16 },
          headerTintColor: "#000000",
          headerBackImage: ({ tintColor }) => {
            const style = {
              marginRight: 5,
              marginLeft: Platform.OS === "ios" ? 11 : 0
            };
            return (
              <MaterialIcons
                name="login"
                size={24}
                color={tintColor}
                style={style}
              />
            );
          }
        }}
      />
      <Stack.Screen name="Signup" component={Signup} options={{headerBackTitleVisible: false}} />
      <Stack.Screen name="Check" component={Check} options={{headerBackTitleVisible: false}} />
      <Stack.Screen name="FaceRecognition" component={FaceRecognition} options={{headerBackTitleVisible: false}} />
    </Stack.Navigator>
  );
};

export default AuthStack;
