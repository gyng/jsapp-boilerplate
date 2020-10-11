import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, Route, Switch } from "react-router-dom";
import { Echo } from "@src/components/Echo";
import { ErrorPage } from "@src/components/ErrorPage";
import { Routes } from "@src/routes";
import { SvgExample } from "@src/components/SvgExample";
import { CounterContainer } from "@src/features/counter/Counter.container";
import { BooklistContainer } from "@src/features/booklist/Booklist.container";
import { AppConfigContext } from "@src/index";

// Let webpack instead of ts handle these imports
const hello = require("./hello.jpg").default;
const styles = require("./app.pcss");

// Include global CSS and variables once
require("@src/styles/variables.pcss");
require("@src/styles/typography.pcss");
require("@src/styles/root.pcss");

// Legacy CSS is supported
require("./legacy.css");

// This is a nice way to define your custom presentational components
// that just pass down props.
export type IBoxProps = React.HTMLAttributes<HTMLDivElement>;

// Example inline functional React component
const Box: React.FunctionComponent<IBoxProps> = (props) => (
  <div className={styles.box} {...props}>
    {props.children}
  </div>
);

export class App extends React.Component {
  public render(): React.ReactNode {
    const appPage = ( // Example usage of legacy CSS class name mixed with CSS modules
      <div className={`app ${styles.grid}`}>
        <Helmet>
          <title>Per-component title set using react-helmet</title>
        </Helmet>

        <div className={styles.row}>
          <h1 className={styles.title}>jsapp-boilerplate</h1>
          <div>
            <a href="https://github.com/gyng/jsapp-boilerplate">GitHub</a>
            &nbsp;&middot;&nbsp;
            <span>
              Find me in{" "}
              <a href="https://github.com/gyng/jsapp-boilerplate/blob/master/src/components/App/App.tsx">
                <code>src/components/App/App.tsx</code>
              </a>
            </span>
          </div>
        </div>

        {/* React style prop is still available */}
        <Box
          className={styles.box}
          style={{ alignSelf: "flex-start", flexDirection: "column" }}
        >
          {/* Example usage of switch for routing */}
          <Link to="./counter">
            Link to /counter. Click to show counter. Back/Forward buttons and
            page refresh work.
          </Link>

          <Link to="./booklist">
            Link to /booklist. Click to show booklist example.
          </Link>
        </Box>

        <Box>
          <div>
            {/* Styling with CSS modules */}
            <img className={styles.robot} src={hello} alt="Cute robot?" />

            {/* Using other components */}
            <Echo text="Hello, world!" />
            <Link to="/no-page-lives-here">Link to example error page</Link>
          </div>
        </Box>

        {/* Example DOM for nested CSS */}
        <Box>
          <div
            className={styles.themedDiv}
            style={{
              border: "solid 1px grey",
              padding: "var(--m-m)",
            }}
          >
            This div is themed using PostCSS and React&apos;s style prop
            <SvgExample />
          </div>
        </Box>

        <Box>
          <div style={{ alignItems: "flex-start" }}>
            <div style={{ marginBottom: "var(--m-m)" }}>
              Current configuration
            </div>
            <AppConfigContext.Consumer>
              {(config) => <pre>{JSON.stringify(config, null, 2)}</pre>}
            </AppConfigContext.Consumer>
            <p>
              Configure in{" "}
              <a href="https://github.com/gyng/jsapp-boilerplate/blob/master/config/configValues.js">
                <code>config/configValues.js</code>
              </a>
            </p>
          </div>
        </Box>
      </div>
    );

    // This is your main App router
    // Typically for more complex apps I create a Routes object in src/routes that looks something like
    //
    // `export const AppRoutes = { base: () => "/"", counters: (id) => `/counters/${id}` }`
    //
    // And then use it for linking `<Link to={AppRoutes.counters(123)}>Counter 123</Link>`
    return (
      <Switch>
        {/* Quickstart for URL matches

        // Define your Match props
        export interface IFooMatch {
          id: string;
        }

        // Reference that type in RouteComponentProps when creating your component
        export class Foo extends React.Component<
          IFooProps & Partial<RouteComponentProps<IFooMatch>>
        > { ... }

        // Then add this route into your router. :id will be passed to the Foo component.
        <Route path="/counter/:id" component={CountersPage} />

        // In medium-large applications you want to reuse route objects:
        // in routes/appRoutes.ts a plain function to create a route is defined by us
        <Route path={AppRoutes.counter(":id")} component={ErrorPage} /> */}
        <Route exact path={Routes.root()} render={() => appPage} />
        <Route path={Routes.counter()} component={CounterContainer} />
        <Route path={Routes.booklist()} component={BooklistContainer} />
        <Route
          path="/"
          render={() => <ErrorPage code="404" message="Page not found" />}
        />
      </Switch>
    );
  }
}
