function locals(req, res, next) {
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    return next();
}

export default locals;
