# Geordi - User Analytics Engine for Zooniverse

This is version 2 of the User Analytics Engine, the project is based upon [LoopBack](http://loopback.io).

Geordi is a simple REST API with storage to capture user interaction event history and retrieve/analyse the results.

It is called Geordi after Geordi LaForge from Star Trek, whose visor allows him to see far beyond what is normally visible to humans. And also because its creator Alex B is from the North East.

## Requirements

You'll need to have the following services running:

* [MySQL](https://www.mysql.com/)

* Ubuntu/Debian: `sudo apt-get install mysql-server`
* OS X (with [homebrew](http://homebrew.io)): `brew install mysql`

## Installation

We only support running Geordi via Docker and Docker Compose. If you'd like to run it outside a container, see the above Requirements sections to get started.

### Setup Docker Engine and Docker Compose

* Docker Engine & Compose
  * [OS X](https://docs.docker.com/compose/install/)
  * [Ubuntu](https://docs.docker.com/compose/install/)

#### Usage

0. Clone the repository `git clone https://github.com/zooniverse/Geordi`.

0. Install Docker & Docker Compose from the appropriate link above.

0. Create and run the application containers by running `docker-compose up`

0. Geordi should be running on port 3030 on your computer, see docker-compose.yml for specific details.
