import React, { useState,Component, useLayoutEffect, useEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View ,Button} from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ModalContent } from 'react-native-modals';
import {Non_present} from './Timetable';

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
  const [not,setNot] = useState([]);
  const [visible,setVisible] = useState(false);
  const [present,setPresent] = useState(false);

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
          for(var i = 0; i < 3; i++){
            obj[i] = {title: $title[i], ref: $href[i] }
          }
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
      <View style={{flexDirection:"row-reverse", flex:0.3}}>
        
      <MaterialIcons
        name="qr-code"
        size={30}
        style={{ margin: 10 }}
        
        //onpress={{}}
      />
      <MaterialIcons
        name="class"
        size={30}
        style={{ margin: 10 }}
        onPress={() => {
          setVisible(true);
        }}
      />
      </View>

  <Modal
    visible={visible}
    onTouchOutside={() => {
      setVisible(false);
    }}
  >
    <ModalContent>
      <View 
        style={{width:260,height:500}}
        //onPress={get(장고 서버)}
      >
        {present == true ? <Container /> : <Non_present />}
      </View>
    </ModalContent>
  </Modal>



      <View style={{alignItems:"flex-end",flex:0.7}}>
        
    <ImageBackground
      style={{ width:'100%',height: 120}}
      source={require("../../assets/backgroundIMG/loading.png")}
      resizeMode="cover">
      
</ImageBackground>
     </View>
      <View style={{flex:2.5,alignItems:'center'}}>
        <Text style={{fontSize:50,margin:20}}>Notice</Text>
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
