lint:
	npx eslint .

fix:
	npx eslint --fix .

start:
	npm run start

demon:
	npx nodemon src/index.js

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git'

build:
	npx webpack
