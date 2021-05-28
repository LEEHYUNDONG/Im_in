import React from 'react';
import styled from 'styled-components/native';
import {Text,View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Student} from '../components'

//분반의 학생들을 모아놓는 screen

const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

const Class = ({route}) => {

    return (
      <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
        <Container>
                <Student />
        </Container>
        </KeyboardAwareScrollView>
    )
}

export default Class;