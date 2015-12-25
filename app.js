console.log('starting password manager');

var storage = require('node-persist');
var crypto = require('crypto-js');
var argv = require('yargs')
	.command('get','Get your username and password', function (yargs){
		yargs.options({
			account: {
				demand: true,
				alias: 'a',
				description: "The name of the account",
				type: 'string'
			},
			masterPassword:{
				demand:true,
				alias: 'mp',
				description: "Needed password to access",
				type: 'string'
			}
		}).help('help')
	})
	.command('create','create an account', function(yargs){
		yargs.options({
			account: {
				demand: true,
				alias: 'a',
				description: "The name of the account",
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: "Username of the account",
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: "Password of the account",
				type: 'string'
			},
			masterPassword:{
				demand:true,
				alias: 'mp',
				description: "Needed password to access",
				type: 'string'
			}
		})
	})
	.help('help')
	.argv;
storage.initSync();

var command = argv._[0];

function getAccounts(masterPassword) {
	// use getItemSync to fetch accounts
	// decrypt
	// return accounts array
	var accounts = storage.getItemSync('accounts');
	JSONaccount= [];
	if (typeof accounts !== 'undefined') {
	var bytes = crypto.AES.decrypt(accounts, masterPassword);
	var decrpytedAccounts = bytes.toString(crypto.enc.Utf8);
	var JSONaccount = JSON.parse(decrpytedAccounts);
	}
	
	return JSONaccount;
}

function saveAccounts(accounts, masterPassword) {
	// encrypt accounts
	// setItemSync
	//return accounts
	var message = JSON.stringify(accounts);
	var encryptedMessage = crypto.AES.encrypt(message, masterPassword);
	storage.setItemSync('accounts', encryptedMessage.toString());
	return accounts;

}

function createAccount (account, masterPassword) {
	// var accounts = storage.getItemSync('accounts')
	
	// if (typeof accounts === 'undefined') {
	// 	accounts = [];
	// }
	accounts=getAccounts(masterPassword);
	accounts.push(account);
	saveAccounts(accounts, masterPassword);
	
	return account;

}

function getAccount (accountName, masterPassword) {
	
	var accounts = getAccounts(masterPassword);
	var matchedAccount;
	
	 accounts.forEach(function(account){
		if (account.name === accountName) {
			matchedAccount = account;
	 	}
	 });

	return matchedAccount;

}



 // createAccount({
 // 	name: 'Digimon',
 // 	username: 'someemail@gmail.com',
 // 	password: 'Password123'
 // })

if (command === 'get') {
	try{
		var fetchedAccount = getAccount(argv.account, argv.masterPassword);
		if (typeof fetchedAccount === 'undefined'){
			console.log('Account not found');
		} else {
			console.log("Account found!");
			console.log(fetchedAccount);
		}

	} catch(e) {
		console.log("Unable to fetch account");
	}

	
} else if (command === 'create') {
	try {
		console.log("The following account was created:");
		createAccount({
			name: argv.account,
			username: argv.username,
			password: argv.password
		}, argv.masterPassword)
	
		console.log(argv.account);
	} catch(e) {
		console.log("Unable to create account");
	}
} else{console.log("Command is not valid")};

//  console.log(getAccount('Twitter'));

// var facebookAccount = getAccount('Facebook');
// console.log(facebookAccount);