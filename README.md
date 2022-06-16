# bonniedotdev

Code for https://bonnie.dev

## License

[GNU AFFERO GENERAL PUBLIC LICENSE](COPYING)

## Installation for Development

### Environment variables

- `$ cp dotenv_template .env`
- Fill out your environment variables
  - for development, the value of `FLASK_ENV` should be `development`

### Client

- `$ cd client`
- `$ npm install`
- `$ npm run dev:build`

### Server

- `$ pip install pre-commit` # if you don't have it installed globally
- `$ cd server`
- Create and activate a [virtual env](https://virtualenv.pypa.io/en/stable/)
- `$ pip install -r requirements.txt`
- `$ pre-commit install`

## Building the Client for Production

After changes, you can re-build the client with:

- `$ cd client`
- `$ npm run build`
- `postbuild.sh` will run automatically to move files to the correct place in app

## Start up

- `$ cd server`
- `$ source .env && python server.py`

- _Note_: You will need to re-run `npm run dev:build` upon changes to client

## Testing

### Client

- `$ cd client`
- `$ npm test`

### Server

- `$ cd server`
- `$ source .env`
- `$ chmod +x ./run_tests.sh` (make the file executable)
- `$ ./run_tests.sh`

## Deploying

### Deploying client

1. Build the client

- `$ cd client`
- `$ npm run build`
- `postbuild.sh` will run automatically to move files to the correct place in app

2. Upload the build

- `$ bash server/scripts/upload_build.sh`

3. log on to aws lightsail and run post-upload script

- locally: `bdd-ssh`
- on lightsail: `~/bonniedotdev/server/scripts/bdd-postupload.sh`

### Deploying server

1. log on to lightsail

- locally: `bdd-ssh`

2. Pull from GitHub

- on lightsail: `git pull origin main`

3. Update db if applicable

- on lightsail: `~/bonniedotdev/server/scripts/update_db.sh`

4. Restart server

- on lightsail: `~/bonniedotdev/server/scripts/restart_server.sh`
