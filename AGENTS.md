# Repository Guidelines

This project is built with **Node** and uses **Yarn** for package management.

## Setup
1. Install dependencies:
   ```bash
   yarn install
   ```

## Building
- To build both the server and client:
  ```bash
  yarn assemble
  ```
  This runs the server and client webpack builds.
- Individual builds:
  ```bash
  yarn build:server      # compile server to dist/
  yarn build:client      # compile client to dist/client
  ```
- Development watchers (run in separate terminals):
  ```bash
  yarn build:server:dev
  yarn build:client:dev
  ```

## Running
After building, start the server with:
```bash
yarn start
```
This runs `node ./dist/server.js` and serves the compiled client files from `dist/client`.

## Testing
Run the test suite using:
```bash
yarn test
```

Additional tooling includes TypeScript, Webpack, Prettier (tab width 4) and Jest.
