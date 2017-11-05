// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Counter from '../components/Counter';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
} from '../actions/counter';
import type { State } from '../types/State';

const mapStateToProps = ({ counter }: State) => ({
  counter
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      increment,
      decrement,
      incrementIfOdd,
      incrementAsync
    },
    dispatch
  );

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
