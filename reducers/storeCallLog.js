const initialState = {
  data: [],
};

export default function storeCallLog(state = initialState, actions) {
  switch (actions.type) {
    case 'STORE_CALL_LOG':
      return {...state, data: actions.data};
    default:
      return state;
  }
}
