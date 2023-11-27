const crypto = require('crypto');

// Create a hash object using SHA-256 algorithm
const hash = crypto.createHash('sha256');
console.log(hash)
// Update the hash with data
hash.update('Hello, ');
console.log(hash)

hash.update('world!');
console.log(hash)

// Finalize the hash and get the resulting digest (hash value)
const hashValue = hash.digest('base64');

console.log('Hash value:', hashValue);