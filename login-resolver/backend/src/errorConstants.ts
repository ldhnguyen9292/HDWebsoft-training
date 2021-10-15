export const errorName = {
    NOTFOUND: 'NOTFOUND',
    WRONGPASS: 'WRONGPASS',
    DUPLICATEUSERNAME: "DUPLICATEUSERNAME"
}

const errorType = {
    NOTFOUND: {
        message: "User not found",
        statusCode: 404
    },
    WRONGPASS: {
        message: "Wrong password",
        statusCode: 401
    },
    DUPLICATEUSERNAME: {
        message: "Duplicate username",
        statusCode: 409
    }
}

export const getErrorCode = errorName => {
    return errorType[errorName]
}