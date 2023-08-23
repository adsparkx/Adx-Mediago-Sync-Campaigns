require("dotenv").config();
const axios = require("axios");
let { refreshAllTokens } = require('./../controller/AccessTokenController');
const {
  adx_mediago_ad_accounts,
  adx_mediago_campaigns,
} = require("../config/models")
let saveCampaigns = async (apiResponse, adAccount,accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (apiResponse) {
        let bulkCampaignData = [];
        //processing in chunks to avoid QPS error
        for (let i = 0; i < apiResponse.length; i += 5) {
          let campaignInChunk = apiResponse.slice(i, i + 5);
          await Promise.all(
            campaignInChunk.map(async (campaign) => {
              let apiConfig = {
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              };
              let getCampaignApiUrl = process.env.mediagoApiUrl + `campaign/detail?campaign_ids=${campaign.campaign_id}`;
              let apiResponse = await axios.get(getCampaignApiUrl, apiConfig);
              let campaignResponse = apiResponse.data[0]
              let item = {};
              item._id = campaignResponse.campaign_id
              item.accountId = campaignResponse.account_id
              item.audience = campaignResponse.audience;
              item.ad = campaignResponse.ad;
              item.name = campaignResponse.campaign_name ?? "null";
              item.brand_name = campaignResponse.brand_name ?? "null";
              item.cpc = campaignResponse.cpc ?? null;
              item.daily_cap = campaignResponse.daily_cap ?? null;
              item.day_parting = campaignResponse.day_parting;
              item.end_time = campaignResponse.end_time ?? "null";
              item.gross_cpc = campaignResponse.gross_cpc ?? "null";
              item.ip_targeting = campaignResponse.ip_targeting ?? "null";
              item.landing_page = campaignResponse.landing_page ?? "null";
              item.language = campaignResponse.language ?? "null";
              item.location = campaignResponse.location ?? "null";
              item.objective = campaignResponse.objective ?? "null";
              item.optimization_type = campaignResponse.optimization_type ?? "null";
              item.os = campaignResponse.os ?? "null";
              item.platform = campaignResponse.platform ?? "null";
              item.product_type = campaignResponse.product_type ?? "null";
              item.site_bid_modiefier = campaignResponse.site_bid_modiefier ?? "null";
              item.spend_limit = campaignResponse.spend_limit ?? null;
              item.spend_mode = campaignResponse.spend_mode ?? null;
              item.spend_renew = campaignResponse.spend_renew ?? "null";
              item.start_time = campaignResponse.start_time ?? "null";
              item.status = +campaignResponse.status ? "ACTIVE" : "DISABLE";
              item.target_cpa = campaignResponse.target_cpa ?? null;
              item.utm_tracking = campaignResponse.utm_tracking ?? "null";
              item.apiToken = adAccount.apiToken ?? "null";
              bulkCampaignData.push(
                {
                  updateOne: {
                    filter: { _id: item._id },
                    update: item,
                    upsert: true
                  }
                }
              )
            })
            // }
          );
        }
        await adx_mediago_campaigns.bulkWrite(bulkCampaignData);
        resolve("OK");
      } else {
        resolve("OK");
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.error);
        console.log(e.response.status);
        console.log(e.response.statusText);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("error ", e.message);
      }
    }
  });
};

let syncCampaigns = async () => {
  try {
    let adAccounts = [];
    adAccounts = await adx_mediago_ad_accounts.find().lean()
    let accessTokens = await refreshAllTokens();
    await Promise.all(
      adAccounts.map(async (adAccount) => {
        try {
          let accessToken = accessTokens[adAccount.apiToken];
          let apiConfig = {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/x-www-form-urlencoded",  
            },
          };
          let getCampaignApiUrl = process.env.mediagoApiUrl+"campaign";
          let apiResponse = await axios.get(getCampaignApiUrl, apiConfig);
          await saveCampaigns(apiResponse.data, adAccount,accessToken);
        } catch (e) {
          if (e.response) {
            console.log(e.response.data.error);
            console.log(e.response.status);
            console.log(e.response.statusText);
          } else if (e.request) {
            console.log(e.request);
          } else {
            console.log("error ", e.message);
          }
        }
      })
    );
  } catch (e) {
    if (e.response) {
      console.log(e.response.data.error);
      console.log(e.response.status);
      console.log(e.response.statusText);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("error ", e.message);
    }
  }
};
syncCampaigns()
// module.export = {syncCampaigns}