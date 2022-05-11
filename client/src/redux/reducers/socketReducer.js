import { GLOBALTYPES } from "../actions/globalTypes";

const socketReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case GLOBALTYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
