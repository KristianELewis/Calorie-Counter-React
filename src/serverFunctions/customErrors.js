export class NotFoundError extends Error {
    constructor(message)
    {
        super(message)
        this.name = "NotFoundError"
    }
}

export class AuthError extends Error {
    constructor(message)
    {
        super(message)
        this.name = "AuthError"
    }
}

export class ServerSideError extends Error {
    constructor(message)
    {
        super(message)
        this.name = "ServerSideError"
    }
}

export class UnknownError extends Error {
    constructor(message)
    {
        super(message)
        this.name = "UnknownError"
    }
}