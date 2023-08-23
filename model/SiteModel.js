const mongoose = require("mongoose");

const siteDailyData = new mongoose.Schema(
      {
            _id: String,
            siteName: String,
            apiToken: {
                  type: String,
                  ref: "adx_mediago_access_tokens"
            },
            site_id: Number,
            site: String,
            site_name: String,
            clicks: Number,
            impressions: Number,
            visible_impressions: Number,
            spent: Number,
            conversions_value: Number,
            roas: Number,
            ctr: Number,
            vctr: Number,
            cpm: Number,
            vcpm: Number,
            cpc: Number,
            cpa: Number,
            cpa_clicks: Number,
            cpa_views: Number,
            cpa_actions_num: Number,
            cpa_actions_num_from_clicks: Number,
            cpa_actions_num_from_views: Number,
            cpa_conversion_rate: Number,
            cpa_conversion_rate_clicks: Number,
            cpa_conversion_rate_views: Number,
            blocking_level: String,
            currency: String,
            createdAt: {
                  type: Date,
                  default: Date.now,
                  expires: "3d",
            },
      },
      { versionKey: false, strict: false },
);
module.exports = mongoose.model("adx_mediago_site_daily_data", siteDailyData);

