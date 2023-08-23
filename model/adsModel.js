const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
	{
		_id: String,
		campaignId: String,
		apiToken:{
			type:String,
			ref:"adx_mediago_access_tokens"
		},
		status: String,
	},
	{ versionKey: false, strict: false },
);
module.exports = mongoose.model("adx_mediago_ad_details", adsSchema);