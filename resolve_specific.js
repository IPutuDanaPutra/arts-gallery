import https from 'https';
import fs from 'fs';

// Specific list of broken IDs identified in verification
const brokenItems = [
    { id: 3, title: "The Birth of Venus", artist: "Sandro Botticelli", search: "Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg" },
    { id: 13, title: "The Night Watch", artist: "Rembrandt", search: "The Night Watch - HD.jpg" },
    { id: 16, title: "Las Meninas", artist: "Diego Velázquez", search: "Las Meninas, by Diego Velázquez, from Prado in Google Earth.jpg" },
    { id: 18, title: "The Third of May 1808", artist: "Francisco Goya", search: "El Tres de Mayo, by Francisco de Goya, from Prado in Google Earth.jpg" },
    { id: 31, title: "The Starry Night", artist: "Vincent van Gogh", search: "Van Gogh - Starry Night - Google Art Project.jpg" },
    { id: 49, title: "Lady with an Ermine", artist: "Leonardo da Vinci", search: "Lady with an Ermine - Leonardo da Vinci - Google Art Project.jpg" },
    { id: 51, title: "The Ambassadors", artist: "Hans Holbein the Younger", search: "Hans Holbein the Younger - The Ambassadors - Google Art Project.jpg" },
    { id: 69, title: "The Tower of Babel", artist: "Pieter Bruegel the Elder", search: "Pieter Bruegel the Elder - The Tower of Babel (Vienna) - Google Art Project - edited.jpg" },
    { id: 96, title: "Lady with an Ermine", artist: "Leonardo da Vinci", search: "Lady with an Ermine - Leonardo da Vinci - Google Art Project.jpg" }, // Duplicate ID/Entry in previous list?
];

async function fetchUrl(titleStr) {
    const options = { headers: { 'User-Agent': 'GalleryAppCorrectionBot/1.0 (contact@example.com)' } };
    const filename = encodeURIComponent("File:" + titleStr);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${filename}&prop=imageinfo&iiprop=url&format=json`;

    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId === "-1") resolve(null);
                    else resolve(pages[pageId].imageinfo?.[0]?.url || null);
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function searchUrl(query) {
    const options = { headers: { 'User-Agent': 'GalleryAppCorrectionBot/1.0 (contact@example.com)' } };
    const q = encodeURIComponent(query);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${q}&srnamespace=6&format=json`;

    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.search && json.query.search.length > 0) {
                        const title = json.query.search[0].title;
                        const filename = title.replace("File:", "");
                        fetchUrl(filename).then(resolve);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        });
    });
}

(async () => {
    console.log("Resolving final broken images...");
    for (const item of brokenItems) {
        // Try the specific filename first
        let url = await fetchUrl(item.search);

        // If that fails, try a broader search
        if (!url) {
            console.log(`Retrying search for: ${item.title}`);
            url = await searchUrl(item.title + " " + item.artist + " high resolution");
        }

        if (url) {
            console.log(`[${item.id}] FIXED: ${url}`);
        } else {
            console.log(`[${item.id}] STILL BROKEN: ${item.title}`);
        }
    }
})();
