

/*
 * Facebook OAuth 2.0 guides:
 * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 * https://developers.facebook.com/apps/
 */

var CLIENT_ID = '';
var CLIENT_SECRET = '';

 /* Authorizes and makes a request to the Facebook API.
 */
function run() {
  var service = getService();
  if (service.hasAccess()) {

    var url = 'https://graph.facebook.com/v2.6/me/accounts?';

    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result , null, 2));
  } else {
    var authorizationUrl = service.getAuthorizationUrl();

    Logger.log('Open the following URL and re-run the script: %s',authorizationUrl);
        


}}


 function example() {
var service = getService();
  if (service.hasAccess())
  
      var url = 'https://graph.facebook.com/v2.6/me/accounts?';   //tokens along with pages 

// var urls ='https://graph.facebook.com/v2.6/bitztrail?fields=access_token';  //specified page token 
 
 
  var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());
   Logger.log(JSON.stringify(result , null, 2));
 
  //Logger.log(JSON.stringify(result.data[0].access_token))




var datas = {
    "message" : "Me Testing",
    //"slug" : "me-testing",
   // "text_to_subscribe" : "true"
  };
  var payload = JSON.stringify(datas);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var url = "https://graph.facebook.com/v3.2/226889517738816/feed"
   + '?access_token=' + encodeURIComponent(result.data[0].access_token);
  var response = UrlFetchApp.fetch(url, options);
  Logger.log('successfully posted to facebook page',response);
  }








/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
  return HtmlService.createHtmlOutput('Token Reset Success')
}

/**
 * Configures the service.
 */
function getService() {
  return OAuth2.createService('Facebook')
    // Set the endpoint URLs.
    .setAuthorizationBaseUrl('https://www.facebook.com/dialog/oauth')
    .setTokenUrl('https://graph.facebook.com/v2.6/oauth/access_token')

    // Set the client ID and secret.
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    

    // Set the name of the callback function that should be invoked to complete
    // the OAuth flow.
    .setCallbackFunction('authCallback')
    
    
      //Set Scope
     .setScope('manage_pages,publish_pages,pages_show_list')
      
      
    
  // Set the property store where authorized tokens should be persisted.
    .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.<script>window.top.close()</script>');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab.<script>window.top.close()</script>');
  }
}

/**
 * Logs the redict URI to register.
 */
function logRedirectUri() {
  Logger.log(OAuth2.getRedirectUri());
}
