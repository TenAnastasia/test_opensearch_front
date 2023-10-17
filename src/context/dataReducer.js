import { ADD_DATA, HIDE_LOADER, SHOW_LOADER } from "./dataType";

const handlers = {
  [ADD_DATA]: (state, { postsData }) => ({
    ...state,
    postsData,
  }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const dataReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
