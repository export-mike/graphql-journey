// @flow
import React from 'react';

type Props = {
  type: string,
  value: string,
  isCreate: boolean,
  onChange: Function,
};

const TextInput = (props: Props) => (
  <input
    type={props.type}
    value={props.value}
    onChange={e => props.onChange(e.target.value)}
  />
);

TextInput.defaultProps = {
  value: '',
};

export default TextInput;
