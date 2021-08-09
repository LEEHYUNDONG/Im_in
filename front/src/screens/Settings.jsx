import React, {useState,useContext,useEffect} from "react";
import styled from "styled-components/native";
import { Text, Button ,Switch} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View,FlatList } from "react-native";
import { ListItem, Icon } from 'react-native-elements'
import {DarkModeContext} from '../contexts'
import { FaceMode } from ".";


const list1 = [
  {
    title: '회원정보 수정',
    icon: 'person'
  },
]

const list2 = [
  
  {
    title: '이용 약관',
    icon: 'subtitles',
    nav: 'FaceMode'
  },
  {
    title: 'Q&A',
    icon: 'help-outline',
    nav: 'FaceMode'
  },
  {
    title: '서비스 안내',
    icon: 'remove-red-eye',
    nav: 'FaceMode'
  },
  {
    title: '얼굴 등록',
    icon: 'person',
    nav: 'FaceMode'
  }
]
//#efefef
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;


const Settings = ({navigation}) => {
  const {isDark} = useContext(DarkModeContext);
  const { dark_state } = useContext(DarkModeContext);
  const _toggleSwitch = () => {
    isDark ? dark_state.off():dark_state.on()
  }
  console.log(isDark);

  return (
    <Container>
      <View style={{backgroundColor:'#ffffff'}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:20, marginTop:20}}>
        <Text style={{fontSize:20}}>DarkMode</Text>
        <Switch value={isDark} onValueChange={_toggleSwitch}/>
      </View>
      </View>
      <View style={{margin:15}}></View>
      <View>
  {
    list1.map((item, i) => (
      <ListItem key={i} bottomDivider>
        <Icon name={item.icon} 
              color='#d5d5d5'
        />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
  <View style={{margin:15}}></View>
  {
    list2.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={() => navigation.navigate(item.nav)}>
        <Icon name={item.icon} 
              color='#d5d5d5'
        />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
    </Container>
  );
};

export default Settings;
