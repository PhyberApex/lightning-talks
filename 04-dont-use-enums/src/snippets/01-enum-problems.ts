enum LogLevel {
  DEBUG = 'debug',
  WARNING = 'warning',
  ERROR = 'error'
}

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log('This works', LogLevel.DEBUG); // OK
log('This fails', 'debug'); // Error: Argument of type 'string' is not assignable to parameter of type 'LogLevel'.
