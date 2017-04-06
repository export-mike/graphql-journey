// @flow
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import types from './types';

const ListItem = ({ item, keys }) => (
  <tr>
    {keys.map(k => <td key={k}>{item[k]}</td>)}
  </tr>
);

const List = props => {
  if (!props.data[props.plural]) return null;

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            {props.listParams.map(p => <th key={p}>{p}</th>)}
          </tr>
          {props.data[props.plural].map((item, i) => (
            <ListItem
              key={props.listParams[i]}
              keys={props.listParams}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const listQuery = (list, plural, listParams) => gql`
  query List {
    ${plural} {
      ${listParams.reduce((a, l) => `${a},${l}`, '')}
    }
  }
`;

// const blacklist = ['readOnly'];

const getType = list => types[list] || {};
const getListParams = list => {
  const listParams = getType(list);
  return Object.keys(listParams).map(k => k);
  // .filter(k => !blacklist.includes(k));
};

const mapToArray = map => Object.keys(map).reduce(
  (acc, k) => {
    if (!map[k]) return acc;
    return [...acc, map[k]];
  },
  []
);

type Props = {
  data: Object,
};

type State = {
  list: String,
  notFound: Boolean,
};

export default class ListContainer extends Component {
  list = () => <div> Loading... </div>;
  state: State = { list: '', notFound: false };
  props: Props;
  componentWillUpdate(nextProps: Props, state) {
    this.handleList(nextProps);
  }
  componentWillMount() {
    this.handleList(this.props);
  }
  handleList(nextProps) {
    const list = nextProps.match.params.list;
    if (this.state.list === list) return;

    const listParams = (this.listParams = getListParams(list));
    if (!listParams.length) {
      this.setState({
        notFound: true,
        list,
      });
      return;
    }
    this.setState({ notFound: false, list });
    const plural = (this.plural = `${list.toLowerCase()}s`);
    const query = listQuery(list, plural, listParams);

    this.ListComponent = graphql(query)(List);
  }
  render() {
    const list = this.props.match.params.list;
    const types = getType(list);
    const listParams = this.listParams;
    if (this.state.notFound) {
      return (
        <h1>{list.substr(0, 1).toUpperCase()}{list.substr(1)} Not Found</h1>
      );
    }
    const { readOnly, ...rest } = types;
    return (
      <div>
        {!readOnly && <Link to={`${list}/create`}> Create </Link>}
        <this.ListComponent
          listParams={listParams}
          plural={this.plural}
          listName={list}
        />
      </div>
    );
  }
}
