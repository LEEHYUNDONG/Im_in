import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';


const Label = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`;
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

const Input = forwardRef(
    ({
        label,
        value,
        onChangeText,
        onSubmitEditing,
        onBlur,
        placeholder,
        isPassword,
        returnKeyType,
        maxLength,
        disabled,
    },
    ref
    ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Container>
            
            <Label isFocused={isFocused}>{label}</Label>
            <StyledTextInput
                ref={ref}
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
                editable={!disabled}
            />
        </Container>
    );
});

Input.defaultProps = {
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
    returnKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      textFormIndependence: {
        borderWidth: 2,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        width: 300,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
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
      textFormBottom: {
        borderWidth: 2,
        borderTopWidth: 1,
        borderColor: 'black',
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        width: 300,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10,
      },
      textFormMiddle: {
        borderWidth: 2,
        borderTopWidth: 2,
        borderColor: 'black',
        width: 300,
        height: 65,
        paddingLeft: 10,
        paddingRight: 10,
      },
      btn: {
        width: 300,
        height: 65,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
      /*added*/

})

export default Input;