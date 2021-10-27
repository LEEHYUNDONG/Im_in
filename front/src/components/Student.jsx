import React, { useState } from 'react';
import styled,{ ThemeContext } from "styled-components/native";
import {Text,View} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from '../theme';
import moment from 'moment';

// 학생별의 출석 상태를 보여주는 컴포넌트

const Student = ({id,attd ,day,week}) => {

    const getDateOrTime = ts => {
        const now = moment().startOf('day');
        const target = moment(ts).startOf('day');
        return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
    };
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 
            attd == 'default' ? '#ffffff' : (attd == 'check' ? '#00ff00' : (attd == 'late' ? '#ffaf00' : '#ff0000')),
            borderColor: '#000000',
            borderWidth: 3,
            borderRadius: 10,
            padding: 14,
            margin: 3,
        }}>  
            <Text style={{fontSize:14,fontWeight:'bold'}}>{id + 1} </Text>
            <Text style={{flex:1}}>{week[day[0]]}</Text>
            <Text>{day}</Text>
        </View>
    )
}

export default Student;