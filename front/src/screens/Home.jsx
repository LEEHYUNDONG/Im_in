import React, { useState,Component, useLayoutEffect, useEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;
const Button = styled.Button`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
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
const Home=({navigation}) => {
  const axios = require('axios');
  const cheerio = require('react-native-cheerio');
  const url = `http://www.ce.hongik.ac.kr/dept/index.html`;
  const [href,setHref] = useState([]);
  const [title,setTitle] = useState([]);
  const [not,setNot] = useState([]);

  const loadItem = async () => {
    axios
      .get(url)
      .then(function(response){
          const $ = cheerio.load(response.data);
          let $href = [];
          let $title = [];
          let obj = [];
          $('div.in>ul>li>a').each((index, item)=>{$href.push(item.attribs.href)});
          $('div.in>ul>li').each((index, item)=>{$title.push($(item).text().trim())});
          setHref($href)
          setTitle($title)
          for(var i = 0; i < 3; i++){
            obj[i] = {title: $title[i], ref: $href[i] }
          }
          console.log(obj)
          setNot(obj);
        })
  };
  useEffect(() => {
    loadItem();
  },[]);
  const _onPress = item => {
    navigation.navigate('RefPage',{ref:item.ref, title:item.title})
  }
  
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
      <View style={{flex:2,alignItems:'center'}}>
        {not.map(item => (
          <Btn 
          key={item.ref}
          onPress={() => _onPress(item)}>
            <Text>{item.title}</Text>
          </Btn>
        ))}
        
      </View>
    </Container>

    );
  
};

export default Home;
