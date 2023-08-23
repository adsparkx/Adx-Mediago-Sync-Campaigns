const mongoose = require("mongoose");

const mergeQueueDataSchema = new mongoose.Schema(
	{
		_id: String,
		trafficSource: String,
		adId: String,
		adDate: Number,
		adHour: Number,
		status: String,
		jobCreationDateTime: String,
		jobExecutionDateTime: String,
		jobCompletionDateTime: String,
		createdAt: {
			type: Date,
			default: Date.now,
			expires: "3d",
		},
	},
	{ versionKey: false, strict: false, timestamps: true },
);
module.exports = mongoose.model("adx_merge_queue_system", mergeQueueDataSchema);
