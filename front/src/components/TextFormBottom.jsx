import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet,TextInput} from 'react-native';


const Container = styled.View`
`;

const TextFormBottom = forwardRef(
    ({
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
            
            <TextInput style={styles.textFormBottom}
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

TextFormBottom.defaultProps = {
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

TextFormBottom.propTypes = {
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
      /*added*/

})

export default TextFormBottom;