import React, { useReducer } from "react";
import { dataReducer } from "./dataReducer";
import { DataContext } from "./dataContext";
import { ADD_DATA, HIDE_LOADER, SHOW_LOADER } from "./dataType";

export const DataState = ({ children }) => {
  const initialState = {
    postsData: [],
    loading: true,
  };
  // хук состояния
  const [state, dispatch] = useReducer(dataReducer, initialState);
  // загрузка на странице
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  // запись данных
  const setPosts = (postsData) => dispatch({ type: ADD_DATA, postsData });

  return (
    <DataContext.Provider
      value={{
        postsData: state.postsData,
        loading: state.loading,
        setPosts,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
