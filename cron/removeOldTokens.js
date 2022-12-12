 const {CronJob} = require('cron')
 const dayjs = require('dayjs')
 const utc = require('dayjs/plugin/utc')
 const OAuth = require("../dataBase/OAuth");
 const OldPasswords = require("../dataBase/OldPasswords");

 dayjs.extend(utc)

 module.exports = new CronJob(
     '* * */1 * * *',
     async function () {
         try {
             console.log('Start remove tokens')

             const monthAgo = dayjs().utc().subtract(1, 'month');

             await OldPasswords.deleteMany({createdAt: {$lte: monthAgo}})

             console.log('End remove tokens')
         } catch (e) {
             console.error(e)
         }
     }
 );

