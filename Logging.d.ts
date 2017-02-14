declare namespace LogManager {
    /**
     * Log appender targeting the NS execution log
     * Severities are mapped as follows:
     *
     * debug -> NS 'DEBUG'
     * info -> NS 'AUDIT'
     * warn -> NS 'ERROR'
     * error -> NS 'emergency'
     */
    class ExecutionLogAppender {
        constructor();
        debug(logger: any, ...args: any[]): void;
        error(logger: any, ...args: any[]): void;
        info(logger: any, ...args: any[]): void;
        warn(logger: any, ...args: any[]): void;
    }

    /**
     * Value to be prepended to each log message title. Defaults to a random 4 digit integer
     * @type {string}
     */
    const correlationId: string;
    /**
     * if true then log message include a random integer (or your custom) prefix to each log entry title.
     * which is fixed for the duration of this script run. This can be used to correlate between different runs
     * of the same script (e.g. multiple runs of a scheduled script or discerning between multiple simultaneous calls
     * to a RESTlet or Suitelet)
     */
    const includeCorrelationId: boolean;

    /**
     * Specifies the available logging levels.
     */
     const enum LogLevel {

        /**
         * No logging.
         */
        none,

        /**
         * Log only error messages.
         */
        error,

        /**
         * Log warnings messages or above.
         */
        warn,

        /**
         * Log informational messages or above.
         */
        info,

        /**
         * Log all messages.
         */
        debug
    }

    /**
     * the log level values
     */
    const logLevel : {
        /**
         * No logging.
         */
        none,

        /**
         * Log only error messages.
         */
        error,

        /**
         * Log warnings messages or above.
         */
        warn,

        /**
         * Log informational messages or above.
         */
        info,

        /**
         * Log all messages.
         */
        debug
    }

    /**
     * Adds the given appender to ALL loggers
     * @param appender
     */
    function addAppender(appender: any): void;

    /**
     * Uses AOP to automatically log method entry/exit with arguments to the netsuite execution log.
     * Call this method at the end of your script. Log entries are 'DEBUG' level.
     *
     * @param methodsToLogEntryExit array of pointcuts
     * @param {Object} config configuration settings
     * @param {Boolean} [config.withArgs] true if you want to include logging the arguments passed to the method in the
     * details. Default is true.
     * @param {Boolean} [config.withReturnValue] true if you want function return values to be logged
     * @param {Boolean} [config.withProfiling] set true if you want elapsed time info printed for each function
     * @param {Boolean} [config.withGovernance] set true if you want remaining governance units info printed for
     * each function
     * false. Colors not configurable so that we maintain consistency across all our scripts.
     * @param {number} [config.logType] the logging level to use, logLevel.debug, logLevel.info, etc.
     * @returns {} an array of jquery aop advices
     */
    function autoLogMethodEntryExit(methodsToLogEntryExit?: {target: Object, method: string | RegExp},
                                    config?: AutoLogConfig): any;

    /**
     * Gets the current default logging level
     *
     * @return The logLevel value used in all loggers.
     */
    function getLevel(): LogLevel;

    /**
     * Gets a logger by name - creates a new instance if it doesn't yet exist - otherwise returns the existing instance
     * @param id name of the logger to get
     */
    function getLogger(id: string): Logger;

    /**
     * Controls whether the correlation id prefixes should be included in log messages or not.
     * @param enable if true, adds correlationid to the log messages, otherwise no correlation id prefix is added
     */
    function setIncludeCorrelationId(enable: any): any;

    /**
     * Sets the current default logging level. New loggers get this level assigned when constructed.
     */
    function setLevel(level: number | LogLevel): void;

    /**
     * Configuration options for AutoLogMethodEntryExit
     */
     interface AutoLogConfig {
        /**
         * set true to include automatically include passed method arguments in the logs
         */
        withArgs?: boolean;
        /**
         * If true, includes the function return value in the log
         */
        withReturnValue?: boolean;
        /**
         *
         */
        withProfiling?: boolean;
        withGovernance?: boolean;
        logger?: Logger;
        logLevel?: number;
    }

    /**
     * A logger logs messages to a set of appenders, depending on the log level that is set.
     */
    interface Logger {

    /**
     * The id that the logger was created with.
     */
    id: string;

    /**
     * The logging severity level for this logger
     */
    level: number;

    /**
     * You cannot instantiate the logger directly - you must use the getLogger method instead.
     */
    constructor(id: string, key: Object);

    /**
     * Logs a debug message.
     *
     * @param message The message to log.
     * @param rest The data to log.
     */
    debug(message: string, ...rest: any[]): void;

    /**
     * Logs info.
     *
     * @param message The message to log.
     * @param rest The data to log.
     */
    info(message: string, ...rest: any[]): void;

    /**
     * Logs a warning.
     *
     * @param message The message to log.
     * @param rest The data to log.
     */
    warn(message: string, ...rest: any[]): void;

    /**
     * Logs an error.
     *
     * @param message The message to log.
     * @param rest The data to log.
     */
    error(message: string, ...rest: any[]): void;

    /**
     * Sets the level of logging for this logger instance
     *
     * @param level Matches a value of logLevel specifying the level of logging.
     */
    setLevel(level: number): void;
}

    /**
     * The default logger - is aliased to the global variable 'log'
     */
    const DefaultLogger: Logger
}
