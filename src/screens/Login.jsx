import React from 'react';
import styled from 'styled-components/native';
import {Text,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Login = ({navigation}) => {
    return (
        <Container>
            <View style={{flex:1}}>
                <View style={{flex:2}}></View>
                <View style={{flex:1,alignItems: 'center'}}><Text style={{fontSize:30}}>Sign in</Text></View>
            
            </View>
            <View style={{flex:1.5}}>
            <TextInput style={styles.textFormTop} placeholder="Enter your student number"/>
            <TextInput style={styles.textFormBottom} placeholder="Enter password"/>
            <Text>  </Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={(styles.Text, {color: 'white'})}>Sign in</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.sign_up_Area} title="Signup" onPress={() => navigation.navigate('Signup')}>
              <Text style={(styles.sign_up, {color: 'grey'})}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </Container>
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