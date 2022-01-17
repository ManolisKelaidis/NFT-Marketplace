const errors = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Invalid Data",
  409: "Conflict - Entity already exists",
  500: "Internal Server Error",
  505: "Ruolo non valido",
  550: "Route not found",
  560: "User already exists with same username",
  570: "Invalid orgId"
};

class ServerError extends Error {
  constructor(error, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = "ServerError";
    // Custom debugging information
    this.code = error.code || 500;
    this.number = error.number || this.code;
    this.message = error.message || this.getMessage(this.code);
    this.status =
      this.code > 399 && this.code < 500 ? this.code : error.status || 500;
    this.date = new Date();
  }

  getMessage(code) {
    return errors[code];
  }
}

module.exports = ServerError;
