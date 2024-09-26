import 'dotenv/config';
import { createRequestHandler } from '@remix-run/express';
import express from 'express';

const app = express();
let build = null;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build/client'));
  // @ts-ignore - the file might not exist yet but it will
  build = await import('build/server/remix.js');
} else {
  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);

  const ssrModule = await viteDevServer.ssrLoadModule(
    'virtual:remix/server-build',
  );
  build = ssrModule.entry.module;
}

app.all('*', createRequestHandler({ build }));

const port = process.env.PORT || process.env.DEV_PORT;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
