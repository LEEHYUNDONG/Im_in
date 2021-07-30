import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Settings = () => {
  return (
    <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
    <Container>
      <Text style={{ fontSize: 24 }}>Settings</Text>
    </Container>
    </KeyboardAwareScrollView>
  );
};

export default Settings;
