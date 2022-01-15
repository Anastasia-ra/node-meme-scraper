import got from 'got';
import htmlUrls from 'html-urls';
import fs from 'node:fs';
import fetch from 'node-fetch';

async function memescraper() {
  const url = 'https://memegen-link-examples-upleveled.netlify.app/';
  const { body: html } = await got(url);
  const links = htmlUrls({ html, url });

  // Array in which all urls will be pushed
  const allUrls = [];

  links.forEach((element) => {
    allUrls.push(element.url);
  });

  // Array of only image urls
  const imageUrls = allUrls.filter((element) =>
    element.startsWith('https://api.memegen.link/images'),
  );

  // Loop over the array of image urls
  for (let a = 0; a < 10; a++) {
    // Check if needs to add 0 in front of the image number
    let path = a === 9 ? `./memes/${a + 1}.jpg` : `./memes/0${a + 1}.jpg`;

    // Create file for the [a] image
    fs.open(path, 'w', (err) => {
      if (err) {
        throw err;
      }
    });
    // Downloads the image to the created file
    const imageUrl = imageUrls[a];

    fetch(imageUrl)
      .then((res) => res.body.pipe(fs.createWriteStream(path)))
      .catch((error) => {
        console.log(error);
      });
  }
}

// Run the function

memescraper().catch((error) => {
  console.log(error);
});
