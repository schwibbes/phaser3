# Browser Game Template using Phaser 3

This repo provides an easy to use starting point for coding browser games using https://phaser.io (version 3), batteries included:
* pure javascript (ES6)
* no packaging needed, phaser.js is the only required lib
* nodejs based web-server

## Required Tools

### Setup NPM on Windows
- if you use WSL2, follow the Linux guide below
- Download and install the msi from here https://nodejs.org

### Setup NPM on Linux
```bash
$ apt update && apt install nodejs npm
```

## Fork the repo
```bash
$ git clone git@github.com:schwibbes/phaser3.git
```

## Run for development
```bash
$ npm start

# Now open http://localhost:3344/index.html in your favorite browser.
```

## Run in production
```bash
$ docker-compose build
$ docker-compose up

# Now open http://localhost:3344/index.html in your favorite browser.
```