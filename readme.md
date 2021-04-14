Accounts you need to have. -- 

1. Paypal account -> You need it to make the payments and use the sandbox API keys and accounts.
2. Verified email account if you want to use the forgot password and receive the email verification.
3. Mailgun account -> You need this to have your own API keys. If you don't verify a certain account to send the emails it will not work. This is necessary for the forgot password.

JWT -- 

1. You need to pass your own "JWT_SECRET" key. Necessary to have a token and access each page.
2. You need to pass your own "RESET_PASSWORD_KEY". Necessary to have a token and receive the email to reset your password.
3. You need to pass your own "JWT_ACC_ACTIVATE". Necessary to have a token and receive the email to activate your email.


Database Credentials

HOST = ra1.anystream.eu
USER = root
PASSWORD = Maria1058@
DATABASE = foundain_express
PORT = 1058


Make sure you are inside "group_project" folder.

To run the app, just type "npm start" OR "nodemon npm start".


