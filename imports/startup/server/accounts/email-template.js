import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const name = 'Lets'
const email = '<dev@alexandesigner.com.br>'
const from = `${name} ${email}`
const emailTemplates = Accounts.emailTemplates

emailTemplates.siteName = name
emailTemplates.from = from

// Reset Password
emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Reset Your Password`
  },
  text(user, url) {
    const userEmail = user.emails[0].address
    const urlWithoutHash = url.replace('#/', '')
    if (Meteor.isDevelopment) console.info(`Reset Password Link: ${urlWithoutHash}`)
    return `A password reset has been requested for the account related to this
    address (${userEmail}). To reset the password, visit the following link:
    \n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore
    this email. If you feel something is wrong, please contact our support team:
    ${email}.`
  },
}

// Verify Email
emailTemplates.verifyEmail = {
   subject() {
      return `[${name}] Reset Your Password`
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};
