function locals(req, res, next) {
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    res.locals.user_id = req.session.user_id || "";
    return next();
}

export default locals;
