import React, { Component, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native";

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

//<Text style={{ fontSize: 24 }}>Home</Text>
const Home=({}) => {
  
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../assets/backgroundIMG/loading.png")}
      resizeMode="cover">
      <View>
      <Text style={{ fontSize: 24 }}>Home</Text>
      </View>
    </ImageBackground>
    );
  
};

export default Home;
