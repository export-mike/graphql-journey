// @flow
import React from 'react';

type Props = {
  type: string,
  value: string,
  isCreate: boolean,
  onChange: Function,
};

const ReadOnlyString = (props: Props) => (
  <input type={props.type} defaultValue={props.value} disabled />
);

export default ReadOnlyString;
