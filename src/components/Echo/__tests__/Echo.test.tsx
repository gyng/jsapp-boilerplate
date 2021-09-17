import * as React from "react";
import { Echo } from "@src/components/Echo";
import { render, screen } from "@testing-library/react";

describe("Echo", () => {
  it("renders the text", () => {
    render(<Echo text="Hello, world!" />);
    expect(screen.getByText("Hello, world!")).toBeVisible();
  });

  it("can do snapshot tests", () => {
    // You can perform snapshot testing if you so prefer
    const wrapper = render(<Echo text="Hello, world!" />);
    expect(wrapper).toMatchSnapshot();
  });
});
