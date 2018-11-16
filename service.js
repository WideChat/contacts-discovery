const crypto = require('crypto');

class ContactsProvider {

	constructor() {
		this.contactsWeakHashMap = {}
	}

	addContact(contact) {
		var weakHash = this.getWeakHash(contact);
		var strongHash = this.getStrongHash(contact);
		
		if (weakHash in this.contactsWeakHashMap){
			if(this.contactsWeakHashMap[weakHash].indexOf(strongHash)==-1){
				this.contactsWeakHashMap[weakHash].push(strongHash);
			}
		}else{
			this.contactsWeakHashMap[weakHash] = [strongHash];
		}
	}

	removeContact(contact) {
		var weakHash = this.getWeakHash(contact);
                var strongHash = this.getStrongHash(contact);
		
		if (weakHash in this.contactsWeakHashMap && this.contactsWeakHashMap[weakHash].indexOf(strongHash)>=0){
			this.contactsWeakHashMap[weakHash].splice(this.contactsWeakHashMap[weakHash].indexOf(strongHash), 1);

			if (!this.contactsWeakHashMap[weakHash].length)
				delete this.contactsWeakHashMap[weakHash]
		}
	}

	getWeakHash(contact){
		return crypto.createHash('sha1').update(contact).digest('hex').substr(3,6);
	}

	getStrongHash(contact){
		return crypto.createHash('sha1').update(contact).digest('hex');
	}

	queryContacts(contactWeakHashList){
		var result = [];
		for (var i in contactWeakHashList){
			let weakHash = contactWeakHashList[i];
			if (weakHash in this.contactsWeakHashMap){
				result = result.concat(this.contactsWeakHashMap[weakHash]);
			}
		}
		return result
	}
}

module.exports = {
	'provider': ContactsProvider
}
