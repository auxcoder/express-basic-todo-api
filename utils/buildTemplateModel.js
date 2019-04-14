const constants = require('../config/constants');
//
function buildTemplateModel(user, client) {
  return {
    product_name: 'Evenement',
    name: user.username,
    username: user.email,
    product_url: client.host,
    action_url: `${client.host}${client.action_url}/${user.verification_token}`,
    login_url: `${client.host}${client.login_url}`,
    support_email: constants.supportEmail,
    sender_name: 'Support Team',
    help_url: `${client.host}${client.help_url}/help`,
    company_name: constants.companyName,
    company_address: constants.companyAddress,
  };
}
// module
module.exports = buildTemplateModel;
