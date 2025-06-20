import {ThunkAction} from "redux-thunk";
import {Action, combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import portfolioReducer from "./portfolio-reducer";

const rootReducer = combineReducers({
    tokensPage: portfolioReducer
})
const store = configureStore({
    reducer: rootReducer
})

export default store;

type RootReducerType = typeof rootReducer;

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
//export type BaseThunkType<A extends Action = UnknownAction, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;
