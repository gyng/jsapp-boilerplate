import { shallow } from "enzyme";
import * as React from "react";
import { SvgExample } from "../SvgExample";

describe("SVG loading", () => {
  it("is mocked in tests", () => {
    const wrapper = shallow(<SvgExample />);
    expect(wrapper.find("svg")).toHaveLength(2);
  });
});
