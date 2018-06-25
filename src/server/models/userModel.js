const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
})
userSchema.methods.validPassword = function(pwd) {
  const data = this.toJSON()
  return data.password === pwd
}
module.exports = mongoose.model('users', userSchema)
