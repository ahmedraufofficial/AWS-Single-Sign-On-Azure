var request = require('request');
var qr = require('node-qr-image');

const getUsers = () => {
  const options = {
    'method': 'GET',
    'url': 'https://api.beaconstac.com/api/2.0/qrcodes/?state=A',
    'headers': {
      'Authorization': 'Token 1d13d7f54396e64b2464bf5e20ab9e9343ac44ff',
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
      request(options, function (error, res, body) {
          if (!error && res.statusCode === 200) {
              resolve(body);
          } else {
              reject(error);
          }
      });
  })
}

const getUsers2 = () => {
  const options = {
    'method': 'GET',
    'url': 'https://api.beaconstac.com/api/2.0/qrcodes/?page=2&state=A',
    'headers': {
      'Authorization': 'Token 1d13d7f54396e64b2464bf5e20ab9e9343ac44ff',
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
      request(options, function (error, res, body) {
          if (!error && res.statusCode === 200) {
              resolve(body);
          } else {
              reject(error);
          }
      });
  })
}

const getUsers3 = () => {
  const options = {
    'method': 'GET',
    'url': 'https://api.beaconstac.com/api/2.0/qrcodes/?page=3&state=A',
    'headers': {
      'Authorization': 'Token 1d13d7f54396e64b2464bf5e20ab9e9343ac44ff',
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
      request(options, function (error, res, body) {
          if (!error && res.statusCode === 200) {
              resolve(body);
          } else {
              reject(error);
          }
      });
  })
}

const updateUser = (userId, qrId) => {
  const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InY1ejBZazJPaWxNVjVzYndpQTNPd0x3TWZFM0JPaEJOODh5LUJ0djl1S3ciLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wY2VhMGFiNy0yMjM0LTRmNTctYmM4MC00ZDNlNjZkZjQ3OTEvIiwiaWF0IjoxNjcyODExNTQzLCJuYmYiOjE2NzI4MTE1NDMsImV4cCI6MTY3MjgxNTQ0MywiYWlvIjoiRTJaZ1lPaitjeWV5dmU2THJlaTB2cVFsK3lZa0FBQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJCZWFjb25zdGFjIFFSIEludGVncmF0aW9uIEFQSSIsImFwcGlkIjoiNjQyMzQxOWQtY2QwMS00OWZkLWE3YzAtNjc3OWRlMTFmMjZkIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGNlYTBhYjctMjIzNC00ZjU3LWJjODAtNGQzZTY2ZGY0NzkxLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiYTZhYTlkMDgtOTc4NS00NjVlLWI5MmMtNGNiNWRmNDYyODI1IiwicmgiOiIwLkFUd0F0d3JxRERRaVYwLThnRTAtWnQ5SGtRTUFBQUFBQUFBQXdBQUFBQUFBQUFBOEFBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIlVzZXIuUmVhZFdyaXRlLkFsbCIsIk1haWwuU2VuZCJdLCJzdWIiOiJhNmFhOWQwOC05Nzg1LTQ2NWUtYjkyYy00Y2I1ZGY0NjI4MjUiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiIwY2VhMGFiNy0yMjM0LTRmNTctYmM4MC00ZDNlNjZkZjQ3OTEiLCJ1dGkiOiJ4VWs0REdOeVdVV1JhS0gwRXVkNEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX3RjZHQiOjE1NzQyNTU2MDV9.WFcOk91-gtCXskmSCT5r3ytZrBVrDGrN_XA6704dVvvqPduLvzFFEU_o77U7goy6J4-n0wSh9dVFjT97IsIPfTi6se8_xCrty6_4tgKJbgAZ7dvoCsFHkK9SFddFFRQeMFCei4LaL-XJrfZxT4ywx5HF9nbGzJj5lywLMhdmbAhpxqdUWS1ooCH-cAsHxa-8vH3lvIooL6rJrSdLDcj6CoR4EMqE-fYG7WS_OJ2Dp1SIDSTJ7Zml0McAg5HrfLE8dnDHclF7E7YGazQRc9vEG5htjMEHWOSC89qnOfYWTSWm6EQ_oQp7CmHOvyXaikLqo13XOd3ZdFBqbe-A1rgSmA"
  const options = {
    'method': 'PATCH',
    'url': `https://graph.microsoft.com/v1.0/users/${userId}`,
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "onPremisesExtensionAttributes": {
        "extensionAttribute1": String(qrId)
      }
    })
  
  };
  return new Promise((resolve, reject) => {
      request(options, function (error, res, body) {
          if (!error && res.statusCode === 204) {
              resolve(`Successfully Updated User. ${body}`);
          } else {
              reject("errorrrr");
          }
      });
  })
}


const run = async () => {
  const users = JSON.parse(await getUsers());
  const gett = Promise.all(users.results.map(x => updateUser(x.campaign.vcard_plus.email, x.id).then((response) => {
    console.log(response)
  }).catch((err) => {
    console.log(x.name)
    console.log(err)
  })));
}


