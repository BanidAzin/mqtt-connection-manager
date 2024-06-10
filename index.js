import mqtt from "mqtt";

const parseUrl = (url) => {
  const host = url.split("://")[0];

  const hostDetails = url.split("://")[1];
  const hostAddress = hostDetails.split(":")[0];
  const port = parseInt(hostDetails.split(":")[1]);

  const authDetails = url.split("/")[3];
  const username = authDetails.split(":")[0];
  const password = authDetails.split(":")[1];

  const clientId = url.split("/")[5];

  const topic = url.split("/").slice(6).join("/");

  return {
    host,
    hostAddress,
    port,
    username,
    password,
    clientId,
    topic,
  };
};

export class MqttConnection {
  constructor(connectionString, onMessageCallback, debug = false) {
    this.connectionString = connectionString;
    this.onMessageCallback = onMessageCallback;
    this.mqttClient = null;
  }

  connect() {
    try {
      const { hostAddress, port, username, password, clientId, topic } =
        parseUrl(this.connectionString);

      this.mqttClient = mqtt.connect(`ws://${hostAddress}:${port}/mqtt`, {
        username,
        password,
        clientId,
      });

      this.mqttClient.on("connect", () => {
        console.log("MQTT connected");
      });

      this.mqttClient.subscribe(topic, (error) => {
        if (error) throw new Error(`Failed to subscribe to ${topic}:`, error);

        console.log(`Subscribed to topic ${topic}`);
      });

      this.mqttClient.on("message", (_, message) => {
        this.onMessageCallback(message);
      });

      this.mqttClient.on("error", (error) => {
        throw new Error("MQTT connection error:", error);
      });
    } catch (error) {
      console.log({ error });
    }
  }
}
