import React, { useState,Component, useLayoutEffect, useEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, View ,Button} from "react-native";
import { ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, ModalContent } from 'react-native-modals';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;
const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    opacity : 0.7;
`;

export const Non_present = () => {
    return (
        <Container>
            <Btn>
            <ImageBackground
                style={{ width:120,height: 120}}
                source={require("../../assets/add-album.png")}
            />
            </Btn>
        </Container>
    )
}