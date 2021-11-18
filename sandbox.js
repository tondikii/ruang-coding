const bcrypt = require("bcryptjs");
const pw = "admin123";
console.log(pw);
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pw, salt);
console.log(hash);
// instance.password = hash;
