const mongoose = require("mongoose");

const adAccount = new mongoose.Schema(
	{
		_id: String,
		accountId :String,
		accountName:String,
		apiToken:String,
	},
	{ versionKey: false, strict:false },
);
module.exports = mongoose.model("adx_mediago_ad_accounts", adAccount);