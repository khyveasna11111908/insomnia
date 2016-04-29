/**
 * Persist all state children that don't have the property "dontPersist"
 *
 * @param key localStorage key to persist to
 * @returns {function()}
 */
export default function (key) {
  let timeout = null;
  return _ref => {
    const {getState} = _ref;

    return next => action => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const state = getState();
        const stateToSave = {};
        Object.keys(state).filter(k => !state[k].dontPersist).map(k => {
          stateToSave[k] = state[k]
        });

        localStorage[key] = JSON.stringify(stateToSave);
      }, 1000);

      return next(action);
    };
  }
}

export function getState (key) {
  if (!localStorage[key]) {
    return undefined;
  }

  return JSON.parse(localStorage[key]);
}
