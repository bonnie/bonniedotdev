# personal-site

Personal web site

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
