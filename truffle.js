module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    staging: {
      host: "159.203.148.209",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
