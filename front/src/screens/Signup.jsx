import React ,{useState,useRef,useEffect,useContext} from 'react';
import styled from 'styled-components/native';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {TextFormMiddle} from '../components'
import { MaterialIcons } from "@expo/vector-icons";
import {ProgressContext,UserContext} from '../contexts';
import { Alert } from 'react-native';
import {signup} from '../utils/firebase'

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    margin-bottom: 10px;
    line-height: 20px;
    color: red;
    margin-bottom: 6px;
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Signup = ({navigation}) => {
    const [subemail,setSubemail] = useState('')
    const { dispatch } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const { spinner } = useContext(ProgressContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();
    
    useEffect(() => { //변수들 바뀔때마다 if문 실행
      if (didMountRef.current) { //마운트가 되면 각 변수들 검사 후 잘못된 값 문자열 출력
          let _errorMessage = '';
          if (!name) {
              _errorMessage = 'Please enter your name.';
          } else if (!subemail) {
              _errorMessage = 'Please verify your student number.';
          } else if (password.length < 6) {
              _errorMessage = 'The password must contain 6 characters at least.';
          } else if (password !== passwordConfirm) {
              _errorMessage = 'Passwords need to match'
          } else {
              _errorMessage = '';
          }
          setErrorMessage(_errorMessage);
      } else {
          didMountRef.current = true;
      }
    }, [name, subemail, password, passwordConfirm]);

    useEffect(() => { //네개의 변수들을 변경할 때마다 조건에 맞게 버튼 활성화
        setDisabled(
            !(name && subemail && password && passwordConfirm && !errorMessage)
        );
        setEmail(subemail + '@zz.zz')
    }, [name, subemail. password, passwordConfirm, errorMessage]);
    const _handleSignupButtonPress = async () => {
        try {
            spinner.start();
            const user = await signup({ email, password, name });
            dispatch(user);
            console.log(user);
            Alert.alert('Signup Success', subemail);
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return(
        <KeyboardAwareScrollView
          extraHeight={20}
        >
            <View style={styles.container}>
                
            <View style={{flex:2}}>
                <View style={{}}>
                <TextFormMiddle
                  label="Name"
                  value={name}
                  onChangeText={text => setName(text)}
                  onSubmitEditing={() => { //키패드의 return 입력 시 다음 폼으로 focus 이동
                      setName(name.trim());
                      emailRef.current.focus();
                  }}
                  onBlur={() => setName(name.trim())}
                  placeholder="Enter your name"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  ref={emailRef}
                  label="Student Number"
                  value={subemail}
                  onChangeText={text => setSubemail(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your student number"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  ref={passwordRef}
                  label="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  onSubmitEditing={() => passwordConfirmRef.current.focus()}
                  placeholder="password"
                  returnKeyType="done"
                  isPassword
                />
                <TextFormMiddle
                  ref={passwordConfirmRef}
                  label="Password Confirm"
                  value={passwordConfirm}
                  onChangeText={text => setPasswordConfirm(text)}
                  placeholder="Password Confirm"
                  returnKeyType="done"
                  isPassword
                />
                </View>
                <View style={{flex:0.8}}>
                <TouchableOpacity style={{flex:0.6}}>
                    <Container>
                    <Label>Press image to register your face</Label>
                    <MaterialIcons
                      style={{flex:1}}
                      name="face"
                      size={100}
                      style={{ margin: 10 }}
                      onPress={() => navigation.navigate('FaceRecognition')}
                    />
                    </Container>
                </TouchableOpacity>
                <ErrorText>{errorMessage}</ErrorText>
                <Btn disabled={disabled}
                     onPress={_handleSignupButtonPress}
                     >
                    <Text style={(styles.Text, {color: 'white'})}>Sign up</Text>
                </Btn>
                
            </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );

};
const Label = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      textFormMiddle: {
        borderWidth: 2,
        borderTopWidth: 2,
        borderColor: 'black',
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
      /*added*/

})

export default Signup;