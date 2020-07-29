import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';


// inject React component to root and send it in response
function sendComponentFromServer(htmlContent, res) {
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Internal server error.');
        }
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`)
        );
    });
}

// call to Places API 
function getPlaces(params) {
    let results;

    // places api
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.places_api}&location=${params.location}&radius=${params.radius}&type=restaurant`, {method: 'GET'})
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return new Error('Places API call failed with response status: ' + response.status);
            }
        }).then(data => {
            results = data;
        }).catch(error => {
            console.log(error);
        })

    return results;
}

export { sendComponentFromServer, getPlaces };