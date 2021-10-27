import React, { useContext, useState, useEffect } from 'react';
import { FlatList,Text } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { DB } from '../utils/firebase';
import { UserContext} from '../contexts';
import {Attendance} from '../utils/Attendance';
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
                    <ItemTitle style={{color:theme.text}}>{title}</ItemTitle>
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
    const data = {
        "check_list": [
            {
                "check": true,
                "id": "dokyung",
            },
        ],
        "description": "dd",
        "title": "student check",
    }
    // 오브젝트 형태의 임시 출결 토큰

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
            <Btn onPress={() => navigation.navigate("FaceRegistration")}></Btn>
        </Container>
    );
};

export default List;