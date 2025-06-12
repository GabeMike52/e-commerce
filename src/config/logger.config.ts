import * as winston from "winston";
const logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
	new (winston.transports.Console)(),
	new (winston.transports.File)({ filename: 'log.log' })
    ]
});

export default logger;
