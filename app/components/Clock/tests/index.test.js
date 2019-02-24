import React from 'react';
import { shallow, mount } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import Clock from '../index';

describe('<Clock />', () => {
  let clock;
  beforeEach(() => {
    clock = shallow(<Clock />);
  });
  it('Estado inicial del componente', () => {
    const stateInitial = {
      city: '...',
      time: 0,
      previoTime: 0,
      latitude: '*',
      longitude: '*',
    };
    expect(clock.state()).toEqual(stateInitial);
  });
  it('Se debe actualizar el estado cuando cambian las propiedades', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(clock.state()).toEqual({
      previoTime: 0,
      ...props,
    });
  });
  it('Obtiene las horas actuales', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(clock.instance().getHours(clock.state().time)).toBe('19');
  });
  it('Obtiene los minutos actuales', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1551015227,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(clock.instance().getMinutes(props.time)).toBe('50');
  });
  it('Obtiene los segundos actuales', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1551015227,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(clock.instance().getSeconds(props.time)).toBe('15');
  });
  it('Debe devolver la hora en formato 24', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(clock.instance().returnFormated()).toBe('19:01:07');
  });
  it('Validador de horas', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(
      clock
        .instance()
        .areHourDifferent(clock.state().previoTime, clock.state().time),
    ).toBe(true);
  });
  it('Validador de minutos', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(
      clock
        .instance()
        .areMinutesDifferent(clock.state().previoTime, clock.state().time),
    ).toBe(true);
  });
  it('Validador de segundos', () => {
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(
      clock
        .instance()
        .areSecondsDifferent(clock.state().previoTime, clock.state().time),
    ).toBe(true);
  });
  it('Todos los catetos estén en 0 al iniciar', () => {
    clock = mount(<Clock />);
    expect(
      clock.ref('hours').firstElementChild.lastElementChild.textContent,
    ).toEqual('0');
    expect(
      clock.ref('hours').lastElementChild.lastElementChild.textContent,
    ).toEqual('0');
    expect(
      clock.ref('minutes').firstElementChild.lastElementChild.textContent,
    ).toEqual('0');
    expect(
      clock.ref('minutes').lastElementChild.lastElementChild.textContent,
    ).toEqual('0');
    expect(
      clock.ref('seconds').firstElementChild.lastElementChild.textContent,
    ).toEqual('0');
    expect(
      clock.ref('seconds').lastElementChild.lastElementChild.textContent,
    ).toEqual('0');
  });
  it('Que los numeros de los catetos sean los correctos cuando se actualice la hora', () => {
    clock = mount(<Clock />);
    const props = {
      city: 'Europe/Zurich',
      time: 1550965072,
      latitude: 47.37861,
      longitude: 8.54,
    };
    clock.setProps(props);
    expect(
      clock.ref('hours').firstElementChild.lastElementChild.textContent,
    ).toEqual('1');
    expect(
      clock.ref('hours').lastElementChild.lastElementChild.textContent,
    ).toEqual('9');
    expect(
      clock.ref('minutes').firstElementChild.lastElementChild.textContent,
    ).toEqual('4');
    expect(
      clock.ref('minutes').lastElementChild.lastElementChild.textContent,
    ).toEqual('9');
    expect(
      clock.ref('seconds').firstElementChild.lastElementChild.textContent,
    ).toEqual('2');
    expect(
      clock.ref('seconds').lastElementChild.lastElementChild.textContent,
    ).toEqual('5');
  });
});
