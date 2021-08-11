import React, { useState } from 'react';
import styled from 'styled-components/native';
import {Text,View} from 'react-native';
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

const Student_edit = ({id,attd ,createdAt, onPress}) => {
    const [check,setCheck] = useState('attd');
    const [late,setLate] = useState('late');
    const [absent,setAbsent] = useState('absent');
    
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
            attd == 'default' ? '#ffffff' : (attd == 'attd' ? '#00ff00' : (attd == 'late' ? '#ffaf00' : '#ff0000')),
            borderColor: '#000000',
            borderWidth: 3,
            borderRadius: 10,
            padding: 5,
            margin: 3,
            opacity: 0.6,
        }}> 
            <Text style={{fontFamily:'Trebuchet MS',fontSize:14}}>{id + 1} </Text>
            <Text style={{flex:1}}>날짜(임시): {getDateOrTime(createdAt)}</Text>
            <MaterialIcons
                name="check"//구성 = 학번,체크버튼,지각버튼,결성버튼
                size={26}
                style={{ margin: 10 }}
                onPress={() => onPress({id,attd})}
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
        </View>
    )
}

export default Student_edit;