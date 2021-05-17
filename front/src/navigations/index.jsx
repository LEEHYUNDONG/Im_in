import React, { useContext, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { Spinner } from "../components";
import AuthStack from "./AuthStack";
import { ProgressContext,UserContext}  from "../contexts";

const Navigation=() => {
  const {inProgress}=useContext(ProgressContext);
  const { user } = useContext(UserContext); 
  
  return (
    <NavigationContainer>
      {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
