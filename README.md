# mqtt-connection-manager

[![npm](https://img.shields.io/npm/v/mqtt-connection-manager)](https://www.npmjs.com/package/mqtt-connection-manager) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This package provides a simple way to connect to an MQTT broker and handle incoming messages.

## Getting started

```bash
npm install mqtt-connection-manager
```

## Example
```js
import { MqttConnection } from "mqtt-connection-manager";

const connectionString = `${host}://${hostAddress}:${port}/${username}:${password}/client/${clientId}/${topic}`;

const onMessageCallback = (message) => {
    console.log({ message: message.toString() });
};

const mqttConnection = new MqttConnection(connectionString, onMessageCallback, true);

// To start the connection
mqttConnection.connect();
```

## Api
- `MqttConnection()`

- `connect()`

### MqttConnection(connectionString, onMessageCallback, debug)

Creates a new MQTT connection

- `connectionString`: The connection string to the MQTT broker. It should be the in the format
`${host}://${hostAddress}:${port}/${username}:${password}/client/${clientId}/${topic}`

- `onMessageCallback`: A callback function that is called whenever a message is received. The function should take a parameter: the message.

- `debug`: A boolean indicating wether to display the a banner with info. Default is `false`

### connect()

Start the MQTT connection