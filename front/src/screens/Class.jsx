import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {Student} from '../components'

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
    const days = route.params.days;
    const weeks_attd = route.params.weeks;
    const week_ = {'Monday':'월','Tuesday':'화','Wednesday':'수','Thursday':'목','Friday':'금','Saturday':'토','Sunday':'일'}
    const moment = require('moment');
    const today = moment('20210901','YYYYMMDD');
    const semester = parseInt(today.format('WW')) - 1; //2학기
    let semester_week = parseInt(today.format('WW')) - semester

    const weeks = [];
    let cnt = 0;
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
        for (let j = 0; j < days.length; j++){
            tmp_arr.push({
                id:j,
                attd:weeks_attd[cnt],
                week:day_,
                day:days[j]
            })
            cnt = cnt + 1;
        }
        weeks.push({
            id:i,
            a_week:tmp_arr,
        })
    }
    console.log(days)
const Item = React.memo(
    ({ item: { id,a_week }, onPress }) => {
        
        console.log(`Item: ${id}`);
        return (
            <ItemContainer >
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

    return (
      <Container>
          <FlatList 
            keyExtractor={item => item['id'].toString()}
            data={weeks}
            renderItem={({item}) => (
                <Item item={item} />
            )}
            
          />
      </Container>
    )
}

export default Class;