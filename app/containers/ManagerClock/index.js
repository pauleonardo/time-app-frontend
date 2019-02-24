/**
 *
 * ManagerClock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManagerClock from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ManagerClock extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ManagerClock</title>
          <meta name="description" content="Description of ManagerClock" />
        </Helmet>
        <FormattedMessage {...messages.header} />
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
