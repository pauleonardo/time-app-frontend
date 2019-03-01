import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the managerClock state domain
 */

const selectManagerClockDomain = state =>
  state.get('managerClock', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManagerClock
 */

const makeSelectManagerClock = () =>
  createSelector(selectManagerClockDomain, substate => substate.toJS());

export default makeSelectManagerClock;
export { selectManagerClockDomain };
