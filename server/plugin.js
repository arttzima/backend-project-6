import path from 'path';
import { fileURLToPath } from 'url';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import fastifySecureSession from '@fastify/secure-session';
import fastifyFlash from '@fastify/flash';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifyObjectionjs from 'fastify-objectionjs';
import fastifyFormbody from '@fastify/formbody';
import qs from 'qs';
import pug from 'pug';
import i18next from 'i18next';
import addRoutes from './routes/index.js';
import models from './models/index.js';
import * as knexConfig from '../knexfile.js';

import en from './locales/en.js';
import ru from './locales/ru.js';

import helpers from './helpers/index.js';

const mode = process.env.NODE_ENV || 'development';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const setUpViews = (app) => {
  app.register(
    fastifyView,
    {
      engine: {
        pug,
      },
      includeViewExtension: true,
      defaultContext: helpers(),
      templates: path.join(__dirname, '..', 'server', 'views'),
    },
  );

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = path.join(__dirname, '..', 'style');
  app.register(fastifyStatic, {
    root: pathPublic,
  });
};

const setupLocalization = async () => {
  await i18next
    .init({
      lng: 'en',
      fallbackLng: 'ru',
      resources: {
        en,
        ru,
      },
    });
};

const registerPlugins = async (app) => {
  await app.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });

  await app.register(fastifySecureSession, {
    secret: process.env.SESSION_KEY,
    cookie: {
      path: '/',
    },
  });

  await app.register(fastifyFlash);
  await app.register(fastifyReverseRoutes);
  await app.register(fastifyFormbody, { parser: qs.parse });
};

export default async (app, _options) => {
  await registerPlugins(app);
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  await setupLocalization();

  return app;
};
