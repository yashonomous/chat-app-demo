import { TextInput, TextInputProps } from '@primer/react';
import React from 'react';

const Input: React.FC<TextInputProps> = (props: TextInputProps) => {
  return <TextInput {...props} />;
};

export default Input;
