# The Things Network storage Handler
[The Things Network](https://thethingsnetwork.org)
This software read MQTT flow from TTN and save it in a database with [Waterline](https://github.com/balderdashy/waterline)
First version use a sails-disk adapter but we will evolve to mongoDB and MySQL in short Terms

## Prerequisites

* [Node.JS](https://nodejs.org/) (use a new-ish version, like 5.9 or higher, I tested with 6.2 only)
* An account and application in the [Dashboard](https://staging.thethingsnetwork.org/).


## Getting Started

```
  npm install
```

  Rename config.bak.js in config.js and Change parameter with you information
  

```
  npm Start
```
##TODO

  * Multi Database support mongoDB, MySQL
  * Add SocketIO support for real time apps
