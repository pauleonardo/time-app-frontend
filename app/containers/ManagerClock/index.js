/**
 *
 * ManagerClock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Clock from 'components/Clock';
import makeSelectManagerClock from './selectors';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

/* eslint-disable react/prefer-stateless-function */
export class ManagerClock extends React.Component {
  render() {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    return (
      <div>
        <Helmet>
          <title>ManagerClock</title>
          <meta name="description" content="Description of ManagerClock" />
        </Helmet>
        <div className="container-managerClock">
          <div className="container-managerClock__central">
            <Clock {...props} />
          </div>
          <div className="container-managerClock__others">
            <Clock {...props} />
            <Clock {...props} />
            <Clock {...props} />
            <Clock {...props} />
            <Clock {...props} />
          </div>
        </div>
      </div>
    );
  }
}

ManagerClock.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerClock: makeSelectManagerClock(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'managerClock', reducer });
const withSaga = injectSaga({ key: 'managerClock', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagerClock);
