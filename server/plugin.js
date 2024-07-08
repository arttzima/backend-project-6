import path from 'path';
import { fileURLToPath } from 'url';

import fastify from 'fastify';
import view from '@fastify/view';
import fastifyStatic from '@fastify/static';
import pug from 'pug';

const app = fastify();
const port = 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

await app.register(view, { engine: { pug } });

const __dirname = fileURLToPath(path.dirname(import.meta.url));

await app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'style'),
});
app.get('/', (req, res) => {
  res.view('server/views/layouts/index');
});
app.listen({ host, port }, () => {
  console.log(`App listening on port ${port}`);
});

export const options = {
  exposeHeadRoutes: false,
};

export default async (app, _options) => app;
