var axios = require('axios');

var express = require('express');
var app = express();
var fs = require("fs");

var config = {
    method: 'get',
    url: 'https://graph.microsoft.com/beta/security/attackSimulation/simulations',
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJlMGI1OTcyMC0xYTkxLTRlMzItYWE1Yi0xYjVjNTUxNDA5NjEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzdiNGNmZTctNDk0YS00NjkwLWJkYjctYzM2NWEyMGRkZmIzL3YyLjAiLCJpYXQiOjE2NTQxNjY5OTIsIm5iZiI6MTY1NDE2Njk5MiwiZXhwIjoxNjU0MTcwODkyLCJhaW8iOiJBVFFBeS84VEFBQUFtYUhHQzRlRWQyWHFYWlBLcnA0Nzk3ZWF2bU9Hc1BrYnZXY3QxU2grVGpTblA1TmI0RXgxMGlFRERKcGxTUzVIIiwibmFtZSI6Ik1pbWV0aWNfQkkiLCJvaWQiOiI5NzFkNTMxMC0yNGNlLTQ2ZDItODJmMC1lMDM5MTEyNjNkODYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJNaW1ldGljX0JJQHZzdGVjcy5vbm1pY3Jvc29mdC5jb20iLCJyaCI6IjAuQVVrQTU4LTBkMHBKa0VhOXQ4TmxvZzNmc3lDWHRlQ1JHakpPcWxzYlhGVVVDV0ZKQU44LiIsInN1YiI6IlFUYlgtT1g4LXJRejFpdXJ0VzlUVkY3a3NfVV9OQXJtRFljN05GWjhUOU0iLCJ0aWQiOiI3N2I0Y2ZlNy00OTRhLTQ2OTAtYmRiNy1jMzY1YTIwZGRmYjMiLCJ1dGkiOiJFMzEyZnRZS3owdUVTTGhFaURFYUFBIiwidmVyIjoiMi4wIn0.A4WgSpYwNfjQIoFRY2W0eO2_x3rpzvIao0jOY-bPe0BJcBVUj-0b2b0ZrdHMnjkDMmaosDesdLI3QTV3MQzsNFXUZZbdqcNojeI1iSXkVSaRT6069DYnximFT39YgoZprsir9LIXPNMq9Yh5Mepk8kwEERL4nouY_jUy-DidnLRPMbfUOvKEOxKHq9YpOkG9Mu3iMuU-acFhp8weNTMGGA302GJXonNoJbuBoH1zL9OobBFqPtYx2sqof459pACyUbhSulbq1WA61xkdTztz8hx7NW0EJNMpLbomWsXEd94mz-nRAJRUj3d60CQfezjB7glTF2GsTyhqMEGI4OoQ7A'
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
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://localhost:8081")
})