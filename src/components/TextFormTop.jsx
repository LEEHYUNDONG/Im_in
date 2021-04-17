import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet,TextInput} from 'react-native';

/*const StyledTextInput = styled.TextInput.attrs(({ theme }) =>({
    placeholderTextColor: theme.inputPlaceholder,
}))`
    background-color: ${({ theme, editable }) =>
        editable ? theme.background : theme.inputDisabledBackground};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
    border-radius: 4px;
`;*/
const Container = styled.View`
`;
const TextFormTop = (
    ({
        value,
        onChangeText,
        onSubmitEditing,
        onBlur,
        placeholder,
        isPassword,
        returnKeyType,
        maxLength,
    }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Container>
            <TextInput style={styles.textFormTop}
                
                isFocused={isFocused}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                }}
                placeholder={placeholder}
                secureTextEntry={isPassword}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none" // IOS only
                underlineColorAndroid="transparent" // Android only
            />
        </Container>
    );
});

TextFormTop.defaultProps = {
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

TextFormTop.propTypes = {
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      textFormTop: {
        borderWidth: 2,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        width: 300,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
      },
      /*added*/

})

export default TextFormTop;