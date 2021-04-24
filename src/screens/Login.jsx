import React, { useState,useRef} from 'react';
import styled from 'styled-components/native';
import {Text,TouchableOpacity,View,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {TextFormBottom,TextFormTop} from '../components'
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Login = ({navigation}) => {
  const [snum, setSnum] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isFocused, setIsFocused] = useState(false);


    return (
      <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
        <Container>
            <View style={{flex:1}}>
                <View style={{flex:2}}></View>
                <View style={{flex:1,alignItems: 'center'}}><Text style={{fontSize:30}}>Sign in</Text></View>
            
            </View>
            <View style={{flex:1.5}}>
            <TextFormTop
              value={snum}
              onChangeText={text => setSnum(text)}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="Enter your student number"
              returnKeyType="next"
            />
            <TextFormBottom
              ref={passwordRef}
              value={password}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={() => {}}
              placeholder="Enter password"
              returnKeyType="done"
              isPassword
            />
            <Text>  </Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={(styles.Text, {color: 'white'})}>Sign in</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.sign_up_Area} title="Signup" onPress={() => navigation.navigate('Signup')}>
              <Text style={(styles.sign_up, {color: 'grey'})}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </Container>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
  
    textFormTop: {
      borderWidth: 2,
      borderBottomWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      width: 300,
      height: 65,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center'
    },
    textFormBottom: {
      borderWidth: 2,
      borderTopWidth: 1,
      borderColor: 'black',
      borderBottomRightRadius: 7,
      borderBottomLeftRadius: 7,
      width: 300,
      height: 65,
      paddingLeft: 10,
      paddingRight: 10,
    },
    btn: {
      width: 300,
      height: 65,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    sign_up: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sign_up_Area: {
        paddingTop:30,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });


export default Login;