const putToSharepoint = (value, siteUrl, fileName, token) => {
  const binaryData = qr.imageSync(`https://qr.bgmea.cloud/${value}`, { size: 15, type: 'svg' });
  const options = {
      method: 'put',
      url: `${siteUrl}/${fileName}.svg:/content`,
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'image/svg+xml',
      },
      body: binaryData
  };
  return new Promise((resolve, reject) => {
      request(options, function(error, res, body) {
          if (!error && res.statusCode === 200) {
              resolve(body);
          } else {
              reject(error);
          }
      })
  })
}

async function getDuplicates(arr) {
  const duplicates = [];
  const counts = {};
  
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (counts[value]) {
      duplicates.push(value);
    } else {
      counts[value] = true;
    }
  }

  return duplicates;
}


const test = async () => {
  const errA = []
  const SHAREPOINT_SITE = 'https://graph.microsoft.com/v1.0/sites/94fe361b-d7b2-44f3-8be2-c151fb3c5c12/drives/b!Gzb-lLLX80SL4sFR-zxcEgR49EqCVvpCuWAdA6g3VYIYBVKPJiFhSJfIok0t8vk7/root:/Stationary/Access_Cards/QR_Codes_New';
  const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImlZU0NvdXoxZFBnRkRsWUNnaXBSNmJ6OUxxbzBvdlBib1N1eUtoVVBId1UiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wY2VhMGFiNy0yMjM0LTRmNTctYmM4MC00ZDNlNjZkZjQ3OTEvIiwiaWF0IjoxNjc1MTYxNjI3LCJuYmYiOjE2NzUxNjE2MjcsImV4cCI6MTY3NTE2NTUyNywiYWlvIjoiRTJaZ1lOaWluaUw4VDNuMjRpWUdNZGJpK1RzU0FRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJCZWFjb25zdGFjIFFSIEludGVncmF0aW9uIEFQSSIsImFwcGlkIjoiNjQyMzQxOWQtY2QwMS00OWZkLWE3YzAtNjc3OWRlMTFmMjZkIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGNlYTBhYjctMjIzNC00ZjU3LWJjODAtNGQzZTY2ZGY0NzkxLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiYTZhYTlkMDgtOTc4NS00NjVlLWI5MmMtNGNiNWRmNDYyODI1IiwicmgiOiIwLkFUd0F0d3JxRERRaVYwLThnRTAtWnQ5SGtRTUFBQUFBQUFBQXdBQUFBQUFBQUFBOEFBQS4iLCJyb2xlcyI6WyJTaXRlcy5TZWxlY3RlZCIsIlVzZXIuUmVhZFdyaXRlLkFsbCIsIk1haWwuU2VuZCJdLCJzdWIiOiJhNmFhOWQwOC05Nzg1LTQ2NWUtYjkyYy00Y2I1ZGY0NjI4MjUiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiIwY2VhMGFiNy0yMjM0LTRmNTctYmM4MC00ZDNlNjZkZjQ3OTEiLCJ1dGkiOiJPa3RtWDktRDdrQ1hqM3h0NUNrUUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX3RjZHQiOjE1NzQyNTU2MDV9.qRHWyK3F2fxFlF1tzNzzOyks7j6fcQYVVLgFf6UE8bNnF_t-KNrx-aJxyEejUvbF9bK1HbwAko8HyOmPkIw7NzAU9IxDPDn2HktXtpLwGhXyCC_TWTphFs4p6buHtEvNqAlx3cCTUa8EO35p4V3Q7ngtQPetuLWCVMMqenC6z_1aA_0ICEH3uHpvz6BRrUbvWf-zDJ2TdRwARix1rRsu91x17dqUrKlaXElpVcIANaIwRfhKh6PLE_YxPjSa1M4z7P8zm-7Im3Wo1gXbAEIv29obyRKkidT7g0xvgVeRLJXALHMadNukOhr0OONFR-mu9ZEtNtY2pnVtDlFm7SFUWg"
  const users = JSON.parse(await getUsers()).results;
  const users2 = JSON.parse(await getUsers2()).results;
  const users3 = JSON.parse(await getUsers3()).results;
  const merged = users.concat(users2)
  const final = merged.concat(users3)
  const get_names = final.map(item => item.name);
  const duplicates = await getDuplicates(get_names)
  let filteredArr = final.filter(dict => !duplicates.includes(dict.name));
  const run = Promise.all(filteredArr.map(x => putToSharepoint(x["url"].split('/')[3], SHAREPOINT_SITE, x.name, token).then((response) => {
    console.log(`${x.name} is successfull`)
  }).catch((err) => {
    errA.push(x.name)
    console.log(errA)
  })));

}

//run();
test();
