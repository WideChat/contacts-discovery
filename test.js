const service = require('./service.js');
const provider = new service.provider();

// Server side
const globalContacts = [];
for (var i=0;i<10;i++)
	globalContacts.push('999999999'+i)
console.log('Global Contacts : '+globalContacts+'\n');

for (var i in globalContacts){
	let contact = globalContacts[i];
	provider.addContact(contact);
}
console.log('Provider: ');
console.log(provider);
console.log('\n');

// Client side
const myContacts = ['8888888888', '9999999991', '9999999993', '9999999999', '8888811111'];
const myWeakHashes = myContacts.map(provider.getWeakHash);

console.log('Local Contacts : '+myContacts);
console.log('Local Weak hashes : '+myWeakHashes);
console.log('\n');

const response = provider.queryContacts(myWeakHashes);
console.log('Response: '+response);
console.log('\n');

for (var i in myContacts){
	let contact = myContacts[i];
	if(response.indexOf(provider.getStrongHash(contact))>=0){
		console.log(contact +' has an account on RC.');
	}else{
		console.log(contact +' does not has an account on RC.');
	}
}
