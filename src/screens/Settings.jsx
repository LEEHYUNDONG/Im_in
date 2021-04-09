import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Settings = () => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Settings</Text>
    </Container>
  );
};

export default Settings;
