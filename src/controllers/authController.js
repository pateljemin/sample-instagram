const { checkUserLogin } = require('../services/authService');
/**
 * User login controller.
 *
 * @param req : Http Request with username and password data.
 * @param res : Http Response
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const loggedInfo = await checkUserLogin(email, password);

    if (!loggedInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (!loggedInfo.isMatched) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    res.status(200).json({ token: loggedInfo.token });
};

/**
 * User logout controller.
 *
 * @param req : Http Request
 * @param res : Http Response
 */
const logout = async (req, res) => {
    res.status(200).json({ message: 'Logged out' });
}

module.exports = {
    login,
    logout
}
