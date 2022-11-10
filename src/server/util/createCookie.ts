// Create a cookie string from an object.
// { hello: "value" } -> "hello=value"
const createCookie = (cookieObject: Record<string, string>) => {
  return Object.entries(cookieObject)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("; ");
};

export { createCookie };
