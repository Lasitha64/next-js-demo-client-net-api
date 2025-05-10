export const msalConfig = {
  auth: {
    clientId: "76179dbe-b022-4860-9852-a48e943de686", // From Azure App Registration
    authority:
      "https://login.microsoftonline.com/29af8e08-df7f-4141-9d44-1dcc55015100",
    redirectUri: "http://localhost:3000", // React dev server
  },
  cache: {
    cacheLocation: "localStorage", // Or "sessionStorage"
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "User.Read.All",
    "profile",
    "openid",
    "offline_access",
    "Mail.Read",
  ], // Same scope you requested in API
};
