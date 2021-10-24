import React, { useState,useContext, useEffect } from "react";
import styled,{ ThemeContext } from "styled-components/native";
import { Text, StyleSheet, View ,Button} from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ModalContent } from 'react-native-modals';
import {Non_present,Present} from './Timetable';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 50px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.text};
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
    backgroundColor: "#000000"
  }
});

const _handleqrpress = () => {
 
}

//<Text style={{ fontSize: 24 }}>Home</Text>
const Home=({navigation}) => {
  const theme = useContext(ThemeContext);
  const axios = require('axios');
  const cheerio = require('react-native-cheerio');
  //const url = `http://www.ce.hongik.ac.kr/dept/index.html`;
  const url = `http://www.hongik.ac.kr/front/boardlist.do?bbsConfigFK=54&siteGubun=1&menuGubun=1`;
  const [mnot,setMnot] = useState([]);
  const [rnot,setRnot] = useState([]);
  const [visible,setVisible] = useState(false);
  const [present,setPresent] = useState(false);

  const loadItem = async () => {
    axios
      .get(url)
      .then(function(response){
          const $ = cheerio.load(response.data);
          let $href = [];
          let $href2 = [];
          let $title = [];
          let obj = [];
          let obj2 = [];
          $('div.subject>a').each((index, item)=>{$href.push(item.attribs.href)});
          $('div.subject').each((index, item)=>{$title.push($(item).text().trim())});
          for(var i = 0; i < 2; i++){
            $href2[i] = ('http://www.ce.hongik.ac.kr/dept/0401.html?'+$href[i].substring($href[i].length-11,$href[i].length).toLowerCase())
            obj[i] = {title: $title[i], ref: $href2[i],id: i }
          }
          for (var i = 5; i < 8; i++){
            $href2[i] = ('http://www.ce.hongik.ac.kr/dept/0401.html?'+$href[i].substring($href[i].length-11,$href[i].length).toLowerCase())
            obj2[i-5] = {title: $title[i], ref: $href2[i],id: i-3 }
          }
          setMnot(obj);
          setRnot(obj2);
        })
        .catch((error) => {
          obj[0] = "서버에서 문제가 발생하였습니다.";
          obj2[0] = "서버에서 문제가 발생하였습니다.";
          setMnot(obj);
          setRnot(obj2);
      });
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
        style={{ margin: 10 ,color:theme.text}}
        //onpress={{}}
      />
      <MaterialIcons
        name="class"
        size={30}
        style={{ margin: 10 ,color:theme.text}}
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
      >
        {present == true ? <Present /> : <Non_present />}
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
      <View style={{flex:3,alignItems:'center'}}>
        <Text style={{fontSize:40,color:theme.text}}>Notice</Text>
      <View style={{flex:0.1,flexDirection:'row'}}>
        <View style={{flex:0.9}}>
        <Text style={{fontSize:20, color:theme.text}}>Main</Text>
        </View>
        <View>
        </View>
      </View>
      <View style={{flex:0.5}}>
        {mnot.map(item => (
          <Btn
          key={item.id}
          onPress={() => _onPress(item)}>
            <Text style={{color:theme.text}}>{item.title}</Text>
          </Btn>
        ))}
        </View>
        <View style={{flex:0.1,flexDirection:'row'}}>
        <View style={{flex:0.9}}>
        <Text style={{fontSize:20,color:theme.text}}>Resent</Text>
        </View>
        <View>
        </View>
      </View>
      <View style={{flex:1}}>
        {rnot.map(item => (
          <Btn
          key={item.id}
          onPress={() => _onPress(item)}>
            <Text style={{color:theme.text}}>{item.title}</Text>
          </Btn>
        ))}
        </View>
      </View>
    </Container>
    );
};

export default Home;
