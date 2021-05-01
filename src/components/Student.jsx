import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from '../theme';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border-color: #000000;
    border-width: 3px;
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`;

//<Contents>{text}</Contents>
const Student = ({text}) => {
    return (
        <Container>
            <Text style={{flex:1}}>B811217 강전호</Text>
            <MaterialIcons
                name="check"
                size={26}
                style={{ margin: 10 }}
            />
            <MaterialIcons
                name="alarm"
                size={26}
                style={{ margin: 10 }}
            />
            <MaterialIcons
                name="clear"
                size={26}
                style={{ margin: 10 }}
            />
        </Container>
    )
}

export default Student;