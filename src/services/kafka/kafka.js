const { Kafka } = require("kafkajs");
const kafkaConfig = require("./config");

const kafka = new Kafka(kafkaConfig.config);
const topic = kafkaConfig.topic;
const consumer = kafka.consumer({ groupId: "slack-workers" }); // set consumer to a group

// connect and subscribe to topic
const run = async () => {
  console.log('Connecting to Kafka');
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log('Subscribed to', topic);
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
      const slackArguments = JSON.parse(message.value);
      console.log(slackArguments);
    },
  });
};

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});


module.exports = { run }