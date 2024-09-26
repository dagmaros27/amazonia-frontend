import { createContext, useContext, useReducer } from "react";

//data layer created
export const StateContext = createContext();

//wrap the app with the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//to pull info from the data layer
export const useStateValue = () => useContext(StateContext);
