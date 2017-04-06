// @flow
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import types from './types';
import coreComponents from './components';

const getType = list => types[list] || {};
const getFields = list => {
  const fields = getType(list);
  return Object.keys(fields).map(k => k);
  // .filter(k => !blacklist.includes(k));
};

const mapToArray = map => Object.keys(map).reduce(
  (acc, k) => {
    if (!map[k]) return acc;
    return [...acc, map[k]];
  },
  []
);

const submitMutation = (Type: string, fields: ListParams) => {
  return gql`
		mutation submitMutation($model: ${Type}!) {
			submit${Type}(${Type}: $model) {
				${fields.reduce((a, l) => `${a},${l}`, '')}
			}
		}
	`;
};

type CreateFormState = {
  form: Object,
};

class CreateForm extends Component {
  state: CreateFormState = { form: {} };

  handleChange = l => data => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [l]: data,
      },
    });
  };
  render() {
    return (
      <form>
        {this.props.fields.map(l => {
          const fieldType = this.props.type[l][0];
          const FieldComponet = coreComponents[fieldType] ||
            coreComponents.TextInput;
          return (
            <FieldComponet
              key={l}
              onChange={this.handleChange(l)}
              value={this.state.form[l]}
              type={this.props.typeName}
              isCreate
            />
          );
        })}
        <button
          onClick={() => this.props
            .mutate({
              variables: {
                model: this.state.form,
              },
            })
            .then(data => {
              alert('Saved!', data);
            })
            .catch(err => {
              console.error('error saving', err);
              alert('error saving');
            })}
        >Submit</button>
      </form>
    );
  }
}

type Props = {
  data: Object,
};

type State = {
  list: string,
  notFound: boolean,
};
type ListParams = Array<string>;

export default class ListContainer extends Component {
  list = () => <div> Loading... </div>;

  state: State = { list: '', notFound: false };
  props: Props;
  plural: string;
  fields: ListParams;
  // CreateForm: Component<Props>;

  componentWillUpdate(nextProps: Props, state: State) {
    this.handleList(nextProps);
  }
  componentWillMount() {
    this.handleList(this.props);
  }
  handleList(nextProps: Props) {
    const list = nextProps.match.params.list;
    if (this.state.list === list) return;

    const fields = (this.fields = getFields(list));
    if (!fields.length) {
      this.setState({
        notFound: true,
        list,
      });
      return;
    }
    this.setState({ notFound: false, list });
    const plural = (this.plural = `${list.toLowerCase()}s`);
    const query = submitMutation(list, fields);

    this.CreateForm = graphql(query)(CreateForm);
  }
  render() {
    const list = this.props.match.params.list;
    // const types = getType(list);
    const fields = this.fields;
    if (this.state.notFound) {
      return (
        <h1>{list.substr(0, 1).toUpperCase()}{list.substr(1)} Not Found</h1>
      );
    }
    // const {readOnly, ...rest} = types;
    return (
      <div>
        <this.CreateForm
          fields={fields}
          plural={this.plural}
          typeName={list}
          type={getType(list)}
        />
      </div>
    );
  }
}
