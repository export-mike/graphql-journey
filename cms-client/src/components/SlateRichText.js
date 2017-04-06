// @flow
import React from 'react';
import { Editor, Raw } from 'slate';

// Create our initial state...
const initialState = Raw.deserialize(
  {
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
  },
  { terse: true }
);

class App extends React.Component {
  // Set the initial state when the app is first constructed.
  // state = {
  //   state: initialState
  // }
  constructor(props) {
    // create a unique id for the localstorage so you can switch between field types when editing.

    const id = props.isCreate ? 'create' : props.id;
    this.localStorageKey = `${props.type}${id}`;
    this.state = {
      state: Raw.deserialize(
        localStorage.getItem(this.localStorageKey) || props.value
      ),
    };
  }

  // On change, update the app's React state with the new editor state.
  onChange = state => {
    this.setState({ state });
    localStorage.setItem(this.localStorageKey, Raw.serialize(state));
    props.onChange(state); // don't bother serialising for the parent
  };

  // Render the editor.
  render = () => {
    return <Editor state={this.state.state} onChange={this.onChange} />;
  };
}
