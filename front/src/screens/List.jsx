import React, { useContext, useState, useEffect } from 'react';
import { FlatList,Text } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { DB } from '../utils/firebase';
import { UserContext} from '../contexts';
//출석 체크 모듈 추가
//import { DB } from '../utils/firebase';
import {ProgressContext} from '../contexts';
import { Alert } from 'react-native';
import {Checkattd} from '../utils/firebase';
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
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
    font-size:16px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listTime};
`;
const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.listTime};
`;

const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

 const Item = React.memo(
    ({ item: { id, title, snum,grade, createdAt,days,weeks }, onPress }) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer onPress={() => onPress({ id, title ,grade,days,weeks})}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{grade}학점</ItemTime>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);

//모든 Class들을 모아둔 목록

const List = ({ navigation }) => {
    const [classes, setClasses] = useState([]);
    const {user} = useContext(UserContext);
    const [uid,setUid] = useState(user.email.substring(0,7));
    const { spinner } = useContext(ProgressContext);
    // 오브젝트 형태의 임시 출결 토큰
    const usr = {
        "check_list": [
            {
                "check":true,
                "id": "b811217",
            },
        ],
        "description":"dd",
        "title": "student check",
    }

    const attendence = (attd) => {
        // 현재로 하려면 const date = moment(new Date()).format(); 하고 넣기
        //현재 시간 - 8 = 현재 교시 ~ 09:00 1교시
        //아래는 임시 9월 2일 10시 2분으로 가정
        const now = Date.now()
        const moment = require('moment');
        const days = ['일','월','화','수','목','금','토']
        const date = moment('2021-09-02 10:02:00','YYYYMMDD HH:mm:ss');
        const class_ = days[date.day()]+(date.hour()-8);
        let week;
        parseInt(date.format('WW'))> 30 ? week = parseInt(date.format('WW')) - 34 : week = parseInt(today.format('WW'));
        console.log(week)
        DB.collection('student')
            .doc(uid).collection(uid)
            .get().then(result => {
                result.forEach(doc=>{
                    const data = doc.data();
                    for(let i = 0; i < data.days.length; i++){
                        if(data.days[i] == class_){
                            _handleAttendenceTrue(data.title,uid,week,i+1);
                            break;
                        }
                    }
                })
            })

        const _handleAttendenceTrue = async (title,snum,week,period) => {//파이어베이스에 class 생성
            
            try {
                spinner.start();
                const id = await Checkattd({ title, snum, week,period});
            } catch (e) {
                Alert.alert('Error', e.message);
            } finally {
                spinner.stop();
            }
          };
    }
// 요까지
    useEffect(() => {
        const class_ = DB.collection('student') //class들을 생성일시 내림차순으로 List안에 정렬
            .doc(uid).collection(uid)
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setClasses(list);
            });
        return () => class_();
    }, []);

    const _handleItemPress = params => { //아이템 클릭시 class 내부로 이동
        navigation.navigate('Class', params);
    };

    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id']}
                data={classes}
                renderItem={({ item }) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
                windowSize={3}
            />
            <Btn onPress={() => attendence()}><Text style={{color:'white'}}>출첵 임시 본부</Text></Btn>
        </Container>
    );
};

export default List;