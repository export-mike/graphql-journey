// @flow
import React from 'react';
import { Editor, Raw } from 'slate';

// Create our initial state...
const initialState = {
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.',
        },
      ],
    },
  ],
};

type Props = {
  type: string,
  value: Object,
  isCreate: boolean,
  onChange: Function,
};

type State = {
  state: Object,
};

export default class App extends React.Component {
  props: Props;
  state: State = { state: {} };
  localStorageKey: string;

  constructor(props: Props) {
    // create a unique id for the localstorage so you can switch between field types when editing.
    super(props);
    const id = props.isCreate ? 'create' : props.value.id;
    this.localStorageKey = `${props.type}${id}`;
    const winningState = JSON.parse(
      localStorage.getItem(this.localStorageKey)
    ) ||
    props.value || { ...initialState };

    console.log('winningState', winningState);

    this.state = {
      state: Raw.deserialize(winningState, { terse: true }),
    };
  }

  onChange = (state: State) => {
    this.setState({ state });
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(Raw.serialize(state))
    );
    this.props.onChange(state); // don't bother serialising for the parent
  };

  // Render the editor.
  render = () => {
    return <Editor state={this.state.state} onChange={this.onChange} />;
  };
}
