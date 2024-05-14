const { comparePassword } = require('./bcryptService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models/index");

const checkUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { isMatched: false, isSuccess: true };
        }
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return { isMatched: false, isSuccess: true };
        }
        const token = jwt.sign({ id: user.id, userName: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return { token, isMatched: true, isSuccess: true };
    } catch (e) {
        console.log(`[authService][checkUserLogin] Error occurred while matchng user password. username: ${email} ${e}`)
        return { isSuccess: false };
    }
}

const getVerificationToken = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { isMatched: false, isSuccess: true };
        }
        const token = jwt.sign({ id: user.id, userName: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return { token, isMatched: true, isSuccess: true };
    } catch (e) {
        console.log(`[authService][getChangePasswordToken] Error occurred while generating forget password. username: ${email} ${e}`)
        return { isSuccess: false };
    }
}

const verifyToken = async (email, token) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { isMatched: false, isSuccess: true };
        }
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return decodedToken.userName === user.email && decodedToken.id === user.id;
    } catch (e) {
        console.log(`[authService][getChangePasswordToken] Error occurred while generating forget password. username: ${email} ${e}`)
        return { isSuccess: false };
    }
}


module.exports = {
    checkUserLogin,
    getVerificationToken,
    verifyToken
}
