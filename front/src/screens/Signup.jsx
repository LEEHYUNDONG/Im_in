import React ,{useState,useRef,useEffect,useContext} from 'react';
import styled from 'styled-components/native';
import {Image,Text,Button,TextInput,TouchableOpacity,View,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {TextFormTop,TextFormMiddle} from '../components'
import { Keyboard } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Check from './Check';
import * as detector from '../screens/FaceRecognition.jsx';

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    margin-bottom: 10px;
    line-height: 20px;
    color: red;
    margin-bottom: 6px;
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Signup = ({navigation}) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();
    const a = detector;
    
    useEffect(() => {
      if (didMountRef.current) {
          let _errorMessage = '';
          if (!name) {
              _errorMessage = 'Please enter your name.';
          } else if (!email) {
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
    }, [name, email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email. password, passwordConfirm, errorMessage]);
    const _handleSignupButtonPress = async () => {
        try {
            spinner.start();
            const user = await signup({ email, password, name });
            dispatch(user);
            console.log(user);
            Alert.alert('Signup Success', user.email);
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
                  onSubmitEditing={() => {
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
                  value={email}
                  onChangeText={text => setEmail()}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your student number"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  ref={passwordRef}
                  label="Password"
                  value={password}
                  onChangeText={text => setPassword(removeWhitespace(text))}
                  onSubmitEditing={() => passwordConfirmRef.current.focus()}
                  placeholder="password"
                  returnKeyType="done"
                  isPassword
                />
                <TextFormMiddle
                  ref={passwordConfirmRef}
                  label="Password Confirm"
                  value={passwordConfirm}
                  onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                  placeholder="Password Confirm"
                  returnKeyType="done"
                  isPassword
                />
                </View>
                <View style={{flex:0.8}}>
                <TouchableOpacity style={{flex:0.6}}>
                    <Container>
                    <Label>Pressing image, register your face</Label>
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
                <TouchableOpacity  style={styles.btn}>
                    <Text style={(styles.Text, {color: 'white'})}>Sign up</Text>
                </TouchableOpacity>
                
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