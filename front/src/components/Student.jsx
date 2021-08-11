import React, { useState } from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from '../theme';
import moment from 'moment';


const StyledContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.background || "white"};
    border-color: #000000;
    border-width: 3px;
    border-radius: 10px;
    padding: 14px;
    margin: 3px 0px;
`;

function Container({ children, color, background }) {
    return (
      <StyledContainer color={color} background={background} Î>
        {children}
      </StyledContainer>
    );
}

// 학생별의 출석 상태를 보여주는 컴포넌트

const Student = ({id,attd ,createdAt}) => {
    const _handlePressBotton = () => {
        
    } 
    const getDateOrTime = ts => {
        const now = moment().startOf('day');
        const target = moment(ts).startOf('day');
        return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
    };
    return (
        <Container> 
            <Text style={{fontFamily:'Trebuchet MS',fontSize:14}}>{id + 1} </Text>
            <Text style={{flex:1}}>날짜(임시): {getDateOrTime(createdAt)}</Text>
        </Container>
    )
}

export default Student;