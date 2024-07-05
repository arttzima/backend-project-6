import fastify from 'fastify';

const app = fastify();
const port = 3000;

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('World!');
});

export default () => app;
