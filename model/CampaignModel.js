const mongoose = require("mongoose");
const campaignSchema = new mongoose.Schema(
   {
      _id: String,
      accountId: {
         type:String,
         ref:"adx_mediago_ad_accounts"
      },
      campaignName: String,
      ad: [{
         asset_name: String,
         headline: String,
         img: String,
         _id: false
      }],
      audience: {
         type: { type: String },
         value: [String]
      },
      brand_name: String,
      apiToken:{
         type:String,
         ref:"adx_mediago_access_tokens"
      },
      browser: String,
      charge_type: String,
      cpc: String,
      daily_cap: String,
      end_time: String,
      gross_cpc: String,
      ip_targeting: String,
      landing_page: String,
      language: String,
      location: [{
         country: String,
         type: { type: String },
         value: [String],
         _id: false
      }],
      objective: String,
      optimization_type: String,
      os: {
         type: { type: String },
         value: [String],
      },
      platform: {
         type: { type: String },
         value: [String],
      },
      product_type: [String],
      site_bid_modiefier: [{
         site_id: String,
         rate: Number,
         site_name: String,
         site_cpc: Number,
         _id: false
      }],
      spend_limit: Number,
      spend_mode: Number,
      spend_renew: String,
      status: String,
      start_time: String,
      target_cpa: Number,
      utm_tracking: String,
   },
   { versionKey: false, strict: false },
);
module.exports = mongoose.model("adx_mediago_campaigns", campaignSchema);