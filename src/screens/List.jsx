import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const List = () => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>List</Text>
    </Container>
  );
};

export default List;
