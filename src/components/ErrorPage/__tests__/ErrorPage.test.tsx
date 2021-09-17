import * as React from "react";
import { ErrorPage } from "@src/components/ErrorPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@src/types";
import { MemoryRouter } from "react-router";

describe("ErrorPage", () => {
  it("renders", () => {
    render(
      <Provider store={makeStore()}>
        <MemoryRouter>
          <ErrorPage code="418" message="I'm a teapot" />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("418")).toBeVisible();
    expect(screen.getByText("I'm a teapot")).toBeVisible();
  });
});
