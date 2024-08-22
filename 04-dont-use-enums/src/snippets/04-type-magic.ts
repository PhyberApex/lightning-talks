const LOG_LEVEL = {
  DEBUG: 'debug',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

type ObjectValues<T> = T[keyof T];
type LogLevel = ObjectValues<typeof LOG_LEVEL>;

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log('Object property', LOG_LEVEL.DEBUG); // OK
log('String literal', 'warning'); // OK

// Type checking and autocompletion work great
log('Error', 'error'); // OK
log('Typo', 'eror'); // Error: Argument of type '"eror"' is not assignable to parameter of type 'LogLevel'.
