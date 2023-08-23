const mongoose = require("mongoose");

const accessToken = new mongoose.Schema(
	{
		_id: String,
		access_token:String,
		access_token_status: String,
		business_manager_id: String,
		business_manager_name: String,
		apiToken:String,
		expirationTimestamp:String,
	},
	{ versionKey: false,strict: false },
);
module.exports = mongoose.model("adx_mediago_access_tokens",accessToken);

