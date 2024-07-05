import fastify from 'fastify';

const app = fastify();
const port = 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

app.listen({ host, port }, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('The app is runnig!');
});

export default () => app;
