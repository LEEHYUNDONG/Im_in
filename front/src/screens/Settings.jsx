import React, {useContext} from "react";
import styled,{ ThemeContext }from "styled-components/native";
import { Text,Switch} from "react-native";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { DarkModeContext } from "../contexts";

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
    nav: 'FaceRegistration'
  },
  {
    title: 'Q&A',
    icon: 'help-outline',
    nav: 'FaceRegistration'
  },
  {
    title: '서비스 안내',
    icon: 'remove-red-eye',
    nav: 'FaceRegistration'
  },
  {
    title: '얼굴 등록',
    icon: 'person',
    nav: 'FaceRegistration'
  }
]
//#efefef
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;


const Settings = ({navigation,handledark}) => {
  const theme = useContext(ThemeContext);
  const {isDark} = useContext(DarkModeContext);
  const { dark_state } = useContext(DarkModeContext);
  const _toggleSwitch = () => {
    isDark ? dark_state.off():dark_state.on()
    handledark();
  }

  return (
    <Container>
      <View style={{backgroundColor:theme.background}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:20, marginTop:20}}>
        <Text style={{fontSize:20,color:theme.text}}>DarkMode</Text>
        <Switch value={isDark} onValueChange={_toggleSwitch}/>
      </View>
      </View>
      <View style={{margin:15}}></View>
      <View>
  {
    list1.map((item, i) => (
      <ListItem key={i} bottomDivider containerStyle={{backgroundColor:theme.background}}>
        <Icon name={item.icon} 
              color='#d5d5d5'
        />
        <ListItem.Content>
          <ListItem.Title style={{color:theme.text}}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      
    ))
  }
  <View style={{margin:15}}></View>
  {
    list2.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={() => navigation.navigate(item.nav)}containerStyle={{backgroundColor:theme.background}} >
        <Icon name={item.icon} 
              color='#d5d5d5'
        />
        <ListItem.Content >
          <ListItem.Title style={{color:theme.text}}>{item.title}</ListItem.Title>
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