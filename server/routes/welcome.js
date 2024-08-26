export default (app) => {
  app
    .get('/', (req, reply) => {
      reply.view('server/views/layouts/application');
    });
};
