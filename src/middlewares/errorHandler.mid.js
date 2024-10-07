function errorHandler(error, req, res, next) {
    const { statusCode, message } = error;
    return res.status(statusCode || 500).json({ message: message || "Fatal Error" });
}

export default errorHandler;
