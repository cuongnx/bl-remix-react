# Starter boilerplate for Remix + Reactjs + Vite + Typescript

- vite.config.ts
- tsconfig.json
- server.ts
- package.json
  - build: build to `build` folder with `build/server` and `build/client` for production
  - dev: start development server
  - start: start production server

# Why?

- It's just a simple boilerpate, but...
- As of the time writing this, I got trouble getting it up with Typescript. There is a problem with running `ts-node server.ts`, because its support for ESM is poor. I have to use `node --loader ts-node/esm ./server.ts`
- ESLint 9 with flat config has many problems with other eslint plugin documents. So must install ESLint 8.
- Struggled with converting `viteDevServer.ssrLoadModule() as ServerBuild`

# Steps to create this boilerplate

(follow the document at https://remix.run/docs/en/main/start/quickstart)

- Install remix
  `npm i @remix-run/node @remix-run/react @remix-run/serve isbot@4 react react-dom`
  `npm i -D @remix-run/dev vite`
- Create `vite.config.ts` and `src/root.jsx`
- Test `npm run vite:build` and install express server
  `npm uninstall @remix-run/serve && npm i express @remix-run/express cross-env`
- Create `server.js` and run the test (the first version as in remix document)
- Make changes to `server.js` to support development environment with `vite`
- Add dotenv and `.env` file, `npm i dotenv`

(from here is my struggle)

- Install TS, following instruction from the official document
  https://remix.run/docs/en/main/guides/typescript
- Change to `server.ts`, struggled to typecast `viteDevServer.ssrLoadModule()` to get `ServerBuild`
- Add to `server.ts` the `buildEnd` config to separate production build and development build
- Add eslint, prettier
  `npm i -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier`
- Struggled to work with flat config of eslint 9, but to no avail because not all plugin supported them
- Turn to eslint 8 and configure `.eslintrc.json` and `.prettierrc` to work with react (and vscode too!!!)
  `npm i -D eslint-plugin-react eslint-plugin-react-hooks`
- Add husky, lint-staged and configure pre-commit hook
  `npm i -D husky lint-staged`
- And it seems to run!!!

# Scripts

- Run dev server (with the DEV_PORT setting in `.env`)
  `npm run dev`
  You can run this server without running `vite:build`
- Build and run production server
  `npm run vite:build`
  `npm run start` (this will trigger build)
- For linting (just finding error)
  `npm lint`
- For finding lint error and fix (not my preference)
  `npm lint:fix`
- For auto format the code (should check diff after formatting)
  `npm format`
