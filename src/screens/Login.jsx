import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
  return (
    <Container>
      <Text style={{ fontSize: 24, alignItems: "center" }}>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate("Signup")} />
    </Container>
  );
};

export default Login;
