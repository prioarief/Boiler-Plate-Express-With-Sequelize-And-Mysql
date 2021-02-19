module.exports = (res, status, data, error, statusCode) => {
    const response = {
        status: status || false,
        data: data || '',
        error: error || '',
        statusCode: statusCode
    }

    return res.status(response.statusCode).json({
        success: response.status,
        statusCode: response.statusCode,
        data: response.data,
        error: response.error || ''
    })
}