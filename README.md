# password-manager

A password manager written via node.js. This program uses node persist, crypto and yargs library. 
The password manager has two commands: create and get. The create command creates an account while the get
command fetches the stored account information.

Example usage:
Create:
From the command line typing node app.js create -a Facebook -u Dog -p 123 --mp MasterPassword
will create the following:
Account: Facebook
Username: Dog
Password: 123

create is the command to create an account. You will then need the following 4 flags, -a, -u, -p and --mp.
-a stands for the name of the Account. You will use this for the "get" command to retrieve your account information
-u stands for the username of the account.
-p stands for the password of the account
--mp stands for MasterPassword and you will need to provide the same MasterPassword 
(Important Note you will have to provide the same master password for each subsequent use after the first time)

Get:
After creating account information in order to retrieve it type the following into the command line
node app.js get -a Facebook --mp MasterPassword

-a stands for the name of the Account your are trying to fetch.
--mp stands for the MasterPassword


TODO List:
General cleaning up.
Publishing app to npm.
Provide a better readme.
