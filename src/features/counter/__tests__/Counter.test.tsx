import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Counter } from "../Counter";

describe("Counter", () => {
  it("renders the value", () => {
    // Find by data-testid
    render(
      <Counter
        onDecrementClick={jest.fn()}
        onIncrementClick={jest.fn()}
        onIncrementClickAsync={jest.fn()}
        onIncrementClickAsyncAwait={jest.fn()}
        onIncrementClickAsyncPromise={jest.fn()}
        value={0}
      />
    );
    expect(screen.getByTestId("counter-value").textContent).toBe("0");
  });

  it("renders the increment buttons", () => {
    // Find by CSS
    const wrapper = render(
      <Counter
        onDecrementClick={jest.fn()}
        onIncrementClick={jest.fn()}
        onIncrementClickAsync={jest.fn()}
        onIncrementClickAsyncAwait={jest.fn()}
        onIncrementClickAsyncPromise={jest.fn()}
        value={0}
      />
    );
    const incrementEl = wrapper.container.querySelectorAll("button.increment");
    expect(incrementEl).toHaveLength(4);
  });
});
