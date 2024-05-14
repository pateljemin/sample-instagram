const emailVerification = (link) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            /* Add your CSS styles here */
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Verify Your Email Address</h2>
            <p>Dear [User],</p>
            <p>Thank you for registering with Sample Instagram! To ensure that you have provided a valid email address and to activate your account, please verify your email address by clicking on the button below:</p>
            <p><a href="${link}" class="btn">Verify Email Address</a></p>
            <p>If you are unable to click on the button, please copy and paste the following URL into your browser's address bar:</p>
            <p>${link}</p>
            <p>Once you have verified your email address, you will be able to access all the features of our platform.</p>
            <p>If you did not sign up for an account with Sample Instagram, please disregard this email.</p>
            <p>Thank you,<br>The Sample Instagram Team</p>
        </div>
    </body>
    </html>
    `
}

module.exports = {
    emailVerification
}
