const request = require('request');
const fs = require('fs');

const urls = [
            "https://api.proxyscrape.com/?request=displayproxies&proxytype=https",
            "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt",
            "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt",
            "https://proxyspace.pro/https.txt",
            "https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt",
            "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt",
            "https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt",
];

const file = 'proxy.txt';

// Function to remove the existing file
const removeFile = () => {
    try {
        fs.unlinkSync(file);
        console.log(`Removed existing ${file}`);
    } catch (err) {
        console.error(`Error removing existing ${file}: ${err}`);
    }
};

// Function to fetch and save data
const fetchAndSave = (url, index) => {
    request.get(url, function (error, response, body) {
        if (error) {
            console.error(`Error fetching ${url}: ${error}`);
        } else if (response.statusCode !== 200) {
            console.error(`Unexpected status code for ${url}: ${response.statusCode}`);
        } else {
            fs.appendFile(file, body, (err) => {
                if (err) {
                    console.error(`Error writing to file: ${err}`);
                } else {
                    console.log(`Fetched and saved data from ${url}`);
                }
            });
        }

        // If it's the last URL in the array, exit the process
        if (index === urls.length - 1) {
            console.log(`All data saved to ${file}`);
            process.exit(0);
        }
    });
};

// Remove existing file before fetching data
removeFile();

// Start fetching data from all URLs
urls.forEach((url, index) => {
    fetchAndSave(url, index);
});