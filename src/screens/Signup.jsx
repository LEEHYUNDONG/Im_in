import React ,{useState,useRef,useEffect} from 'react';
import styled from 'styled-components/native';
import {Image,Text,Button,TextInput,TouchableOpacity,View,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {TextFormTop,TextFormMiddle} from '../components'
import { Keyboard } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Signup = () => {
    const [name, setName] = useState('');
    const [snum, setSnum] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    /*useEffect(() => {
      if (didMountRef.current) {
          let _errorMessage = '';
          if (!name) {
              _errorMessage = 'Please enter your name.';
          } else if (!validateEmail(snum)) {
              _errorMessage = 'Please verify your email.';
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
            const user = await signup({ email, password, name, photoUrl });
            dispatch(user);
            console.log(user);
            Alert.alert('Signup Success', user.email);
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        } finally {
            spinner.stop();
        }
    }; 나중에 수정*/

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                
            <View style={{flex:2}}>
                <View style={{flex: 1}}>
                <TextFormMiddle
                  label="Name"
                  value={snum}
                  onChangeText={text => setSnum(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your name"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  label="Student Number"
                  value={snum}
                  onChangeText={text => setSnum(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your student number"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  label="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your student number"
                  returnKeyType="next"
                />
                <TextFormMiddle
                  label="Confirm password"
                  value={passwordConfirm}
                  onChangeText={text => setPasswordConfirm(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  placeholder="Enter your student number"
                  returnKeyType="next"
                />
                
                </View>
                
                <View style={{flex:0.7}}>
                <TouchableOpacity style={{flex:0.6}}>
                    <Container>
                    <MaterialIcons
                      name="face"
                      size={100}
                      style={{ margin: 10 }}
                      onPress={() => {}}
                    />
                    </Container>
                </TouchableOpacity>    
                <TouchableOpacity style={styles.btn}>
                    <Text style={(styles.Text, {color: 'white'})}>Sign up</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );

};

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