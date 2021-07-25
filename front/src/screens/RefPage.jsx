import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff0fa;
`;

const RefPage=({route}) => {
    return (
        <Container>
    <Text>title: {route.params.title}</Text>
    <Text>ref: {route.params.ref}</Text>
    </Container>
    )
}

export default RefPage;