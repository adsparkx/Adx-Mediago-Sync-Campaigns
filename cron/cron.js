let initializeCron = async () => {
	let CampaignDetailCron = require("./details/CampaignDetailCron");
	CampaignDetailCron.scheduleCron();

};

module.exports = {
	initializeCron,
};
