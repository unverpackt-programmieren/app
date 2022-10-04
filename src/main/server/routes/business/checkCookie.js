const jwt = require('jsonwebtoken');
module.exports = (cookieValue, serverSecret) => {
    return (req, res, next) => {
        if (req.cookies.token !== undefined) {
            try {
                const data = jwt.verify(req.cookies.token, serverSecret);
                req.customer =data.customer;
                next();
            } catch (e) {
                res.clearCookie('token');
                res.sendStatus(403);
            }

        } else {
            next();
        }
    }
}