// @flow
import * as React from 'react';
import type { Node as Children } from 'react';

type Props = {
  children?: Children
};

export default class App extends React.Component<Props> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
