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
        if (params.check == 'attd'){
            console.log(params.id+1+'교시'+'check!')
            obj[params.id]['attd'] = 'check';
        }
        else if (params.late == 'late'){
            console.log(params.id+1+'교시'+'late!')
            obj[params.id]['attd'] = 'late';
        }
        else if (params.absent == 'absent'){
            console.log(params.id+1+'교시'+'absent!')
            obj[params.id]['attd'] = 'abcent';
        }
        
    }
    
    useEffect(() => {
        console.log(123)
    },[obj[0]['attd'],obj[1]['attd'],obj[2]['attd']]);

    return (
        <Container>
            <Student_edit id={0} attd={obj[0]['attd']} onPress={_handlePressBotton} />
            <Student_edit id={1} attd={obj[1]['attd']} onPress={_handlePressBotton}/>
            {len == 2 ? null : <Student_edit id={2} attd={obj[2]['attd']} onPress={_handlePressBotton}/>}
        </Container>
    );
};

export default Stn_List_temp;