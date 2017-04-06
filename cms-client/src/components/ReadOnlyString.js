// @flow
import React from 'react';

type Props = {
  type: string,
  value: string,
};

const ReadOnlyString = (props: Props) => (
  <input type={props.type} defaultValue={props.value} disabled />
);

export default ReadOnlyString;
