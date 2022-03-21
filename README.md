## AWS-EMAIL

This is a backend for the Amazon SES newsletter service

Stack: [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [Typescript](https://www.typescriptlang.org/), [PostgreSQL](https://www.postgresql.org/), [Sequelize](https://sequelize.org/)


### Deploy

Local PostgreSQL installation is required

PostgreSQL can be installed on MacOS with Brew:
https://gist.github.com/peterdee/087dae4bb1ed7937c6f1d650059113fe

Install PostgreSQL on Ubuntu:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

After the installation you should create a role that is going to be used for the database access:

```shell script
sudo -u postgres createuser --interactive

Enter name of role to add: <ROLE NAME>
Shall the new role be a superuser? (y/n) <YES>
```

Created role should be a superuser

After creating a role, you should create a default database for that role:

```shell script
createdb <ROLE NAME>
```

After that, you should set a password for the created role via `psql`:

```shell script
psql

ALTER ROLE <ROLE NAME> WITH ENCRYPTED PASSWORD '<PASSWORD>';
```

Clone the project and install the dependencies:

```shell script
git clone https://github.com/Kazakova-A/tech-service
cd ./tech-service
npm i
```

### Environment

The `.env` file is required, see the [.env.example](.env.example) for details

### Launch (development)

Run Typescript compilation and hot reloading:

```shell script
npm run watch
```

Run the server in a separate terminal window:

```shell script
npm run dev
```

You don't need to run additional scripts, synchronization is done automatically

### Sync

Syncs the database if launching for the first time:

```shell script
npm run sync
```

This script does not launch the server, and is done automatically when launching the server

### Drop (development)

Drops all data from the database (**DEVELOPMENT ONLY**):

```shell script
npm run drop
```

`DATABASE_ENV="development"` and `NODE_ENV="development"` environment variables are required for this script to work 

### Build

Builds the project:

```shell script
npm run build
```

This script does not launch the server, and is done automatically when launching the server

### Database

See the [DATABASE.md](DATABASE.md) for details

### Demo endpoints:
http://localhost:2121/filters/zip/:zipCode - по зипу

http://localhost:2121/filters/specialization/:zipCode?brand=Samsung&technique=TV

