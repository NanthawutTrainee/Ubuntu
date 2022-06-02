var axios = require('axios');
var msal = require("@azure/msal-node");
const { promises: fs } = require("fs");
var express = require('express');
var app = express();
var xToken='';
/**
 * Cache Plugin configuration
 */
 var config = {
    method: 'get',
    url: 'https://graph.microsoft.com/beta/security/attackSimulation/simulations',
    headers: {
        'Authorization': 'Bearer '+xToken
    }
};

app.get('/', function (req, res) {

    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    

})
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    tokenCalls();
    console.log("Example app listening at http://%s:%s", host, port)
})
const cachePath = "cache.json"; // Replace this string with the path to your valid cache file.

const beforeCacheAccess = async (cacheContext) => {
    try {
        const cacheFile = await fs.readFile(cachePath, "utf-8");
        cacheContext.tokenCache.deserialize(cacheFile);
    } catch (error) {
        // if cache file doesn't exists, create it
        cacheContext.tokenCache.deserialize(await fs.writeFile(cachePath, ""));
    }
};

const afterCacheAccess = async (cacheContext) => {
    if (cacheContext.cacheHasChanged) {
        try {
            await fs.writeFile(cachePath, cacheContext.tokenCache.serialize());
        } catch (error) {
            console.log(error);
        }
    }
};

const cachePlugin = {
    beforeCacheAccess,
    afterCacheAccess
};

const msalConfig = {
    auth: {
        clientId: "e0b59720-1a91-4e32-aa5b-1b5c55140961",
        authority: "https://login.microsoftonline.com/77b4cfe7-494a-4690-bdb7-c365a20ddfb3",
    },
    cache: {
        cachePlugin
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const pca = new msal.PublicClientApplication(msalConfig);
const msalTokenCache = pca.getTokenCache();

const tokenCalls = async () => {

    async function getAccounts() {
        return await msalTokenCache.getAllAccounts();
    };

    accounts = await getAccounts();

    // Acquire Token Silently if an account is present
    if (accounts.length > 0) {
        const silentRequest = {
            account: accounts[0], // Index must match the account that is trying to acquire token silently
            scopes: ["User.read"],
        };

        pca.acquireTokenSilent(silentRequest).then((response) => {
            xToken=response.idToken;
            //console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    } else { // fall back to username password if there is no account
        const usernamePasswordRequest = {
            scopes: ["User.read","SecurityActions.Read.All" ,"SecurityActions.ReadWrite.All" ],
            username: "Mimetic_BI@vstecs.onmicrosoft.com", // Add your username here
            password: "P@ssw0rd2022", // Add your password here
        };

        pca.acquireTokenByUsernamePassword(usernamePasswordRequest).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }
}




 
console.log(xToken)
