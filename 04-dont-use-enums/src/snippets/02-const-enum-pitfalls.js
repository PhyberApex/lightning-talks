var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["WARNING"] = 1] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
})(LogLevel || (LogLevel = {}));
function log(message, level) {
    console.log("[".concat(level, "] ").concat(message));
}
log('This works', LogLevel.DEBUG);
console.log(Object.values(LogLevel));
