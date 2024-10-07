function pathHander(req, res, next) {
    const { url, method } = req;
    const message = `${method} ${url} Not Found`;
    return res.status(404).json({ message });
}

export default pathHander;
