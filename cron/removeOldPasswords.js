const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const OldPasswords = require("../dataBase/OldPasswords");


dayjs.extend(utc)

module.exports = new CronJob(
    '* * */1 * * *',
    async function () {
        try {
            console.log('Start remove passwords')

            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPasswords.deleteMany({createdAt: {$lte: yearAgo}})

            console.log('End remove passwords')
        } catch (e) {
            console.error(e)
        }
    }
);