export namespace ApplicationErrors {
  export class NotFoundError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }

  export class UnauthorizedError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class ForbiddenError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class ConflictError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ConflictError';
    }
  }

  export class RequestTimeout extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'RequestTimeout';
    }
  }
}
