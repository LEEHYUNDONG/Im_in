import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { DB } from '../utils/firebase';
import { UserContext } from '../contexts';

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

 const Item = React.memo(
    ({ item: { id, title, snum, createdAt }, onPress }) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{snum}</ItemTime>
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

const Stn_List_temp = ({ navigation }) => {
    const [channels, setChannels] = useState([]);
    const {user} = useContext(UserContext);
    const [uid,setUid] = useState(user.email.substring(0,7));

    useEffect(() => {
        const class_ = DB.collection('student') //class들을 생성일시 내림차순으로 List안에 정렬
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setChannels(list);
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
                data={channels}
                renderItem={({ item }) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
                windowSize={3}
            />
        </Container>
    );
};

export default Stn_List_temp;