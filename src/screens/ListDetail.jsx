import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import {StyleSheet,TextInput,View} from 'react-native';
import {Student} from '../components'

const ListDetail = () => {
  return (
      <View style={styles.contaner}>
          <Student />
      </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
})
export default ListDetail;