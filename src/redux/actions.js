const actions = {
  ADD_NOTE: 'ADD_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE',
  SET_MEASURE_COUNT: 'SET_MEASURE_COUNT',
  SET_SYNTH: 'SET_SYNTH',
};

export default actions;

export function addNote(note) {
  return {
    type: actions.ADD_NOTE,
    note,
  };
}

export function removeNote(note) {
  return {
    type: actions.REMOVE_NOTE,
    note,
  };
}

export function setSynth(synthType) {
  return {
    type: actions.SET_SYNTH,
    synthType,
  };
}
