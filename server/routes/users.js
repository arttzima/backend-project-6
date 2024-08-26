import i18next from 'i18next';

export default (app) => {
  app
    .get('/users/new', { name: 'usersNew' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.user.create.success'));
        reply.redirect('/');
      } catch (e) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { e });
      }
    });
};
