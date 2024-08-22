const LOG_LEVEL = {
  DEBUG: 'debug',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

type LogLevel = typeof LOG_LEVEL[keyof typeof LOG_LEVEL];

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log('This works', LOG_LEVEL.DEBUG); // OK
log('This also works', 'warning'); // OK
