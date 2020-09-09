# personal-site
Personal web site

## License
[GNU AFFERO GENERAL PUBLIC LICENSE](COPYING)

## Installation for Development
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

## Start up
  - `$ cd server`
  - `$ source .env && python server.py`

  - *Note*: You will need to re-run `npm run dev:build` upon changes to client

## Testing
### Client
  - `$ cd client`
  - `$ npm test`

### Server
  - `$ cd server`
  - `$ py.test`
