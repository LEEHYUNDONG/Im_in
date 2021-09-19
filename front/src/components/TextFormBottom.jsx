import React, { useState, forwardRef ,useContext} from 'react';
import styled,{ ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet,TextInput} from 'react-native';

//위쪽이 뭉뚝한 TextInput

const Container = styled.View`
`;
// 각 요소들을 받아 그에 맞는 입력창 렌더링
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
    const theme = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
          },
          textFormBottom: {
            color:theme.text,
            borderWidth: 2,
            borderTopWidth: 1,
            borderColor: theme.text,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
            width: 300,
            height: 65,
            paddingLeft: 10,
            paddingRight: 10,
          },
          /*added*/
    
    })
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



export default TextFormBottom;