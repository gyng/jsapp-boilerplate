/* eslint-disable import/no-duplicates */
/* eslint-disable import/export */
declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  export default ReactComponent;
}

declare module "*.icon-svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  export default ReactComponent;
}
