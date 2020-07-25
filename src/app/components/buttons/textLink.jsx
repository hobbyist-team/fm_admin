import React from 'react';
import { Button } from '@material-ui/core';
import { func, string } from 'prop-types';

const TextLink = ({ text, onClick }) => (
  <Button onClick={onClick} href="" className="textLink">{text}</Button>
);

TextLink.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired,
};

export default TextLink;
