const mongoose = require("mongoose");

const traffic = new mongoose.Schema(
	{
		_id: String,
		accessToken: {
			type: String,
			ref: "adx_mediago_access_tokens"
		},
		adDate: Number,
		campaign: String,
		apiUrl: String,
		trafficSource: String,
		status: String,
		jobCreationDateTime: String,
		jobExecutionDateTime: String,
		jobCompletionDateTime:String,
		createdAt: {
			type: Date,
			default: Date.now,
			expires: "3d",
		},
	},
	{ versionKey: false, strict: false, timestamps: true },
);
module.exports = mongoose.model("adx_traffic_queue_systems",traffic);
