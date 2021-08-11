import React, { useState } from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from '../theme';
import moment from 'moment';


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

// 학생별의 출석 상태를 보여주는 컴포넌트

const Student = ({id, createdAt}) => {
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
            <MaterialIcons
                name="check"//구성 = 학번,체크버튼,지각버튼,결성버튼
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