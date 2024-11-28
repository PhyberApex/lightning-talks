// Type-safe configuration object
const config = {
  api: {
    endpoint: "https://api.example.com",
    timeout: 5000,
    retries: 3,
  },
  features: {
    darkMode: true,
    betaFeatures: false,
  },
  theme: {
    primary: "#007AFF",
    secondary: "#5856D6",
  },
} as const;

// Helper type to remove readonly modifiers and widen literal types
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object
      ? Mutable<T[P]>
      : T[P] extends string
          ? string
          : T[P] extends number
              ? number
              : T[P] extends boolean
                  ? boolean
                  : T[P];
};

type Config = typeof config;
type MutableConfig = Mutable<Config>;
type ApiConfig = Config["api"];

// Function that accepts only valid config sections
function updateConfig<K extends keyof MutableConfig>(
  section: K,
  value: MutableConfig[K]
) {
  // Implementation
}

// Type-safe usage
updateConfig("api", {
  endpoint: "https://new-api.example.com",
  timeout: 3000,
  retries: 5,
});

updateConfig("api", { invalidKey: true });