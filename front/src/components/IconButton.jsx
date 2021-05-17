import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Icon = styled.Image`
  width: 26px;
  height: 30px;
  margin: 10px;
`;

const IconButton = ({ type, onPressOut }) => {
  return (
    <TouchableOpacity onPressOut={onPressOut}>
      <Icon source={type} />
    </TouchableOpacity>
  );
};

/*
IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isrequired,
  onPressOut: PropTypes.func
};
*/
export default IconButton;
