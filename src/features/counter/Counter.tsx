import classNames from "classnames";
import * as React from "react";
import { Helmet } from "react-helmet";

const styles = require("./counter.pcss");

export interface CounterProps {
  onDecrementClick: () => void;
  onIncrementClick: () => void;
  onIncrementClickAsync: () => void;
  onIncrementClickAsyncPromise: (url: string) => void;
  onIncrementClickAsyncAwait: (url: string) => void;
  value?: number;
}

export class Counter extends React.Component<CounterProps> {
  public static defaultProps: Partial<CounterProps> = { value: 0 };

  public render(): React.ReactNode {
    return (
      <div className={styles.container}>
        <Helmet>
          <title>Counter example with custom favicon</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22
           viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧮</text></svg>"
          />
        </Helmet>

        <div className={classNames(styles.value, "value")}>
          {this.props.value}
        </div>

        <div>
          <button className="increment" onClick={this.props.onIncrementClick}>
            INCREMENT
          </button>
          <button className="decrement" onClick={this.props.onDecrementClick}>
            DECREMENT
          </button>
          <button
            className="increment"
            onClick={this.props.onIncrementClickAsync}
          >
            INCREMENT AFTER 1 SECOND
          </button>

          <button
            className="increment"
            onClick={() => {
              this.props.onIncrementClickAsyncPromise("/");
            }}
          >
            INCREMENT ASYNC/AWAIT
          </button>

          <button
            className="increment"
            onClick={() => {
              this.props.onIncrementClickAsyncPromise("www.example.invalidtld");
            }}
          >
            INCREMENT ASYNC PROMISE (404)
          </button>
        </div>
      </div>
    );
  }
}
