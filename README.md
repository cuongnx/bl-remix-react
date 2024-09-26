# Starter project for Remix + Reactjs + Vite + Typescript
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
- 