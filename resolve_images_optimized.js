import https from 'https';
import fs from 'fs';

const artworkData = [
    { id: 1, title: "Mona Lisa", artist: "Leonardo da Vinci", year: "1503", search: "Mona Lisa" },
    { id: 2, title: "The Last Supper", artist: "Leonardo da Vinci", year: "1498", search: "The Last Supper Leonardo da Vinci" },
    { id: 3, title: "The Birth of Venus", artist: "Sandro Botticelli", year: "1486", search: "Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg" },
    { id: 4, title: "Primavera", artist: "Sandro Botticelli", year: "1482", search: "Botticelli-primavera.jpg" },
    { id: 5, title: "The Creation of Adam", artist: "Michelangelo", year: "1512", search: "Michelangelo - Creation of Adam (cropped).jpg" },
    { id: 6, title: "School of Athens", artist: "Raphael", year: "1511", search: "\"The School of Athens\" by Raffaello Sanzio da Urbino.jpg" },
    { id: 7, title: "Venus of Urbino", artist: "Titian", year: "1538", search: "Tiziano - Venere di Urbino - Google Art Project.jpg" },
    { id: 8, title: "Assumption of the Virgin", artist: "Titian", year: "1518", search: "Titian - Assumption of the Virgin - WGA22784.jpg" },
    { id: 9, title: "Medusa", artist: "Caravaggio", year: "1597", search: "Michelangelo Merisi da Caravaggio - Medusa - WGA04107.jpg" },
    { id: 10, title: "The Calling of St Matthew", artist: "Caravaggio", year: "1600", search: "The Calling of Saint Matthew-Caravaggio (1599-1600).jpg" },
    { id: 11, title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", year: "1665", search: "Meisje met de parel.jpg" },
    { id: 12, title: "The Milkmaid", artist: "Johannes Vermeer", year: "1658", search: "Johannes Vermeer - Het melkmeisje - Google Art Project.jpg" },
    { id: 13, title: "The Night Watch", artist: "Rembrandt", year: "1642", search: "The Night Watch - HD.jpg" },
    { id: 14, title: "The Anatomy Lesson of Dr. Nicolaes Tulp", artist: "Rembrandt", year: "1632", search: "Rembrandt - The Anatomy Lesson of Dr Nicolaes Tulp.jpg" },
    { id: 15, title: "Self-Portrait with Two Circles", artist: "Rembrandt", year: "1660", search: "Rembrandt Self-Portrait (Kenwood).jpg" },
    { id: 16, title: "Las Meninas", artist: "Diego Velázquez", year: "1656", search: "Las Meninas, by Diego Velázquez, from Prado in Google Earth.jpg" },
    { id: 17, title: "The Surrender of Breda", artist: "Diego Velázquez", year: "1635", search: "Velazquez - The Surrender of Breda.jpg" },
    { id: 18, title: "The Third of May 1808", artist: "Francisco Goya", year: "1814", search: "El Tres de Mayo, by Francisco de Goya, from Prado in Google Earth.jpg" },
    { id: 19, title: "Saturn Devouring His Son", artist: "Francisco Goya", year: "1823", search: "Francisco de Goya, Saturno devorando a su hijo (1819-1823).jpg" },
    { id: 20, title: "The Naked Maja", artist: "Francisco Goya", year: "1800", search: "Goya Maja naga2.jpg" },
    { id: 21, title: "Liberty Leading the People", artist: "Eugène Delacroix", year: "1830", search: "Eugène Delacroix - Le 28 Juillet. La Liberté guidant le peuple.jpg" },
    { id: 22, title: "The Raft of the Medusa", artist: "Théodore Géricault", year: "1819", search: "JEAN LOUIS THÉODORE GÉRICAULT - La Balsa de la Medusa (Museo del Louvre, 1818-19).jpg" },
    { id: 23, title: "Napoleon Crossing the Alps", artist: "Jacques-Louis David", year: "1801", search: "Napoleon4.jpg" },
    { id: 24, title: "The Death of Marat", artist: "Jacques-Louis David", year: "1793", search: "Moreau le Jeune - Jacques-Louis David - La Mort de Marat.jpg" },
    { id: 25, title: "The Grande Odalisque", artist: "Jean-Auguste-Dominique Ingres", year: "1814", search: "Jean-Auguste-Dominique Ingres - La Grande Odalisque - WGA11846.jpg" },
    { id: 26, title: "Impression, Sunrise", artist: "Claude Monet", year: "1872", search: "Monet - Impression, Sunrise.jpg" },
    { id: 27, title: "Water Lilies", artist: "Claude Monet", year: "1919", search: "Claude Monet - Water Lilies - Google Art Project (462013).jpg" },
    { id: 28, title: "Luncheon of the Boating Party", artist: "Pierre-Auguste Renoir", year: "1881", search: "Luncheon of the Boating Party - The Phillips Collection with frame.jpg" },
    { id: 29, title: "Dance at Le Moulin de la Galette", artist: "Pierre-Auguste Renoir", year: "1876", search: "Pierre-Auguste Renoir, Le Moulin de la Galette.jpg" },
    { id: 30, title: "The Absinthe Drinker", artist: "Edgar Degas", year: "1876", search: "Edgar Degas - In a Café - google art project.jpg" },
    { id: 31, title: "The Starry Night", artist: "Vincent van Gogh", year: "1889", search: "Van Gogh - Starry Night - Google Art Project.jpg" },
    { id: 32, title: "Sunflowers", artist: "Vincent van Gogh", year: "1888", search: "Vincent Willem van Gogh 127.jpg" },
    { id: 33, title: "Café Terrace at Night", artist: "Vincent van Gogh", year: "1888", search: "Vincent Willem van Gogh 015.jpg" },
    { id: 34, title: "A Sunday Afternoon on the Island of La Grande Jatte", artist: "Georges Seurat", year: "1884", search: "A Sunday on La Grande Jatte, Georges Seurat, 1884.jpg" },
    { id: 35, title: "The Card Players", artist: "Paul Cézanne", year: "1895", search: "Paul Cézanne - Les Joueurs de cartes (Metropolitan Museum of Art).jpg" },
    { id: 36, title: "Mont Sainte-Victoire", artist: "Paul Cézanne", year: "1904", search: "Paul Cézanne - Mont Sainte-Victoire - Google Art Project.jpg" },
    { id: 37, title: "Where Do We Come From? What Are We? Where Are We Going?", artist: "Paul Gauguin", year: "1897", search: "Paul Gauguin - D'ou venons-nous.jpg" },
    { id: 38, title: "The Scream", artist: "Edvard Munch", year: "1893", search: "Edvard Munch, 1893, The Scream, oil, tempera and pastel on cardboard, 91 x 73.5 cm, National Gallery of Norway.jpg" },
    { id: 39, title: "The Kiss", artist: "Gustav Klimt", year: "1908", search: "The Kiss - Gustav Klimt - Google Cultural Institute.jpg" },
    { id: 40, title: "Portrait of Adele Bloch-Bauer I", artist: "Gustav Klimt", year: "1907", search: "Gustav Klimt 046.jpg" },
    { id: 41, title: "American Gothic", artist: "Grant Wood", year: "1930", search: "Grant Wood - American Gothic - Google Art Project.jpg" },
    { id: 42, title: "Nighthawks", artist: "Edward Hopper", year: "1942", search: "Nighthawks by Edward Hopper 1942.jpg" },
    { id: 43, title: "Whistler's Mother", artist: "James McNeill Whistler", year: "1871", search: "Whistlers Mother high res.jpg" },
    { id: 44, title: "The Fighting Temeraire", artist: "J.M.W. Turner", year: "1839", search: "The Fighting Temeraire tugged to her last berth to be broken_up, 1839.jpg" },
    { id: 45, title: "Ophelia", artist: "John Everett Millais", year: "1851", search: "John Everett Millais - Ophelia - Google Art Project.jpg" },
    { id: 46, title: "The Lady of Shalott", artist: "John William Waterhouse", year: "1888", search: "John William Waterhouse - The Lady of Shalott - Google Art Project.jpg" },
    { id: 47, title: "The Great Wave off Kanagawa", artist: "Hokusai", year: "1831", search: "Great Wave off Kanagawa2.jpg" },
    { id: 48, title: "Red Fuji", artist: "Hokusai", year: "1830", search: "Katsushika Hokusai - Fine Wind, Clear Morning (Gaifū kaisei) - Google Art Project.jpg" },
    { id: 49, title: "Lady with an Ermine", artist: "Leonardo da Vinci", year: "1489", search: "Lady with an Ermine - Leonardo da Vinci - Google Art Project.jpg" },
    { id: 50, title: "The Arnolfini Portrait", artist: "Jan van Eyck", year: "1434", search: "Van Eyck - Arnolfini Portrait.jpg" },
    { id: 51, title: "The Ambassadors", artist: "Hans Holbein the Younger", year: "1533", search: "Hans Holbein the Younger - The Ambassadors - Google Art Project.jpg" },
    { id: 52, title: "Bacchus and Ariadne", artist: "Titian", year: "1523", search: "Titian Bacchus and Ariadne.jpg" },
    { id: 53, title: "The Wedding at Cana", artist: "Paolo Veronese", year: "1563", search: "Paolo Veronese 008.jpg" },
    { id: 54, title: "Judith Slaying Holofernes", artist: "Artemisia Gentileschi", year: "1620", search: "Judith Beheading Holofernes - Artemisia Gentileschi.jpg" },
    { id: 55, title: "The Laughing Cavalier", artist: "Frans Hals", year: "1624", search: "Frans Hals - The Laughing Cavalier - WGA09748.jpg" },
    { id: 56, title: "The Lacemaker", artist: "Johannes Vermeer", year: "1670", search: "Johannes Vermeer - The Lacemaker - WGA24673.jpg" },
    { id: 57, title: "Large Blue Horses", artist: "Franz Marc", year: "1911", search: "Franz Marc - The Large Blue Horses - Google Art Project.jpg" },
    { id: 58, title: "Fate of the Animals", artist: "Franz Marc", year: "1913", search: "Franz Marc - Tierschicksale - Google Art Project.jpg" },
    { id: 59, title: "Foxes", artist: "Franz Marc", year: "1913", search: "Franz Marc 031.jpg" },
    { id: 60, title: "Twittering Machine", artist: "Paul Klee", year: "1922", search: "Twittering Machine.jpg" },
    { id: 61, title: "Castle and Sun", artist: "Paul Klee", year: "1928", search: "Klee - Castle and Sun.jpg" },
    { id: 62, title: "Ad Parnassum", artist: "Paul Klee", year: "1932", search: "Paul Klee - Ad Parnassum.jpg" },
    { id: 63, title: "In a Park", artist: "Berthe Morisot", year: "1874", search: "Berthe Morisot - In a Park.jpg" },
    { id: 64, title: "The Cradle", artist: "Berthe Morisot", year: "1872", search: "Berthe Morisot - The Cradle - Google Art Project.jpg" },
    { id: 65, title: "Paris Street; Rainy Day", artist: "Gustave Caillebotte", year: "1877", search: "Gustave Caillebotte - Paris Street; Rainy Day - Google Art Project.jpg" },
    { id: 66, title: "The Floor Scrapers", artist: "Gustave Caillebotte", year: "1875", search: "Gustave Caillebotte - The Floor Planers - Google Art Project.jpg" },
    { id: 67, title: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich", year: "1818", search: "Caspar David Friedrich - Wanderer above the Sea of Fog - Google Art Project.jpg" },
    { id: 68, title: "The Garden of Earthly Delights", artist: "Hieronymus Bosch", year: "1510", search: "El jardín de las Delicias, de El Bosco.jpg" },
    { id: 69, title: "The Tower of Babel", artist: "Pieter Bruegel the Elder", year: "1563", search: "Pieter Bruegel the Elder - The Tower of Babel (Vienna) - Google Art Project - edited.jpg" },
    { id: 70, title: "Hunters in the Snow", artist: "Pieter Bruegel the Elder", year: "1565", search: "Pieter Bruegel the Elder - Hunters in the Snow (Winter) - Google Art Project.jpg" },
    { id: 71, title: "The Swing", artist: "Jean-Honoré Fragonard", year: "1767", search: "The Swing (Fragonard).jpg" },
    { id: 72, title: "Blue Boy", artist: "Thomas Gainsborough", year: "1770", search: "The Blue Boy.jpg" },
    { id: 73, title: "Mr and Mrs Andrews", artist: "Thomas Gainsborough", year: "1750", search: "Thomas Gainsborough - Mr and Mrs Andrews - Google Art Project.jpg" },
    { id: 74, title: "The Hay Wain", artist: "John Constable", year: "1821", search: "John Constable - The Hay Wain - Google Art Project.jpg" },
    { id: 75, title: "Rain, Steam and Speed", artist: "J.M.W. Turner", year: "1844", search: "Rain Steam and Speed the Great Western Railway.jpg" },
    { id: 76, title: "Breezing Up", artist: "Winslow Homer", year: "1876", search: "Winslow Homer - Breezing Up (A Fair Wind) - Google Art Project.jpg" },
    { id: 77, title: "The Gulf Stream", artist: "Winslow Homer", year: "1899", search: "Winslow Homer - The Gulf Stream - Metropolitan Museum of Art.jpg" },
    { id: 78, title: "Madame X", artist: "John Singer Sargent", year: "1884", search: "Madame X (Madame Pierre Gautreau), John Singer Sargent, 1884 (unretouched).jpg" },
    { id: 79, title: "Carnation, Lily, Lily, Rose", artist: "John Singer Sargent", year: "1885", search: "Sargent - Carafano Lily Lily Rose.jpg" },
    { id: 80, title: "Olympia", artist: "Édouard Manet", year: "1863", search: "Edouard Manet - Olympia - Google Art Project 3.jpg" },
    { id: 81, title: "The Luncheon on the Grass", artist: "Édouard Manet", year: "1863", search: "Édouard Manet - Le Déjeuner sur l'herbe - Google Art Project.jpg" },
    { id: 82, title: "A Bar at the Folies-Bergère", artist: "Édouard Manet", year: "1882", search: "Edouard Manet, A Bar at the Folies-Bergère.jpg" },
    { id: 83, title: "The Gross Clinic", artist: "Thomas Eakins", year: "1875", search: "Thomas Eakins, American - Portrait of Dr. Samuel D. Gross (The Gross Clinic) - Google Art Project.jpg" },
    { id: 84, title: "The Swimming Hole", artist: "Thomas Eakins", year: "1885", search: "Thomas Eakins - Swimming.jpg" },
    { id: 85, title: "Arrangement in Grey and Black No.1", artist: "James McNeill Whistler", year: "1871", search: "Whistlers Mother high res.jpg" },
    { id: 86, title: "Nocturne in Black and Gold – The Falling Rocket", artist: "James McNeill Whistler", year: "1875", search: "Whistler-Nocturne in black and gold.jpg" },
    { id: 87, title: "The Gleaners", artist: "Jean-François Millet", year: "1857", search: "Jean-François Millet - Gleaners - Google Art Project 2.jpg" },
    { id: 88, title: "The Angelus", artist: "Jean-François Millet", year: "1859", search: "L'Angelus.jpg" },
    { id: 89, title: "The Desperate Man", artist: "Gustave Courbet", year: "1845", search: "Gustave Courbet - Le Désespéré.jpg" },
    { id: 90, title: "The Stone Breakers", artist: "Gustave Courbet", year: "1849", search: "Gustave Courbet - The Stonebreakers - WGA05457.jpg" },
    { id: 91, title: "Bargemen Singing", artist: "Ilya Repin", year: "1873", search: "Ilya Repin - Barge Haulers on the Volga - Google Art Project.jpg" },
    { id: 92, title: "Reply of the Zaporozhian Cossacks", artist: "Ilya Repin", year: "1891", search: "Ilja Jefimowitsch Repin - Reply of the Zaporozhian Cossacks - Google Art Project.jpg" },
    { id: 93, title: "Morning in a Pine Forest", artist: "Ivan Shishkin", year: "1889", search: "Ivan Shishkin - Morning in a Pine Forest - Google Art Project.jpg" },
    { id: 94, title: "The Ninth Wave", artist: "Ivan Aivazovsky", year: "1850", search: "Hovhannes Aivazovsky - The Ninth Wave - Google Art Project.jpg" },
    { id: 95, title: "The Apotheosis of War", artist: "Vasily Vereshchagin", year: "1871", search: "Vasily Vereshchagin - The Apotheosis of War - Google Art Project.jpg" },
    { id: 96, title: "Lady with an Ermine", artist: "Leonardo da Vinci", year: "1489", search: "Lady with an Ermine - Leonardo da Vinci - Google Art Project.jpg" },
    { id: 97, title: "Napoleon I on His Imperial Throne", artist: "Jean-Auguste-Dominique Ingres", year: "1806", search: "Ingres, Napoleon on his Imperial throne.jpg" },
    { id: 98, title: "The Valpinçon Bather", artist: "Jean-Auguste-Dominique Ingres", year: "1808", search: "Jean Auguste Dominique Ingres - La Baigneuse Valpinçon.jpg" },
    { id: 99, title: "The Turkish Bath", artist: "Jean-Auguste-Dominique Ingres", year: "1862", search: "Le Bain Turc, by Jean-Auguste-Dominique Ingres, from C2RMF_retouched.jpg" },
    { id: 100, title: "Oath of the Horatii", artist: "Jacques-Louis David", year: "1784", search: "Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg" }
];

async function fetchUrl(titleStr) {
    const options = {
        headers: { 'User-Agent': 'GalleryAppCorrectionBot/1.0 (contact@example.com)' }
    };
    const filename = encodeURIComponent("File:" + titleStr);
    // Add iiurlwidth=800 to get a thumbnail
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${filename}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;

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
                    else {
                        const info = pages[pageId].imageinfo?.[0];
                        // Use thumburl if available, otherwise url (fallback for small images)
                        resolve(info?.thumburl || info?.url || null);
                    }
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
                    if (json.query?.search?.[0]) {
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
    const resolved = [];
    console.log("Resolving optimized URLs...");
    for (const item of artworkData) {
        let url = await fetchUrl(item.search);
        if (!url) {
            console.log(`Fallback search for [${item.id}] ${item.title}`);
            url = await searchUrl(item.title + " " + item.artist);
        }

        if (!url) {
            console.log(`[${item.id}] FAILED: ${item.title}`);
            url = "https://placehold.co/800x600?text=Image+Not+Found";
        }

        resolved.push({
            id: item.id,
            title: item.title,
            artist: item.artist,
            year: item.year,
            image: url
        });
    }

    fs.writeFileSync('resolved_artworks_optimized.json', JSON.stringify(resolved, null, 2));
    console.log("Done.");
})();
