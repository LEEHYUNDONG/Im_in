import React, { useContext, useState } from 'react';
import styled,{ThemeProvider} from 'styled-components/native';
import {Text,View,FlatList} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Student} from '../components'
import { ThemeContext } from 'styled-components';
import { MaterialIcons } from "@expo/vector-icons";


//분반의 학생들을 모아놓는 screen

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.listBorder};
    padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;
const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;
const ItemDescription = styled.Text`
    font-size:12px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listTime};
`;
const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.listTime};
`;


const Class = ({navigation,route}) => {
    const grade = route.params.grade;
    const title = route.params.title;
    const weeks = [];
    for (let i = 0; i < 15; i++) {
        let tmp_arr = []
        for (let j = 0; j < grade; j++){
            tmp_arr.push({
                id:j,
                attd:'default',
            })
        }
        weeks.push({
            id:i,
            a_week:tmp_arr,
        })
    }/*
    const Item = React.memo(
    ({ item: {id,a_week}}, onPress) => {
        const theme = useContext(ThemeContext);

        return (
            <ItemContainer onPress={() => onPress({ a_week })}>
                <ItemTextContainer>
                    <ItemTitle>{id+1} week</ItemTitle>
                    <ItemDescription>{title}</ItemDescription>
                    <FlatList 
                        keyExtractor={item => item['id'].toString()}
                        data={a_week}
                        renderItem={({item}) => (
                            <Student id={item.id} createdAt={Date.now()} />
                        )}  
                    />
                </ItemTextContainer>
            </ItemContainer>
          )
    }
);
*/
const Item = React.memo(
    ({ item: { id,a_week }, onPress }) => {
        const theme = useContext(ThemeContext);
        const change_attd = ({id,attd}) => {
            a_week[id].attd = attd;
        }
        console.log(`Item: ${id}`);
        return (
            <ItemContainer onPress={() => onPress({ a_week})}>
                <ItemTextContainer>
                    <ItemTitle>{id+1} week</ItemTitle>
                    <ItemDescription>{title}</ItemDescription>
                    <FlatList 
                        keyExtractor={item => item['id'].toString()}
                        data={a_week}
                        renderItem={({item}) => (
                            <Student id={item.id} createdAt={Date.now()} />
                        )}  
                    />
                </ItemTextContainer>
            </ItemContainer>
        );
    }
);
    const _handleItemPress = params => {
        navigation.navigate('Stn_List_temp', params);
    };
    return (
      <Container>
          <FlatList 
            keyExtractor={item => item['id'].toString()}
            data={weeks}
            renderItem={({item}) => (
                <Item item={item} onPress={_handleItemPress} />
            )}
            
          />
      </Container>
    )
}

export default Class;