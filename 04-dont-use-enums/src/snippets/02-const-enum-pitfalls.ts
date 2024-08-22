const enum LogLevel {
  DEBUG = 'debug',
  WARNING = 'warning',
  ERROR = 'error'
}

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log('Still works', LogLevel.DEBUG); // OK
log('Still fails', 'debug'); // Error: Argument of type 'string' is not assignable to parameter of type 'LogLevel'.
