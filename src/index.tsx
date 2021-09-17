// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import { Configuration } from "@cfg/index.d";
import { store } from "@src/types";
import { Routes } from "@src/routes";
import { loadConfig } from "@src/util/configLoader";
import { ErrorPage } from "./components/ErrorPage";

// Dynamically import App for code splitting, remove this if unwanted
const App = React.lazy(() => import("@src/components/App"));
// import { App } from "@src/components/App";

const configureRouter = (config: Configuration) => {
  const routers: Record<string, typeof Router> = {
    browser: BrowserRouter,
    hash: HashRouter,
  };

  if (!routers[config.url_historyType]) {
    throw new Error(
      `Unable to configure router using config.url_historyType ${config.url_historyType}`
    );
  }

  return {
    basename: config.url_basePath,
    Component: routers[config.url_historyType],
  };
};

export const AppConfigContext = React.createContext<Configuration | undefined>(
  undefined
);

// Dynamic import: remove if unwanted
const SuspenseApp = () => (
  <React.Suspense fallback={<div>Dynamically loading App in index.tsx</div>}>
    <App />
  </React.Suspense>
);

const start = (config: Configuration) => {
  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  const _store = store;

  const routerConfig = configureRouter(config);

  ReactDOM.render(
    <Provider store={_store}>
      <routerConfig.Component basename={routerConfig.basename}>
        <AppConfigContext.Provider value={config}>
          {/* This is an outer routing switch */}
          {/* You probably want to define your routes on the Switch in App.tsx and not here */}
          {/* This outer Switch is useful for partially loading large apps, and special routes */}
          {/* Such as authentication callback routes */}
          {/* You will know it when you need this. */}
          <Switch>
            <Route path={Routes.root()} component={SuspenseApp} />
          </Switch>
        </AppConfigContext.Provider>
      </routerConfig.Component>
    </Provider>,
    document.getElementById("root")
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore __WEBPACKDEFINE_APP_CONFIG_PATH__ injected by webpack
loadConfig(__WEBPACKDEFINE_APP_CONFIG_PATH__)
  .then((config) => {
    start(config);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to load config file.", error);
    ReactDOM.render(<ErrorPage code="500" />, document.getElementById("root"));
  });
