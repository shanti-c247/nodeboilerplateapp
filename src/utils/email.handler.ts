import env from '@config/envVar';
import { logger } from '@config/logger';
import { commonVariables, emailTemplatesVariables, twoFAVariables } from '@constants';
import type { IEmailData, IEmailTemplate, ITemplateData } from '@customTypes';
import { EmailTemplate } from '@models';
import nodemailer from 'nodemailer';

/**
 * Create a transporter object using your SMTP provider details
 */
const transporter = nodemailer.createTransport({
  service: env.SMTP_MAIL_SERVICE,
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: Boolean(env.SMTP_IS_SECURE),
  auth: {
    user: env.SMTP_SENDER_EMAIL,
    pass: env.SMTP_SENDER_PASSWORD,
  },
});

/**
 * Sends an email using the configured SMTP transporter.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The HTML message to be sent in the email body.
 * @returns {Promise<{ success: boolean, data?: object, error?: any }>}
 *          An object indicating success status, with additional data or error information.
 */

export const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const info = await transporter.sendMail({
      from: env.SMTP_SENDER_EMAIL,
      to: email,
      subject,
      html: message,
    });

    return { success: true, data: info };
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    return { success: false, error };
  }
};

/**
 * Processes an email template by replacing placeholders with corresponding data values.
 *
 * @param {string} template - The template string containing placeholders in the format {key}.
 * @param {ITemplateData} data - An object containing key-value pairs for replacing placeholders.
 * @returns {string} The processed template with placeholders replaced by actual data values.
 */

const processTemplate = (template: string, data: ITemplateData): string => {
  return template.replace(/{([^}]+)}/g, (_, key) => String(data[key]) ?? `{${key}}`);
};

/**
 * Retrieves an email template by its slug if it is active.
 *
 * @param {string} slug - The unique identifier for the email template.
 * @returns {Promise<IEmailTemplate | null>} - A promise that resolves to the email template object if found and active, or null if not found or an error occurs.
 */

export const getEmailTemplate = async (slug: string): Promise<IEmailTemplate | null> => {
  try {
    const template = await EmailTemplate.findOne({ slug, isActive: true, isDeleted: false });
    return template;
  } catch (error) {
    logger.error(`Error fetching email template: ${error}`);
    return null;
  }
};

/**
 * Sends an email using a template slug and replacing placeholders with actual data values.
 * Currently supported templates are:
 * - forgot-password
 * - reset-password
 * - verify-email
 * - verify-otp
 *
 * @param {IEmailData} data - An object containing the email recipient, name, template slug, and additional data to replace placeholders.
 * @returns {Promise<boolean>} - A promise that resolves to true if the email is sent successfully, or false if an error occurs.
 */
export const sendEmailBySlug = async ({ toEmail, toName, templateName, data }: IEmailData): Promise<boolean> => {
  try {
    const template = await getEmailTemplate(templateName);
    if (!template) {
      throw new Error(`Email template not found for slug: ${templateName}`);
    }
    let templateData: ITemplateData;
    const link = `${commonVariables.FRONTEND_APP_URL}?token=${data?.token}`;

    switch (templateName) {
      case emailTemplatesVariables.emailTemplates[0].slug: {
        templateData = {
          name: toName,
          link,
          expire: emailTemplatesVariables.RESET_TOKEN_EXPIRE, // Example default value
          unit: emailTemplatesVariables.RESET_TOKEN_UNIT, // Example default value
          plural: emailTemplatesVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
        };
        break;
      }
      case emailTemplatesVariables.emailTemplates[1].slug: {
        templateData = {
          name: toName,
          link,
          expire: emailTemplatesVariables.RESET_TOKEN_EXPIRE, // Example default value
          unit: emailTemplatesVariables.RESET_TOKEN_UNIT, // Example default value
          plural: emailTemplatesVariables.RESET_TOKEN_EXPIRE > 1 ? 's' : '',
        };
        break;
      }
      case emailTemplatesVariables.emailTemplates[2].slug: {
        templateData = {
          name: toName,
          link,
        };

        break;
      }
      case emailTemplatesVariables.emailTemplates[3].slug: {
        templateData = {
          otp: data?.otp,
          otpValidTime: twoFAVariables.OTP_VALID_TIME,
        };
        break;
      }
      default:
        throw new Error(`Unhandled email template slug: ${templateName}`);
    }

    const emailContent = processTemplate(template.template, templateData);
    const emailResult = await sendEmail(toEmail, template.subject, emailContent);

    return emailResult.success;
  } catch (error) {
    logger.error(`Error sending email by slug: ${error}`);
    return false;
  }
};
