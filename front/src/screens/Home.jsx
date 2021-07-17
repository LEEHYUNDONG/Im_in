import React, { Component, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";



const Container = styled.SafeAreaView`
  flex: 1;
  flexDirection: 'column';
  background-color: ${({ theme }) => theme.background};
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

const _handleqrpress = () => {

}

//<Text style={{ fontSize: 24 }}>Home</Text>
const Home=({}) => {
  
  return (
    <KeyboardAwareScrollView
          extraHeight={20}>
    <ImageBackground
      style={{ width: "100%", height: "200%" }}
      source={require("../../assets/backgroundIMG/loading.png")}
      resizeMode="cover">
      <View style={{alignItems:"flex-end"}}>
      <MaterialIcons
  name="qr-code"
  size={30}
  style={{ margin: 10 }}
  //onpress={{}}
/>
      </View>
    </ImageBackground>
        </KeyboardAwareScrollView>

    );
  
};

export default Home;
