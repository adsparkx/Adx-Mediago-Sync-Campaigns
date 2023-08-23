const mongoose = require("mongoose");

const perfomanceDailyDataSchema = new mongoose.Schema(
	{
		_id: String,
		addName: String,
		description: String,
		thumbnail_url: String,
		url: String,
		campaignId: String,
		campaignName: String,
		apiToken:{
			type:String,
			ref:"adx_mediago_access_tokens"
		 },
		content_provider: String,
		content_provider_name: String,
		impressions: Number,
		visible_impressions: Number,
		ctr: Number,
		vctr: Number,
		clicks: Number,
		cpc: Number,
		cvr: Number,
		cvr_clicks: Number,
		cvr_views: Number,
		cpa: Number,
		cpa_clicks: Number,
		cpa_views: Number,
		actions: Number,
		actions_num_from_clicks: Number,
		actions_num_from_views: Number,
		cpm: Number,
		vcpm: Number,
		spent: Number,
		conversions_value: Number,
		roas: Number,
		currency: String,
		create_time: String,
		learning_display_status: String
	},
	{ versionKey: false, strict: false},
);
module.exports = mongoose.model("adx_mediago_daily_data", perfomanceDailyDataSchema);

