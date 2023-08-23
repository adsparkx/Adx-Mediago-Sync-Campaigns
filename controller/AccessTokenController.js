require("dotenv").config();
const axios = require("axios");
const qs = require("qs");
const {
  adx_mediago_access_tokens,
} = require("../config/models")

let saveAccessToken = async (getTokenResponse, apiToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getAccessToken = await adx_mediago_access_tokens.findOne({ _id: apiToken }).lean()
      let accessTokenItem = getAccessToken;
      accessTokenItem.accessToken = getTokenResponse.access_token
      let currentTime = new Date().getTime();
      currentTime = currentTime + 3599000;
      accessTokenItem.expirationTimestamp = currentTime.toString()
      let a = await adx_mediago_access_tokens.updateOne({ _id: accessTokenItem._id }, accessTokenItem, { upsert: true })
      // console.log(a,"a");
      resolve("OK");
    } catch (e) {
      console.log(e);
      reject(e.message);
    }
  });
};

let getAccessToken = async (apiToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getAccessToken = await adx_mediago_access_tokens.findOne({ _id: apiToken }).lean()
      // console.log(getAccessToken,"getAccessToken");
      let expirationTime = parseInt(getAccessToken.expirationTimestamp);
      let currentTime = new Date().getTime();
      if (currentTime < expirationTime) {
        resolve(getAccessToken.accessToken);
      } else {
        let getTokenApiUrl = process.env.mediagoTokenApiUrl + "authentication";

        const base64ApiToken = Buffer.from(`${apiToken}`).toString('base64');
        console.log(getTokenApiUrl);

        let getTokenResponse = await axios({
          method: "post",
          url: getTokenApiUrl,
          headers: {
            "Authorization": `Basic ${base64ApiToken}`,
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        });
        getTokenResponse = getTokenResponse.data
        await saveAccessToken(getTokenResponse, apiToken);
        //  console.log(getTokenResponse.access_token,"accessToken");
        resolve(getTokenResponse.access_token);
      }
    } catch (e) {
      console.log(e);
      resolve(e.message);
    }
  });
};

let refreshAllTokens = async (responseType = "object") => {
  return new Promise(async (resolve, reject) => {
    try {
      let refreshTokens = await adx_mediago_access_tokens.find({ access_token_status: "Active" }).lean()
      responseType == "array" ? (responseAccessTokens = []) : (responseAccessTokens = {});
      await Promise.all(
        refreshTokens.map(async (refreshToken) => {
          if (responseType == "array") {
            let tempObject = {};
            tempObject.apiToken = refreshToken.apiToken;
            tempObject.accessToken = await getAccessToken(refreshToken.apiToken);
            // console.log(util.inspect(tempObject.accessToken, false, null, true));
            responseAccessTokens.push(tempObject);
            console.log(tempObject, "tempObject");
          } else {
            responseAccessTokens[refreshToken._id] = await getAccessToken(refreshToken.apiToken);
            //  console.log(util.inspect(responseAccessTokens[refreshToken.id], false, null, true));
          }
        }),
      );
      resolve(responseAccessTokens);
    } catch (e) {
      console.log(e);
      resolve(e.message);
    }
  });
};
module.exports = { refreshAllTokens }