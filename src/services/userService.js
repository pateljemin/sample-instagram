const { getEncyptedPassword } = require('./bcryptService');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (userInfo) => {
    try {
        const hasedPassword = await getEncyptedPassword(userInfo.password);
        await User.create({
            email: userInfo.email,
            password: hasedPassword,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            mobile: userInfo.mobile,
            birthDate: userInfo.birthDate,
            country: userInfo.country,
            state: userInfo.state,
            address: userInfo.address
        })
    } catch (e) {
        console.log(`[userService][createUser] Error occurred while creating user. ${e}`)
        if (e.toString().includes('SequelizeUniqueConstraintError')) {
            return { isSuccess: true, userExists: true }
        }
        return { isSuccess: false }
    }

    return { userExists: false, isSuccess: true };
}

const changeUserPassword = async (token, password) => {
    try {
        const hasedPassword = await getEncyptedPassword(password);
        const decodedToken = jwt.verify(token, JWT_SECRET);
        await User.update({ password: hasedPassword }, { where: { id: decodedToken.id } })
        return { isSuccess: true }
    } catch (e) {
        console.log(`[userService][changeUserPassword] Error occurred while changing password. ${e}`)
        return { isSuccess: false }
    }
}

module.exports = {
    createUser,
    changeUserPassword
}
