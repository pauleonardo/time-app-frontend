/**
 *
 * Clock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import styled from 'styled-components';
import './styles.scss';

/* eslint-disable react/prefer-stateless-function */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.returnFormated = this.returnFormated.bind(this);
    this.getHours = this.getHours.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.state = {
      city: '...',
      time: 0,
      previoTime: 0,
      latitude: '*',
      longitude: '*',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState(previoState => ({
        city: nextProps.city,
        time: nextProps.time,
        latitude: nextProps.latitude,
        longitude: nextProps.longitude,
        previoTime: previoState.time,
      }));
    }
  }

  componentDidUpdate(n, prevState) {
    if (prevState !== this.state) {
      this.updateTime();
    }
  }

  componentDidMount() {
    const { previoTime, time } = this.state;
    if (previoTime !== time) {
      this.updateTime();
    }
  }

  returnFormated() {
    const { time } = this.state;
    return moment(time).format('HH:MM:SS');
  }

  updateTime() {
    const { previoTime, time } = this.state;
    if (this.areHourDifferent(previoTime, time)) {
      this.updateContainer(this.refs.hours, this.getHours(time));
    }
    if (this.areMinutesDifferent(previoTime, time)) {
      this.updateContainer(this.refs.minutes, this.getMinutes(time));
    }
    if (this.areSecondsDifferent(previoTime, time)) {
      this.updateContainer(this.refs.seconds, this.getSeconds(time));
    }
  }

  updateContainer(container, newTime) {
    if (!container) return;
    const time = newTime.split('');
    if (time.length === 1) {
      time.unshift('0');
    }
    const first = container.firstElementChild;
    if (first.lastElementChild.textContent !== time[0]) {
      this.updateNumber(first, time[0]);
    }

    const last = container.lastElementChild;
    if (last.lastElementChild.textContent !== time[1]) {
      this.updateNumber(last, time[1]);
    }
  }

  updateNumber(element, number) {
    const second = element.lastElementChild.cloneNode(true);
    second.textContent = number;

    element.appendChild(second);
    element.classList.add('move');

    setTimeout(() => {
      element.classList.remove('move');
    }, 990);
    setTimeout(() => {
      element.removeChild(element.firstElementChild);
    }, 980);
  }

  areHourDifferent(previoTime, actualTime) {
    return this.getHours(previoTime) !== this.getHours(actualTime);
  }

  areMinutesDifferent(previoTime, actualTime) {
    return this.getMinutes(previoTime) !== this.getMinutes(actualTime);
  }

  areSecondsDifferent(previoTime, actualTime) {
    return this.getSeconds(previoTime) !== this.getSeconds(actualTime);
  }

  getHours(time) {
    return moment(time)
      .hours()
      .toString();
  }

  getMinutes(time) {
    return moment(time)
      .minutes()
      .toString();
  }

  getSeconds(time) {
    return moment(time)
      .seconds()
      .toString();
  }

  render() {
    const { city, latitude, longitude } = this.state;
    return (
      <div className="container">
        <div className="title">{city}</div>
        <div className="clock">
          <div className="clock__hours" ref="hours">
            <div className="clock__first">
              <div className="clock__number">0</div>
            </div>
            <div className="clock__second">
              <div className="clock__number">0</div>
            </div>
          </div>
          <div className="clock__tick">:</div>
          <div className="clock__minutes" ref="minutes">
            <div className="clock__first">
              <div className="clock__number">0</div>
            </div>
            <div className="clock__second">
              <div className="clock__number">0</div>
            </div>
          </div>
          <div className="clock__tick">:</div>
          <div className="clock__seconds" ref="seconds">
            <div className="clock__first">
              <div className="clock__number">0</div>
            </div>
            <div className="clock__second">
              <div className="clock__number">0</div>
            </div>
          </div>
        </div>
        <div className="container-longitude-latitude">
          <div className="longitude">LOG: {longitude}</div>
          <div className="latitude">LAT: {latitude}</div>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  city: PropTypes.string,
  time: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default Clock;
