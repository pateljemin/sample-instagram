const { getVerificationToken, verifyToken } = require('../services/authService');
const { sendForgetPasswordEmail, sendVerificationEmail } = require('../services/emailService');
const { createUser, changeUserPassword } = require('../services/userService');
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Create a user.
 *
 * @param req : Http Request with user sign up data.
 * @param res : Http Response
 */
const signUp = async (req, res) => {
    const { email, password, firstName, lastName, birthDate, country, state, address, mobile } = req.body;

    if (!email || !password || !firstName || !lastName || !birthDate || !country || !state || !address) {
        return res.status(400).json({ message: 'Please provide all the required fields' });
    }

    const serviceStatus = await createUser({ email, password, firstName, lastName, birthDate, country, state, address, mobile });

    if (!serviceStatus.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (serviceStatus && serviceStatus.userExists) {
        return res.status(409).json({ message: 'Email is already exist' });
    }

    const { token, isSuccess } = await getVerificationToken(email);
    if (!isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }
    const link = `${process.env.BASE_URL}/verify-email?info=${token}&email=${email}`
    await sendVerificationEmail(email, link);

    res.status(200).json({ message: 'User created' });
};

/**
 * Forget password.
 *
 * @param req : Http Request with user email.
 * @param res : Http Response
 */
const forgetPassword = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Please provide email' });
    }

    const { token, isSuccess } = await getVerificationToken(email);
    if (!isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }
    const link = `${process.env.BASE_URL}/change-password/${token}`
    await sendForgetPasswordEmail(email, link);
    res.status(200).json({ message: 'Please follow instructions from your email' });
};

/**
 * Change password.
 *
 * @param req : Http Request with user email.
 * @param res : Http Response
 */
const changePassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: 'Please all the required info' });
    }

    const { isSuccess } = await changeUserPassword(token, password);
    if (!isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }
    res.status(200).json({ message: 'Password changeed successully!' });
};

// /**
//  * Send email verification email.
//  *
//  * @param req : Http Request with user email.
//  * @param res : Http Response
//  */
// const emailVerification = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ message: 'Please provide email' });
//     }

//     const { token, isSuccess } = await getVerificationToken(email);
//     if (!isSuccess) {
//         return res.status(500).json({ message: 'Something went wrong on server side' })
//     }
//     const link = `${process.env.BASE_URL}/verify-email?info=${token}&email=${email}`
//     await sendVerificationEmail(email, link);
//     res.status(200).json({ message: 'Please follow instructions from your email' });
// };

/**
 * Send email verification email.
 *
 * @param req : Http Request with user email.
 * @param res : Http Response
 */
const verifyEmail = async (req, res) => {
    const { email, info } = req.query;

    if (!email || !info) {
        return res.status(400).json({ message: 'Invalid URL' });
    }
    const decodedInfo = jwt.verify(info, JWT_SECRET);
    if (decodedInfo.userName !== email) {

    }
    const isSuccess = await verifyToken(email, info);
    if (!isSuccess) {
        return res.status(500).json({ message: 'Invalid URL' })
    }
    res.status(200).json({ message: 'Email verified successfully!' });
};


module.exports = {
    signUp,
    forgetPassword,
    changePassword,
    verifyEmail
}
