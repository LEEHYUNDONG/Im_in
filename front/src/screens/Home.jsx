import React, { useState,useContext, useEffect } from "react";
import styled,{ ThemeContext } from "styled-components/native";
import { Text, StyleSheet, View ,Button} from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ModalContent } from 'react-native-modals';
import {Non_present,Present} from './Timetable';
import { ListItem, Icon } from "react-native-elements";


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 50px;
    border-radius: 7px;
    justify-content: center;
    align-items: flex-start;
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
  const HeaderList = [
    {
      title: 'NOTICE',
      icon1: 'event-note',
      icon2: 'qr-code',
    },
  ]
  const NoticeList = [
    {
      title: 'MAIN',
      content: mnot,
    },
    {
      title: 'RECENT',
      content: rnot,
    },
  ]

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
          for(var i = 0; i < 3; i++){
            $href2[i] = ('http://www.ce.hongik.ac.kr/dept/0401.html?'+$href[i].substring($href[i].length-11,$href[i].length).toLowerCase())
            obj[i] = {title: $title[i], ref: $href2[i],id: i }
          }
          for (var i = 5; i < 10; i++){
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
      <View >
      {
    HeaderList.map((item, i) => (
      <ListItem key={i} bottomDivider containerStyle={{backgroundColor:theme.background}}>
        <ListItem.Content>
          <ListItem.Title style={{color:theme.text,fontSize:25}}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <Icon size={30} name={item.icon1} onPress={() => {
          setVisible(true);
        }}/>
        <Icon size={30} name={item.icon2} />
      </ListItem>
      
    ))
  }
  {
    NoticeList.map((item, i) => (
      <ListItem key={i}  containerStyle={{backgroundColor:theme.background}}>
        <ListItem.Content>
          <ListItem.Title style={{color:theme.text,fontSize:25}}>{item.title}</ListItem.Title>
          {item.content.map(item => (
          <Btn
          key={item.id}
          onPress={() => _onPress(item)}
          >
            <Text style={{color:theme.text}}>{item.title}</Text>
          </Btn>
        ))}
        <ListItem.Title style={{color:theme.text}}></ListItem.Title>
        <ListItem.Title style={{color:theme.text}}></ListItem.Title>
        </ListItem.Content>
      </ListItem>
      
    ))
  }
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
    </Container>
    );
};

export default Home;
