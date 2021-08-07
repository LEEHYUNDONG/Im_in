import React, {Component} from 'react';
import styled from 'styled-components';
import { WebView } from 'react-native-webview';



const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const RefPage=({route}) => {
  const ref = route.params.ref;
  class MyWeb extends Component {  
    render() {
      return (
        <WebView
          source={{uri: ref}}
          style={{marginTop: 20}}
        />
      );
    }
  }
    return (
        <Container>
          <MyWeb />
    </Container>
    )
}

export default RefPage;