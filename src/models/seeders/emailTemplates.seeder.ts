import 'module-alias/register'; // Import at the top
import connectUserDB from '@config/db';
import { logger } from '@config/logger';
import { emailTemplatesVariables } from '@constants';
import { EmailTemplate } from '@models';

//run this command to seed:  node dist/models/seeders/emailTemplates.seeder

/**
 * Seeds email templates into the MongoDB database.
 *
 * @function seedEmailTemplates
 * @async
 *
 * @returns {Promise<void>}
 */
const seedEmailTemplates = async () => {
  try {
    await connectUserDB();

    await EmailTemplate.deleteMany({});
    await EmailTemplate.insertMany(emailTemplatesVariables.emailTemplates);

    logger.info('Email templates seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Error seeding email templates: ${error}`);
    process.exit(1);
  }
};

seedEmailTemplates();
