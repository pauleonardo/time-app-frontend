/**
 *
 * Clock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
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
      name: '...',
      time: 0,
      previoTime: 0,
      latitude: '*',
      longitude: '*',
      timezone: 'America/Santiago',
      temperature: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState(previo => ({
        name: nextProps.name,
        time: nextProps.time,
        previoTime: previo.time,
        latitude: nextProps.latitude,
        longitude: nextProps.longitude,
        timezone: nextProps.timezone,
        temperature: nextProps.temperature,
      }));
    }
  }

  componentDidUpdate() {
    this.updateTime();
  }

  returnFormated(time) {
    const tz = this.state.timezone;
    if (!tz) return '00:00:00';
    return moment
      .unix(time)
      .tz(tz)
      .format('hh:mm:ss')
      .toString();
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
    if (!container || !newTime) return;
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
    return this.returnFormated(time).split(':')[0];
  }

  getMinutes(time) {
    return this.returnFormated(time).split(':')[1];
  }

  getSeconds(time) {
    return this.returnFormated(time).split(':')[2];
  }

  render() {
    const { name, latitude, longitude, temperature } = this.state;
    return (
      <div className="container">
        <div className="title">{name}</div>
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
        <div className="container-temperature">
          <div className="temprature"> ºF: {temperature}</div>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  name: PropTypes.string,
  time: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  timezone: PropTypes.string,
  temperature: PropTypes.number,
};

export default Clock;
