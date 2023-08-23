/*const { mongoDB } = require("./../config/mongo");
mongoDB();*/
const adx_mediago_access_tokens = require("./../model/accessToken");
const adx_traffic_queue_systems = require("./../model/queueSystem");
const adx_merge_queue_system = require("./../model/MergeQueueModel");
const adx_mediago_ad_accounts = require("./../model/adAccount");
const adx_mediago_ad_details = require("./../model/adsModel");
const adx_mediago_campaigns = require("./../model/CampaignModel");
const adx_mediago_daily_data = require("./../model/PerfomanceDailyDataModel");
const adx_mediago_hourly_data = require("./../model/PerfomanceHourlyDataModel");
const adx_mediago_site_daily_data = require("./../model/SiteModel");
const adx_mediago_site_details = require("./../model/siteDetailsModel");

module.exports = {
	adx_mediago_access_tokens,
	adx_mediago_ad_accounts,
	adx_mediago_campaigns,
	adx_mediago_ad_details,
	adx_mediago_daily_data,
	adx_mediago_site_daily_data,
	adx_mediago_site_details,
	adx_mediago_hourly_data,
	adx_traffic_queue_systems,
	adx_merge_queue_system
};
