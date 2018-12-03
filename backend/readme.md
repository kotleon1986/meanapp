## Installation and running

1. Run `npm install` to load packages.
2. Copy `.env.example` file to `.env` and setup the `SECRET_KEY` variable.
3. Open config folder. Create `config.json` file and copy content from `config.json.sample` here.
   Setup database configurations.
4. Install `sequelize-cli` globally (recommended) by `npm i -g sequelize-cli`.
5. Install `nodemon` globally by `npm i -g nodemon`;
6. Run migrations by `sequelize db:migrate` (make sure to create database before).
7. Run application by `npm start`. 