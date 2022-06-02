var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://graph.microsoft.com/beta/security/attackSimulation/simulations',
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IjFfeE1uOVZxUFpVVDlOR1RyNTdpbHpGN2d6MTkzUjFpWkQ2YWJoVVVsNmciLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83N2I0Y2ZlNy00OTRhLTQ2OTAtYmRiNy1jMzY1YTIwZGRmYjMvIiwiaWF0IjoxNjUzMDM4NDcwLCJuYmYiOjE2NTMwMzg0NzAsImV4cCI6MTY1MzA0Mjc4MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZS2pnWmRPYmV5V2wwa1hId3VIUTByWlB5MzJYV05yOS8vdmdUMHU3bDAxTzQzd0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJnaXZlbl9uYW1lIjoiR2F0ZXdheV9CSSIsImlkdHlwIjoidXNlciIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiNTguMTM3LjgwLjEzMCIsIm5hbWUiOiJHYXRld2F5X0JJIiwib2lkIjoiZGI5NWU0ODctZDA2OC00MGE2LWJmZjMtY2QzNGUxOTFlOTNhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTEwNzgwODE1MzMtMTM0MzAyNDA5MS0xMjAyNjYwNjI5LTUxMjYyIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxMjY0RjYyOTQiLCJyaCI6IjAuQVVrQTU4LTBkMHBKa0VhOXQ4TmxvZzNmc3dNQUFBQUFBQUFBd0FBQUFBQUFBQUJKQU9nLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ29udGFjdHMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgTWFpbC5SZWFkV3JpdGUgTm90ZXMuUmVhZFdyaXRlLkFsbCBvcGVuaWQgUGVvcGxlLlJlYWQgcHJvZmlsZSBTZWN1cml0eUV2ZW50cy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFRhc2tzLlJlYWRXcml0ZSBVc2VyLlJlYWQgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic3ViIjoiZDhqaEUwRENTX01kTVhNenBjR3czT01yWkNhcnpKUGtGNlo1OFFocmhwTSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6Ijc3YjRjZmU3LTQ5NGEtNDY5MC1iZGI3LWMzNjVhMjBkZGZiMyIsInVuaXF1ZV9uYW1lIjoiR2F0ZXdheV9CSUB2c3RlY3MuY28udGgiLCJ1cG4iOiJHYXRld2F5X0JJQHZzdGVjcy5jby50aCIsInV0aSI6Inhpa3VNZW5yV0VhbDJ5TWZYRFl2QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjljNmRmMGYyLTFlN2MtNGRjMy1iMTk1LTY2ZGZiZDI0YWE4ZiIsImM0MzBiMzk2LWU2OTMtNDZjYy05NmYzLWRiMDFiZjhiYjYyYSIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiNEhSUmxvUVo5dWYzSjFyamtrMUNIQTI0cC12SU5RNDRIcWJsbnVPd3dlSSJ9LCJ4bXNfdGNkdCI6MTQ3OTM4NDAwNX0.Q-B1mVnSAO45vipSnDS2gJXQNtctCn5k_bSLcTnBRE1lk0V04UOCpOnBLklr_zBApXtBDWfwfttqUKSA6C-JXZIUMHaPqbFHDjRv32nCSkXz1NdV07hg526M54qqOdC5iUrdi2OlLo0vUqNaLjrek7ZIXCQE9Re2Urh45KlY_JpQnxc5sXuS1QovD55ZEQSJyJYjs5ErRqHdq8O4n-4vtVqfEWi9q3QRnYEBEXV6uD8kkGDgXq_Agvx_gLQxyPkG-1No_VSqZwxXcG6sgnmVOaumwdw9f0hNbfMtD86v3ukSY_w4UcYU_tlOYR21KmOFnLlbq3YAPfc0-sq5U3NKxA'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


