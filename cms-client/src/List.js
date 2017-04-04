import React, { Component } from 'react';
import compose from 'recompose/compose';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import components from './components';

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

const getListParams = list => {
  const listParams = components[list] || {};
  return Object.keys(listParams).map(k => k);
};

const mapToArray = map => Object.keys(map).reduce(
  (acc, k) => {
    if (!map[k]) return acc;
    return [...acc, map[k]];
  },
  []
);

export default class ListContainer extends Component {
  list = () => <div> Loading... </div>;
  state = { list: '', notFound: false };
  // componentWillUpdate(nextProps, state) {
  //   this.handleList(nextProps);
  // }
  // componentWillMount() {
  //   this.handleList(this.props);
  // }
  // handleList(nextProps) {
  //   const list = nextProps.match.params.list;
  //   if (this.state.list === list) return;
  //
  //   const listParams = this.listParams = getListParams(list);
  //   if (!listParams.length) {
  //     this.setState({
  //       notFound: true,
  //       list
  //     });
  //     return;
  //   }
  //   this.setState({ notFound: false, list });
  //   const query = listQuery(list, listParams);
  //   this.list = graphql(query)(List);
  // }
  render() {
    const list = this.props.match.params.list;
    const listParams = getListParams(list);
    if (!listParams.length) {
      return (
        <h1>{list.substr(0, 1).toUpperCase()}{list.substr(1)} Not Found</h1>
      );
    }
    const plural = `${list.toLowerCase()}s`;
    const query = listQuery(list, plural, listParams);
    const ListComponent = graphql(query)(List);
    return (
      <ListComponent listParams={listParams} plural={plural} listName={list} />
    );
  }
}
