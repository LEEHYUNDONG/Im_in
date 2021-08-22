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
    const day = route.params.day;
    const days = [];
    const week_ = {'Monday':'월','Tuesday':'화','Wednesday':'수','Thursday':'목','Friday':'금','Saturday':'토','Sunday':'일'}
    const moment = require('moment');
    const today = moment('20210901','YYYYMMDD');
    const semester = 34; //2학기
    let semester_week = parseInt(today.format('WW')) - semester
    

    for(let i = 0 ; i < day.length; i++ ) {
        var yoil = day[i][0];
        var time = day[i].substring(1,day[i].length)
        if(day.length == 3){
            days.push(yoil+time);
        }
        else if(day.length == 2){
            if (time.length == 1){
                days.push(yoil+time);
            }
            else if (time.length == 2){
                if(time[0] == time[1] || time[1] == '0'){
                    days.push(yoil+time);
                }
                else{
                    days.push(yoil+time[0]);
                    days.push(yoil+time[1]);
                }
            }
            else if (time.length == 3){
                days.push(yoil+time[0]);
                days.push(yoil+time.substring(1,3));
            }
            else{
                days.push(yoil+time.substring(0,2));
                days.push(yoil+time.substring(2,4));
            }
        }
        else{
            if (time.length == 3){
                days.push(yoil+time[0]);
                days.push(yoil+time[1]);
                days.push(yoil+time[2]);
            }
            else if (time.length == 4){
                days.push(yoil+time[0]);
                days.push(yoil+time[1]);
                days.push(yoil+time.substring(2,4));
            }
            else{
                days.push(yoil+time[0]);
                days.push(yoil+time.substring(1,3));
                days.push(yoil+time.substring(3,5));
            }
        }
    }
    const weeks = [];
    for (let i = 0; i < 15; i++) {
        const day_ = {'월': undefined, '화': undefined,'수': undefined, '목': undefined,'금': undefined,'토': undefined,'일': undefined};
        let tmp_arr = []
        
        while(semester_week <= i+1) {
            if(semester_week == i+1){
                day_[week_[today.format('dddd')]] = today.format('MM-DD');
            }
            today.add(1,'days');
            semester_week = parseInt(today.format('WW')) - semester;
        }
        for (let j = 0; j < grade; j++){
            tmp_arr.push({
                id:j,
                attd:'default',
                week:day_,
                day:days[j]
            })
        }
        weeks.push({
            id:i,
            a_week:tmp_arr,
        })
    }
const Item = React.memo(
    ({ item: { id,a_week }, onPress }) => {
        
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
                            <Student id={item.id} attd={item.attd} day={weeks[0].a_week[item.id].day} week={item.week}/>
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