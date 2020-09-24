import * as React from "react";

import ClockIcon from "./assets/clock.icon-svg";
import Clock from "./assets/clock.svg";

export const SvgExample: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      SVG examples
      <p>
        Icons are <ClockIcon /> used for inline SVGs, and have .icon.svg
        extensions
      </p>
      <p>
        Normal SVGs are loaded as React components <Clock />
      </p>
    </div>
  );
};
