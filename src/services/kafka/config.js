const topic = "h980quxy-slack-dev";

const config = {
  brokers: [
    "tricycle-01.srvs.cloudkafka.com:9094",
    "tricycle-02.srvs.cloudkafka.com:9094",
    "tricycle-03.srvs.cloudkafka.com:9094",
  ],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256", // scram-sha-256 or scram-sha-512
    username: "h980quxy",
    password: "XiJsSU3ubpyKybpXe6ZSm40iukjB7rYd",
  },
};

module.exports = { config, topic };
