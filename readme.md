# Overview

Sample Single-Page Web App (SPA) for Okta OpenID Connect (OIDC) 
* Modified for OpenShift Deployment. *

## Sample Scenarios

### OpenID Connect with Custom UI

You can find the main javascript code in `/js/oidc-app.js` and html in `oidc.html`

This sample demonstrates the OpenID Connect implicit flow:

- Sign in with Password: Authenticates user with [name/password](http://developer.okta.com/docs/api/resources/authn.html#primary-authentication-with-public-application) and exchanges a [sessionToken](http://developer.okta.com/docs/api/resources/authn.html#session-token) for an `id_token` (JWT) using a hidden iframe
- Sign in with IdP: Authenticates user by [redirecting to an external Identity Provider (IdP)](http://developer.okta.com/docs/api/resources/social_authentication.html) such as Facebook in a popup window and returns an `id_token` (JWT) for the user via a hidden iframe
- Refresh Token: Uses the current session with Okta to obtain a new id_token (JWT) via a hidden iframe
- Request Protected Resource (API): Uses the `id_token` as an OAuth2 Bearer Access Token to request a protected resources from an API (you must first authenticate)

These scenarios are enabled by the `okta_post_message` custom `response_mode` for the [OpenID Connect Authentication Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) which uses [HTML5 Window Messaging] (https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and a hidden iframe to return the [id_token]  (http://openid.net/specs/openid-connect-core-1_0.html#AuthResponse) to the Single Page Web App (SPA) without refreshing or redirecting the page.

See [postMessageCallback](https://github.com/mcguinness/okta-oidc-sample/blob/master/js/OktaAuthRequireJquery.js#L1118) for implementation details of how the `okta_post_message` response_mode works

#### OpenID Connect with Okta Sign-In Widget

This sample demonstrates the OpenID Connect implicit flow with the Okta Sign-In Widget

You can find the main javascript code and html in `/js/widget-app.js` and html in `widget.html`

## Prerequisites

1. Create A Github account.
2. Clone this Github repository to a local working directory
3. Create a OpenShift account and deploy the cloned version of this repo.
4. In the development Environment Variables create the following:
	* ISSUER https://example.oktapreview.com
	* AUDIENCE ANRZhyDh8HBFN5abN6Rg

## Setup

> This document assumes you host this app on `http://localhost:8080/` however if you are using OpenShift then you will have a deployment specific URL.

1. Grant the app [CORS access](http://developer.okta.com/docs/api/getting_started/enabling_cors.html) in your Okta organization (e.g. `http://localhost:8080/`)

2. Create OpenID Connect Application in the Okta Admin UI

    1. Applications>Add Application
    2. Click the **"Create New App"** button
    3. Select **"Single Page App (SPA)"** as the Platform
    4. Select **"OpenID Connect"** and click the "Create" button
    5. Enter a name for the app such as "Sample OIDC App" and click **"Next"**
    6. Add the following redirect URIs and click **"Finish"**
        - "http://localhost:8080/"
        - "http://localhost:8080/oidc"
        - "http://localhost:8080/oidc.html"
        - "http://localhost:8080/widget.html"
    7. Copy the **"Client ID"** for your new application
    8. Navigate to the Groups tab for the new app and assign the everyone group

3. Update `/js/config.js` with your Okta organization URL and the **"Client ID"** you copied from your OIDC Application in step 7 (Note this is needed for all client side components)

    ```
    return {
      orgUrl: 'https://example.oktapreview.com',
      clientId: 'ANRZhyDh8HBFN5abN6Rg'
    };

If you are using OpenShift you can skip the next 4 steps which are only used for local deployment using NodeNS

4. Install npm packages with `npm install`

5. Start Web Server with `npm start`

6. Visit `http://localhost:8080/oidc.html` to launch the "OpenID Connect Sample App"

7. Visit `http://localhost:8080/widget.html` to launch the "Okta Sign-In Widget Sample App"

8. Depending on Deployment Update Package.json as follows "start": "node server.js --iss $ISSUER --aud $AUDIENCE"

## Social Authentication

The Okta Sign-In Widget also supports Social Authentication.  You need to first add a Social IdP via the Okta Admin UI and obtain the `id` for the IdP which is found in the **Authorize URL** such as https://example.okta.com/oauth2/v1/authorize?idp=**0oabzpziblMwBLLqO0g4**.

When initializing the the widget you then add the IdP as an additional param with the `id` and `type` (e.g. `FACEBOOK`, `GOOGLE`, or `LINKEDIN`) which controls the branding of the button

```
oktaSignIn.renderEl(
{
  idps: [
    {
      type: 'FACEBOOK',
      id: '0oa5kecjfwuF4HQ4w0h7'
    }
  ]
}
```
