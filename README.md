# jsapp-boilerplate

## This repository has been archived

Now that there are good and modern alternatives to manually setting up Webpack + dozens of loaders (in 2022), there is little incentive to keeping this maintained.

Consider using

- [esbuild](https://esbuild.github.io/) instead of Webpack
- [vitejs](https://vitejs.dev/) instead of this
- [remix](https://remix.run/)

These frameworks don't come included nice things such as testing, options management or Redux set up, but those should be much more trivial than creating a custom webpack config from scratch. I might come up with a new version of jsapp-boilerplate that adds those that is built off one of those frameworks.

---

A personal JavaScript boilerplate for frontend applications for near-production use. Production deployment will require additional work depending on where and how you plan to deploy your application as this boilerplate only provides deployment to GitHub pages.

This boilerplate contains:

| **Presentation, state**                                            |                            |
| ------------------------------------------------------------------ | -------------------------- |
| [react](https://facebook.github.io/react/docs/hello-world.html)    | ui framework               |
| [redux, redux-toolkit](http://redux.js.org/)                       | state management           |
| [react-redux](http://redux.js.org/docs/basics/UsageWithReact.html) | react-redux integration    |
| [react-router](https://github.com/ReactTraining/react-router)      | routing                    |
| [postcss](https://github.com/postcss/postcss)                      | css preprocessing, styling |
| [plain css](https://developer.mozilla.org/en-US/docs/Web/CSS)      | legacy css escape hatch    |
| **Testing, linting**                                               |                            |
| [jest](https://jestjs.io/)                                         | test framework             |
| [React Testing Library](https://testing-library.com/)              | react test library         |
| [typescript](https://www.typescriptlang.org/docs/home.html)        | type checking              |
| [eslint](http://eslint.org/docs/rules/)                            | linting                    |
| [prettier](https://github.com/prettier/prettier/)                  | formatting                 |
| [stylelint](https://stylelint.io/user-guide/)                      | legacy css linting         |
| **Building, CI, deploying**                                        |                            |
| [configuration](config/configValues.js)                            | run-time configuration     |
| [webpack](https://webpack.js.org/concepts/)                        | javascript bundler         |
| [docker-compose](https://docs.docker.com/compose/compose-file/)    | multi-container            |
| [docker](https://docs.docker.com/engine/reference/builder/)        | ci, production server      |
| [github actions](https://github.com/features/actions)              | ci, cd                     |
| [github pages](https://pages.github.com/)                          | deployment, online hosting |

[Ditherer](https://github.com/gyng/ditherer) is a project built using an older version of this boilerplate.

End-to-end/integration/functional testing is intentionally kept separate. You can consider using Cypress or Playwright for this.

## Usage

Also see: [Getting started](doc/getting_started.md), [Running tests in a Docker Container](doc/docker_tests.md). See all available commands in [`package.json`](package.json).

### Build

    yarn install
    yarn build                      # development build, outputs in /dist
    yarn build:production           # builds for the Docker image in /dist
    yarn build:github               # builds for GitHub Pages in /dist
    yarn analyze:bundle             # runs webpack-bundle-analyzer on an optimized build

### Test

    yarn test                       # runs unit tests once
    yarn test:watch                 # runs unit tests using jest in watch mode
    yarn test:docker                # runs the full test suite in Docker
    yarn lint                       # runs eslint, stylelint (prettier enforced by eslint)
    yarn lint:fix
    yarn lint:eslint
    yarn lint:eslint:fix
    yarn lint:stylelint
    yarn test:coverage              # generates test coverage report using jest

### Develop

    yarn d                          # runs webpack-dev-server (yarn dev) in hot reload mode
    yarn d:nohot                    # runs webpack-dev-server without hot reload
    yarn t:w                        # runs unit tests using jest in watch mode
    yarn t                          # runs tests
    yarn c                          # runs lint and tests

### Deploy

There is a [GitHub action for CD included](.github/workflows/deploy.yml) (set `ACCESS_TOKEN` to a [personal access token with read/write permissions](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) in `Settings > Secrets`). Alternatively, you can manually deploy from your local machine.

    yarn deploy:github              # deploys a production build to GitHub pages
    yarn run:docker                 # runs nginx at port 8080, see nginx.conf

### Update

I have not found a nice solution to this problem. Creating something like create-react-app's eject mechanism is not good enough as it's difficult to both maintain and avoid ejection in any sufficiently complex app. A hackish strategy around this is to add the boilerplate repo as an upstream remote in git, and cherry-pick commits or tags into your application.

    git remote add upstream git@github.com:gyng/jsapp-boilerplate.git
    git fetch
    git cherry-pick $START_COMMIT~1..$END_COMMIT

### Configure

There are two configuration files.

- Buildtime configuration (used by webpack)
- Runtime configuration (used by the app)

#### Buildtime

The buildtime configuration is type-checked. The schema is defined in `config/index.d.ts`.

When building, the config files can be controlled using environment variables. For example, `yarn config:generate:dev` in `package.json` uses the following

- `BUILD_CONFIG_FILE=./config/configValues.js` (default)
- `CONFIG_FILE=./configValues.js` (default)

which `config/generateJson.js` uses to write to `dist/config/config.json`.

Note: Config building is separate from application building, so your configuration file can be generated independently of the build process.

#### Runtime

The runtime configuration is type-checked. The schema is defined in `config/index.d.ts`.

The app will load the config from the hardcoded location `config/config.js` defined in `src/index.tsx`. This can be changed to suit your needs. In the dev environment, values from `config/configValues.js` are used to generate a config file on first build.

In the app, the configuration can be accessed from the React context `AppConfigContext`.

```tsx
import { AppConfigContext } from "@src/index";

const renderConfig = () => (
  <AppConfigContext.Consumer>
    {(config) => <pre>My config: {JSON.stringify(config)}</pre>}
  </AppConfigContext.Consumer>
);
```
