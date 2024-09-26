import 'dotenv/config';
import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import { ServerBuild } from '@remix-run/node';

const app = express();
let build = null;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build/client'));
  // @ts-expect-error - the file might not exist yet but it will
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
  build = ssrModule as unknown as ServerBuild;
}

app.all('*', createRequestHandler({ build }));

const port = process.env.PORT || process.env.DEV_PORT;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
