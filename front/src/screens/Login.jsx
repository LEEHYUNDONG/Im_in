import React, { useState, useRef, useEffect, useContext } from 'react';
import styled ,{ThemeContext}from 'styled-components/native';
import {Text,TouchableOpacity,View,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {TextFormBottom,TextFormTop} from '../components'
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import {ProgressContext,UserContext} from '../contexts';



const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.text};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
//로그인 인증 화면

const Login = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const [subemail, setSubemail] = useState('dokyung');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  

  useEffect(() => { // 학번과 비밀번호 미입력 시 로그인 버튼 비활성화
    setDisabled(!(subemail && password && !errorMessage));
    setEmail(subemail + '@zz.zz')
}, [subemail, password, errorMessage]);

const _handleLoginButtonPress = async () => { //로그인 버튼 클릭 함수
    try {
        spinner.start(); // 로그인 진행중에 다른 버튼 못 누르도록 spinner 실행
        
        const user = await login({ email, password }); //firebase의 login함수로 email password전달
        Alert.alert('Login Success', subemail); //정상적으로 로그인할 시 알림창
        dispatch(user);
    } catch (e) {
        Alert.alert('Login Error', e.message); //해당 이메일과 패스워드 계정이 없을시에 에러 알림창
    } finally {
        spinner.stop();
    }
};

    return (
      <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
        <Container>
            <View style={{flex:1}}>
                <View style={{flex:2}}></View>
                <View style={{flex:1,alignItems: 'center'}}><Text style={{fontSize:30,color:theme.text}}>Sign in</Text></View>
            
            </View>
            <View style={{flex:1.5}}>
            <TextFormTop
              value={subemail}
              onChangeText={text => setSubemail(text)}
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
            <Btn onPress={_handleLoginButtonPress}
                 disabled={disabled}
            >
                <Text style={(styles.Text, {color: theme.real_black})}>Sign in</Text>
                </Btn>
            <TouchableOpacity style={styles.sign_up_Area} title="Signup" onPress={() => navigation.navigate('Signup')}>
              <Text style={(styles.sign_up, {color: 'grey'})}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </Container>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
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