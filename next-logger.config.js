const pino = require("pino");

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
      bindings(bindings) {
        return { pid: undefined, hostname: undefined };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    messageKey: "message",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true
      }
    },
  });

module.exports = {
  logger,
};