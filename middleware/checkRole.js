const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission' });
    }
    next();
};

module.exports = checkRole;