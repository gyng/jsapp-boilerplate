import { makeStore } from "@src/types";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import { CounterContainer } from "../Counter.container";

describe("CounterContainer", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("onIncrementClick", () => {
    render(
      <Provider store={makeStore()}>
        <CounterContainer />
      </Provider>
    );
    expect(screen.getByTestId("counter-value").textContent).toBe("0");
    fireEvent.click(screen.getByText("INCREMENT"));
    expect(screen.getByTestId("counter-value").textContent).toBe("1");
  });

  it("onIncrementClickAsync", () => {
    render(
      <Provider store={makeStore()}>
        <CounterContainer />
      </Provider>
    );
    expect(screen.getByTestId("counter-value").textContent).toBe("0");
    fireEvent.click(screen.getByText("INCREMENT AFTER 1 SECOND"));
    expect(screen.getByTestId("counter-value").textContent).toBe("0");
    jest.runAllTimers();
    expect(screen.getByTestId("counter-value").textContent).toBe("1");
  });

  it("onIncrementClickAsyncPromise success", async () => {
    fetchMock.doMock();
    fetchMock.mockIf(/.*/, async () => {
      return {
        status: 200,
        body: "OK",
      };
    });

    render(
      <Provider store={makeStore()}>
        <CounterContainer />
      </Provider>
    );
    expect(screen.getByTestId("counter-value").textContent).toBe("0");
    fireEvent.click(screen.getByText("INCREMENT ASYNC/AWAIT"));
    expect((await screen.findByTestId("counter-value")).textContent).toBe(
      "200"
    );
  });

  it("onIncrementClickAsyncPromise failure", async () => {
    fetchMock.doMock();
    fetchMock.mockIf(/.*/, async () => {
      return {
        status: 404,
        body: "BAD",
      };
    });

    render(
      <Provider store={makeStore()}>
        <CounterContainer />
      </Provider>
    );

    expect(screen.getByTestId("counter-value").textContent).toBe("0");
    fireEvent.click(screen.getByText("INCREMENT ASYNC PROMISE (404)"));
    expect((await screen.findByTestId("counter-value")).textContent).toBe("0");
  });
});
