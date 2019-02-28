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
  filterContentByName(name) {
    const {
      managerClock: { TIME },
    } = this.props;
    if (TIME && TIME.length !== 0) {
      let result = TIME.find(city => city.name.includes(name));
      result = {
        latitude: Number(result.latitude),
        longitude: Number(result.longitude),
        time: Number(result.time),
        name: result.name,
        timezone: result.timezone,
        temperature: result.temperature,
      };
      return result;
    }
    return {};
  }

  render() {
    const Santiago = this.filterContentByName('Santiago');
    const Zurich = this.filterContentByName('Zurich');
    const Auckland = this.filterContentByName('Auckland');
    const Sydney = this.filterContentByName('Sydney');
    const Londres = this.filterContentByName('Londres');
    const Georgia = this.filterContentByName('Georgia');

    return (
      <div>
        <Helmet>
          <title>ManagerClock</title>
          <meta name="description" content="Description of ManagerClock" />
        </Helmet>
        <div className="container-managerClock">
          <div className="container-managerClock__central">
            <Clock {...Santiago} />
          </div>
          <div className="container-managerClock__others">
            <Clock {...Zurich} />
            <Clock {...Auckland} />
            <Clock {...Sydney} />
            <Clock {...Londres} />
            <Clock {...Georgia} />
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
