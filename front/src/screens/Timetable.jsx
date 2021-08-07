import React,{useState} from "react";
import styled from "styled-components/native";
import { ImageBackground,Image } from "react-native";
import {image} from '../utils/image';

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

const No_album = () => {
    console.log(1);
}
const Present_album = () => {
    console.log(2);
}

export const Non_present = () => {
    return (
        <Container>
            <Btn
                onPress={No_album}
            >
            <ImageBackground
                style={{ width:120,height: 120}}
                source={require("../../assets/add-album.png")}
            />
            </Btn>
        </Container>
    )
}

export const Present = () => {
    const [timeTable,setTimeTable] = useState(image.add_album);

    return (
        <Container>
            <Btn
                onPress={Present_album}
            >
            <ImageBackground
                style={{ width:260,height: 500}}
                source={require("../../assets/backgroundIMG/loading.png")}
            />
            <Image />
            </Btn>
        </Container>
    )
}