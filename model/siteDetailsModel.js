const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
	{
		_id: String,
		siteId:String,
		siteName:String,
		apiToken:{
			type:String,
			ref:"adx_mediago_access_tokens"
		},
		campaignName:String,
		campaignId:String,
	},
	{ versionKey: false, strict: false },
);
module.exports = mongoose.model("adx_mediago_site_details", siteSchema);