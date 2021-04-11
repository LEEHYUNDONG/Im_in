import React ,{useState} from 'react';
import styled from 'styled-components/native';
import {Image,Text,Button,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Signup = () => {
    return(
            <View style={styles.container}>
                <View style={{flex:0.5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1,alignItems: 'center'}}>
                        <Text style={{fontSize:30}}>Sign up</Text>
                </View>
            </View>
            <View style={{flex:2}}>
                <View style={{flex: 1}}>
                <TextInput style={styles.textFormTop} placeholder="student number(ex:B000000)"/>
                <TextInput style={styles.textFormMiddle}placeholder="Email"></TextInput>
                <TextInput style={styles.textFormMiddle}placeholder="Password"></TextInput>
                <TextInput style={styles.textFormBottom}placeholder="confirm password"></TextInput>
                
                </View>
                
                <View style={{flex:1}}>
                <TouchableOpacity style={{flex:0.7}}>
                    <Container>
                    <Image style={{width:100,height:100}} source={require("../../assets/icon/req.png")} />
                    </Container>
                </TouchableOpacity>    
                <TouchableOpacity style={styles.btn}>
                    <Text style={(styles.Text, {color: 'white'})}>Sign up</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
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