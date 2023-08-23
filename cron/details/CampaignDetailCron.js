let cron = require("node-cron");

const { syncCampaigns } = require("../../controller/CampaignController")

let scheduleCron = async() => {
	cron.schedule('1,10,20,30,40,50 * * * *', () => {
		console.log('campaign cron');
		syncCampaigns();
	});
}


module.exports = {
	scheduleCron
}