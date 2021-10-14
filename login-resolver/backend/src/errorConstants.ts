export const errorName = {
    NOTFOUND: 'NOTFOUND',
    WRONGPASS: 'WRONGPASS'
}

const errorType = {
    NOTFOUND: {
        message: "User not found",
        statusCode: 404
    },
    WRONGPASS: {
        message: "Wrong password",
        statusCode: 401
    }
}

export const getErrorCode = errorName => {
    return errorType[errorName]
}