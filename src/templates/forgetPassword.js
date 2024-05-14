const forgetPassword = (link) => {
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Change Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 150px;
      height: auto;
    }
    .message {
      margin-bottom: 20px;
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
    <div class="logo">
      <img src="https://yourwebsite.com/logo.png" alt="Sample Instagram">
    </div>
    <div class="message">
      <p>Hello,</p>
      <p>You have requested to change your password. To proceed, please click the button below:</p>
    </div>
    <div class="action">
      <a href="${link}" class="btn">Change Password</a>
    </div>
    <div class="note">
      <p>If you did not request this change, please ignore this email.</p>
      <p>Thank you,</p>
      <p>Sample Instagram</p>
    </div>
  </div>
</body>
</html>`}

module.exports = {
  forgetPassword
}
