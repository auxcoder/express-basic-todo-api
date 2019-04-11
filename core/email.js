const postmark = require('postmark');
const constants = require('../config/constants');
let env = process.env.NODE_ENV || 'development';
const client = new postmark.Client(constants.postmarkId);
//
async function mock() {}
const emailRepository = {
  /**
   * https://postmarkapp.com/developer/api/email-api
   * https://postmarkapp.com/developer/api/overview
   */
  successSchema: function() {
    return {
      To: null, // <email@domain>
      SubmittedAt: null, // <timestampz>
      MessageID: null, // <uuid>
      ErrorCode: 0, //
      Message: 'OK', //
    };
  },

  /**
   * Send an email using a template aliase name and passing a data object
   * @param {String} from
   * @param {String} to
   * @param {Object} [templateModel={}]
   * @returns A promise that's resolved with the sent email
   */
  sendWelcome: async function sendWelcome(from, to, templateModel = {}) {
    if (env === 'test') return await mock();
    return await client.sendEmailWithTemplate({
      From: from,
      To: to,
      TemplateAlias: 'welcome',
      TemplateModel: templateModel,
    });
  },

  /**
   * Send an email using a template aliase name and a collection of attachments
   * @param {String} from
   * @param {String} to
   * @param {String} subject
   * @param {Array} [attachments=[]]
   * @param {String} [templateId=null]
   * @param {Object} [template={}]
   * @returns A promise that's resolved with the sent email with
   */
  sendWithAttachments: async function sendWithAttachments(
    from,
    to,
    subject,
    attachments = [],
    templateId = null,
    template = {}
  ) {
    if (env === 'test') return await mock();
    const email = {
      From: from,
      To: to,
      Subject: subject,
      Attachments: attachments,
      TemplateId: templateId,
      TemplateModel: template,
    };
    if (!email.TemplateId) delete email.TemplateModel;
    return await client.sendEmail(email);
  },
};
// module
module.exports = emailRepository;
