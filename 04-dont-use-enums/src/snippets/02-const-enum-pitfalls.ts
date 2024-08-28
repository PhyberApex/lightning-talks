enum LogLevel {
  DEBUG,
  WARNING,
  ERROR,
}

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log('This works', LogLevel.DEBUG);
console.log(Object.values(LogLevel))