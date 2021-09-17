import { render } from "@testing-library/react";
import * as React from "react";
import { SvgExample } from "../SvgExample";

describe("SVG loading", () => {
  it("is mocked in tests", () => {
    const wrapper = render(<SvgExample />);
    expect(wrapper.container.querySelectorAll("svg")).toHaveLength(2);
  });
});
