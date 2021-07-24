import React, { Component, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  flex: 1;
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


  async function GetNotice() {
    const axios = require('axios');
    const cheerio = require('react-native-cheerio');

    
  axios.get(`http://www.ce.hongik.ac.kr/dept/index.html`)
    .then(response => {
        let $href = [];
        let $title = [];
        const $ = cheerio.load(response.data);
        $('div.in>ul>li>a').each((index, item)=>{$href.push(item.attribs.href)});
        $('div.in>ul>li').each((index, item)=>{$title.push($(item).text().trim())});
        return [$href,$title];
    });
    
  }
  var notice = GetNotice();
  return (
    <Container>
      <View style={{alignItems:"flex-end",flex:1}}>
      <MaterialIcons
  name="qr-code"
  size={30}
  style={{ margin: 20 }}
  
  //onpress={{}}
/>
    <ImageBackground
      style={{ width:'100%',height: 120}}
      source={require("../../assets/backgroundIMG/loading.png")}
      resizeMode="cover">
      
</ImageBackground>
     </View>

      <View style={{flex:2}}>
        <Text>{notice[0]}</Text>
      </View>
    </Container>

    );
  
};

export default Home;
