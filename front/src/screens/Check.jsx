import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Check = () => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Check</Text>
    </Container>
  );
};

export default Check;
