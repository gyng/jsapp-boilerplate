import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { domainReducers } from "@src/domains";
// eslint-disable-next-line import/no-cycle
import { featureReducers } from "@src/features";

const features = combineReducers(featureReducers);
const domains = combineReducers(domainReducers);

const rootReducer = combineReducers({
  domains,
  features,
});

export type RootState = ReturnType<typeof rootReducer>;

/** For testing, gets a initial store */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // We don't have any custom middleware, so this is commented out
    // middleware: [...getDefaultMiddleware<RootState>()] as const,
  });

export const store = makeStore();
export type RootDispatch = typeof store.dispatch;
