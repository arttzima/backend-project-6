import path from 'path';
import { fileURLToPath } from 'url';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import pug from 'pug';
import i18next from 'i18next';
import addRoutes from './routes/index.js';

import en from './locales/en.js';
import ru from './locales/ru.js';

import helpers from './helpers/index.js';

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
    },
  );
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

export default async (app, _options) => {
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  await setupLocalization();

  return app;
};
