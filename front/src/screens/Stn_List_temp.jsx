import React, { useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Student_edit } from '../components';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;


const Stn_List_temp = ({ route }) => {
    let len = Object.keys(route.params.a_week).length;
    let obj = route.params.a_week;
    const _handlePressBotton = params => {
        console.log('params:'+params.late,params.check,params.absent)
        if (params.check == 'attd'){
            console.log('check!')
            obj[params.id]['attd'] = 'check';
        }
        else if (params.late == 'late'){
            console.log('late!')
            obj[params.id]['attd'] = 'late';
        }
        else if (params.absent == 'absent'){
            console.log('absent!')
            obj[params.id]['attd'] = 'abcent';
        }
        
    }

    return (
        <Container>
            <Student_edit id={0} attd={obj[0]['attd']} onPress={_handlePressBotton} />
            <Student_edit id={1} attd={obj[1]['attd']} onPress={_handlePressBotton}/>
            {len == 2 ? null : <Student_edit id={2} attd={obj[2]['attd']} onPress={_handlePressBotton}/>}
            <Text>{console.log(route.params.a_week)}</Text>
        </Container>
    );
};

export default Stn_List_temp;