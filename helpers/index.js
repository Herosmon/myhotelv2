const mailer= require('./helper.mailer')
const notification = require('./helper.notification');
const JWT= require('./helper.generar-jwt');
const firstUpper= require('./helper.FirstToUppercase')
const dbValidations= require('./helper.db-validators')

module.exports={
...mailer,
...notification,
...JWT,
...firstUpper,
...dbValidations
}