import { writeFile } from 'fs';

const FISH_DATA = [{"name": "Bitterling", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ea/NH-Icon-bitterling.png/revision/latest?cb=20200401003128", "price": 900, "location": "River", "shadowSize": "1", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": true, "dec": true}, {"name": "Pale chub", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/2c/NH-Icon-palechub.png/revision/latest?cb=20200401003129", "price": 200, "location": "River", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Crucian carp", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/0/03/NH-Icon-cruciancarp.png/revision/latest?cb=20200401003129", "price": 160, "location": "River", "shadowSize": "2", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Dace", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/22/NH-Icon-dace.png/revision/latest?cb=20200401003129", "price": 192, "location": "River", "shadowSize": "3", "time": "4 PM - 9 AM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Carp", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/2c/NH-Icon-carp.png/revision/latest?cb=20200401003129", "price": 300, "location": "Pond", "shadowSize": "4", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Koi", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/74/NH-Icon-koi.png/revision/latest?cb=20200401003129", "price": 4000, "location": "Pond", "shadowSize": "4", "time": "4 PM - 9 AM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Goldfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ed/NH-Icon-goldfish.png/revision/latest?cb=20200401003129", "price": 1300, "location": "Pond", "shadowSize": "1", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Pop-eyed goldfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c9/NH-Icon-popeyedgoldfish.png/revision/latest?cb=20200401003129", "price": 1300, "location": "Pond", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Ranchu goldfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/f/f9/NH-Icon-ranchugoldfish.png/revision/latest?cb=20200401003129", "price": 4500, "location": "Pond", "shadowSize": "2", "time": "9 AM - 4 PM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Killifish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c3/NH-Icon-killifish.png/revision/latest?cb=20200401003129", "price": 300, "location": "Pond", "shadowSize": "1", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Crawfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/cd/NH-Icon-crawfish.png/revision/latest?cb=20200401003129", "price": 200, "location": "Pond", "shadowSize": "2", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Soft-shelled turtle", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c3/NH-Icon-softshelledturtle.png/revision/latest?cb=20200401003129", "price": 3750, "location": "River", "shadowSize": "4", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Snapping Turtle", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/24/NH-Icon-snappingturtle.png/revision/latest?cb=20200401003129", "price": 5000, "location": "River", "shadowSize": "5", "time": "9 PM - 4 AM", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Tadpole", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/1c/NH-Icon-tadpole.png/revision/latest?cb=20200401003129", "price": 100, "location": "Pond", "shadowSize": "1", "time": "All day", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": false, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Frog", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/6b/NH-Icon-frog.png/revision/latest?cb=20200401003129", "price": 120, "location": "Pond", "shadowSize": "2", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Freshwater goby", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ee/NH-Icon-freshwatergoby.png/revision/latest?cb=20200401003129", "price": 400, "location": "River", "shadowSize": "2", "time": "4 PM - 9 AM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Loach", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/77/NH-Icon-loach.png/revision/latest?cb=20200401003129", "price": 400, "location": "River", "shadowSize": "2", "time": "All day", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Catfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/29/NH-Icon-catfish.png/revision/latest?cb=20200401003129", "price": 800, "location": "Pond", "shadowSize": "4", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Giant snakehead", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/0/0c/NH-Icon-giantsnakehead.png/revision/latest?cb=20200401003129", "price": 5500, "location": "Pond", "shadowSize": "5", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Bluegill", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/69/NH-Icon-bluegill.png/revision/latest?cb=20200401003129", "price": 180, "location": "River", "shadowSize": "2", "time": "9 AM - 4 PM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Yellow perch", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/1d/NH-Icon-yellowperch.png/revision/latest?cb=20200401003129", "price": 300, "location": "River", "shadowSize": "3", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": true, "nov": true, "dec": true}, {"name": "Black bass", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/e2/NH-Icon-blackbass.png/revision/latest?cb=20200401003129", "price": 320, "location": "River", "shadowSize": "4", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Tilapia", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/53/NH-Icon-tilapia.png/revision/latest?cb=20200401003129", "price": 800, "location": "River", "shadowSize": "3", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Pike", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/dc/NH-Icon-pike.png/revision/latest?cb=20200401003130", "price": 1800, "location": "River", "shadowSize": "5", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Pond smelt", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/4/41/NH-Icon-pondsmelt.png/revision/latest?cb=20200401003130", "price": 500, "location": "River", "shadowSize": "2", "time": "All day", "jan": true, "feb": true, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": false, "dec": true}, {"name": "Sweetfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/4/40/NH-Icon-sweetfish.png/revision/latest?cb=20200401003129", "price": 900, "location": "River", "shadowSize": "3", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Cherry salmon", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5f/NH-Icon-cherrysalmon.png/revision/latest?cb=20200401003129", "price": 800, "location": "River (Clifftop)", "shadowSize": "3", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": true, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Char", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/15/NH-Icon-char.png/revision/latest?cb=20200401003129", "price": 3800, "location": "River (Clifftop)  Pond", "shadowSize": "3", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": true, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Golden trout", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5c/NH-Icon-goldentrout.png/revision/latest?cb=20200401003129", "price": 15000, "location": "River (Clifftop)", "shadowSize": "3", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": false, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Stringfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/7b/NH-Icon-stringfish.png/revision/latest?cb=20200401003129", "price": 15000, "location": "River (Clifftop)", "shadowSize": "5", "time": "4 PM - 9 AM", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": false, "dec": true}, {"name": "Salmon", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/f/fb/NH-Icon-salmon.png/revision/latest?cb=20200401003129", "price": 700, "location": "River (Mouth)", "shadowSize": "4", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "King salmon", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/f/fd/NH-Icon-kingsalmon.png/revision/latest?cb=20200401003129", "price": 1800, "location": "River (Mouth)", "shadowSize": "6", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Mitten crab", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/e3/NH-Icon-mittencrab.png/revision/latest?cb=20200401003129", "price": 2000, "location": "River", "shadowSize": "2", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Guppy", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/63/NH-Icon-guppy.png/revision/latest?cb=20200401003129", "price": 1300, "location": "River", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Nibble fish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/8/89/NH-Icon-nibblefish.png/revision/latest?cb=20200401003129", "price": 1500, "location": "River", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Angelfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/63/NH-Icon-angelfish.png/revision/latest?cb=20200401003128", "price": 3000, "location": "River", "shadowSize": "2", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Betta", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/7c/NH-Icon-betta.png/revision/latest?cb=20200401003129", "price": 2500, "location": "River", "shadowSize": "2", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Neon tetra", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/da/NH-Icon-neontetra.png/revision/latest?cb=20200401003129", "price": 500, "location": "River", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Rainbowfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/68/NH-Icon-rainbowfish.png/revision/latest?cb=20200401003129", "price": 800, "location": "River", "shadowSize": "1", "time": "9 AM - 4 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Piranha", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/b/b9/NH-Icon-piranha.png/revision/latest?cb=20200401003130", "price": 2500, "location": "River", "shadowSize": "2", "time": "9 AM - 4 PM & 9 PM - 4 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Arowana", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/b/bf/NH-Icon-arowana.png/revision/latest?cb=20200401003128", "price": 10000, "location": "River", "shadowSize": "4", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Dorado", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/df/NH-Icon-dorado.png/revision/latest?cb=20200401003129", "price": 15000, "location": "River", "shadowSize": "5", "time": "4 AM - 9 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Gar", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/9/9f/NH-Icon-gar.png/revision/latest?cb=20200401003129", "price": 6000, "location": "Pond", "shadowSize": "6", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Arapaima", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/7f/NH-Icon-arapaima.png/revision/latest?cb=20200401003128", "price": 10000, "location": "River", "shadowSize": "6", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Saddled bichir", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/a/a0/NH-Icon-saddledbichir.png/revision/latest?cb=20200401003130", "price": 4000, "location": "River", "shadowSize": "4", "time": "9 PM - 4 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Sturgeon", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/9/98/NH-Icon-sturgeon.png/revision/latest?cb=20200401003129", "price": 10000, "location": "River (Mouth)", "shadowSize": "6", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Sea butterfly", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8f/NH-Icon-seabutterfly.png/revision/latest?cb=20200401003129", "price": 1000, "location": "Sea", "shadowSize": "1", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": false, "dec": true}, {"name": "Sea horse", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/55/NH-Icon-seahorse.png/revision/latest?cb=20200401003129", "price": 1100, "location": "Sea", "shadowSize": "1", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Clown fish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/2f/NH-Icon-clownfish.png/revision/latest?cb=20200401003129", "price": 650, "location": "Sea", "shadowSize": "1", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Surgeonfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/11/NH-Icon-surgeonfish.png/revision/latest?cb=20200401003129", "price": 1000, "location": "Sea", "shadowSize": "2", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Butterfly fish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8e/NH-Icon-butterflyfish.png/revision/latest?cb=20200401003129", "price": 1000, "location": "Sea", "shadowSize": "2", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Napoleonfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/6/6f/NH-Icon-napoleonfish.png/revision/latest?cb=20200401003129", "price": 10000, "location": "Sea", "shadowSize": "6", "time": "4 AM - 9 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": true, "aug": true, "sep": false, "oct": false, "nov": false, "dec": false}, {"name": "Zebra turkeyfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/1c/NH-Icon-zebraturkeyfish.png/revision/latest?cb=20200401003130", "price": 500, "location": "Sea", "shadowSize": "3", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Blowfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/3/39/NH-Icon-blowfish.png/revision/latest?cb=20200401003129", "price": 5000, "location": "Sea", "shadowSize": "3", "time": "9 PM - 4 AM", "jan": true, "feb": true, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": true, "dec": true}, {"name": "Puffer fish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/1f/NH-Icon-pufferfish.png/revision/latest?cb=20200401003130", "price": 250, "location": "Sea", "shadowSize": "3", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Anchovy", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/24/NH-Icon-anchovy.png/revision/latest?cb=20200401003129", "price": 200, "location": "Sea", "shadowSize": "2", "time": "4 AM - 9 PM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Horse mackerel", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/d5/NH-Icon-horsemackerel.png/revision/latest?cb=20200401003129", "price": 150, "location": "Sea", "shadowSize": "2", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Barred knifejaw", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8c/NH-Icon-barredknifejaw.png/revision/latest?cb=20200401003128", "price": 5000, "location": "Sea", "shadowSize": "3", "time": "All day", "jan": false, "feb": false, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Sea bass", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/22/NH-Icon-seabass.png/revision/latest?cb=20200401003130", "price": 400, "location": "Sea", "shadowSize": "5", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Red snapper", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/dd/NH-Icon-redsnapper.png/revision/latest?cb=20200401003130", "price": 3000, "location": "Sea", "shadowSize": "4", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Dab", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c6/NH-Icon-dab.png/revision/latest?cb=20200401003129", "price": 300, "location": "Sea", "shadowSize": "3", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": true, "nov": true, "dec": true}, {"name": "Olive flounder", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/9/9e/NH-Icon-oliveflounder.png/revision/latest?cb=20200401003129", "price": 800, "location": "Sea", "shadowSize": "5", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Squid", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/3/3b/NH-Icon-squid.png/revision/latest?cb=20200401003130", "price": 500, "location": "Sea", "shadowSize": "3", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": false, "oct": false, "nov": false, "dec": true}, {"name": "Moray eel", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/e5/NH-Icon-morayeel.png/revision/latest?cb=20200401003130", "price": 2000, "location": "Sea", "shadowSize": "Narrow", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Ribbon eel", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/a/ac/NH-Icon-ribboneel.png/revision/latest?cb=20200401003129", "price": 600, "location": "Sea", "shadowSize": "Narrow", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Tuna", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/50/NH-Icon-tuna.png/revision/latest?cb=20200401003129", "price": 7000, "location": "Pier", "shadowSize": "6", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": true, "dec": true}, {"name": "Blue marlin", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/2f/NH-Icon-bluemarlin.png/revision/latest?cb=20200401003129", "price": 10000, "location": "Pier", "shadowSize": "6", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": false, "jun": false, "jul": true, "aug": true, "sep": true, "oct": false, "nov": true, "dec": true}, {"name": "Giant trevally", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/7b/NH-Icon-gianttrevally.png/revision/latest?cb=20200401003129", "price": 4500, "location": "Pier", "shadowSize": "5", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Mahi-mahi", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/8/82/NH-Icon-mahimahi.png/revision/latest?cb=20200401003129", "price": 6000, "location": "Pier", "shadowSize": "5", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": false, "dec": false}, {"name": "Ocean sunfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/5/52/NH-Icon-oceansunfish.png/revision/latest?cb=20200401003129", "price": 4000, "location": "Sea", "shadowSize": "6 (Fin)", "time": "4 AM - 9 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Ray", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/d/db/NH-Icon-ray.png/revision/latest?cb=20200401003129", "price": 3000, "location": "Sea", "shadowSize": "5", "time": "4 AM - 9 PM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": false, "jul": false, "aug": true, "sep": true, "oct": true, "nov": true, "dec": false}, {"name": "Saw shark", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/7/73/NH-Icon-sawshark.png/revision/latest?cb=20200401003129", "price": 12000, "location": "Sea", "shadowSize": "6 (Fin)", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Hammerhead shark", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/2/25/NH-Icon-hammerheadshark.png/revision/latest?cb=20200401003129", "price": 8000, "location": "Sea", "shadowSize": "6 (Fin)", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Great white shark", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/3/38/NH-Icon-greatwhiteshark.png/revision/latest?cb=20200401003129", "price": 15000, "location": "Sea", "shadowSize": "6 (Fin)", "time": "4 PM - 9 AM", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Whale shark", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/1/1c/NH-Icon-whaleshark.png/revision/latest?cb=20200401003129", "price": 13000, "location": "Sea", "shadowSize": "6 (Fin)", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Suckerfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/b/b9/NH-Icon-suckerfish.png/revision/latest?cb=20200401003131", "price": 1500, "location": "Sea", "shadowSize": "4 (Fin)", "time": "All day", "jan": false, "feb": false, "mar": false, "apr": false, "may": false, "jun": true, "jul": true, "aug": true, "sep": true, "oct": false, "nov": false, "dec": false}, {"name": "Football fish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/a/a5/NH-Icon-footballfish.png/revision/latest?cb=20200401003129", "price": 2500, "location": "Sea", "shadowSize": "4", "time": "4 PM - 9 AM", "jan": true, "feb": true, "mar": true, "apr": false, "may": false, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": true, "dec": true}, {"name": "Oarfish", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/3/33/NH-Icon-oarfish.png/revision/latest?cb=20200401003129", "price": 9000, "location": "Sea", "shadowSize": "6", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": false, "jul": false, "aug": false, "sep": false, "oct": false, "nov": false, "dec": true}, {"name": "Barreleye", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c7/NH-Icon-barreleye.png/revision/latest?cb=20200401003128", "price": 15000, "location": "Sea", "shadowSize": "2", "time": "9 PM - 4 AM", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}, {"name": "Coelacanth", "imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/3/31/NH-Icon-coelacanth.png/revision/latest?cb=20200401003129", "price": 15000, "location": "Sea", "shadowSize": "6", "time": "All day", "jan": true, "feb": true, "mar": true, "apr": true, "may": true, "jun": true, "jul": true, "aug": true, "sep": true, "oct": true, "nov": true, "dec": true}]

enum LOCATION {
  River = 1,
  RiverClifftop,
  RiverMouth,
  Pond,
  Sea,
  Pier
};

type MONTH = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';

type Time = [number, number][];

const MONTHS: {
  [m in MONTH]: number
} = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
}

// ["River", "Pond", "River (Clifftop)", "River (Clifftop)  Pond", "River (Mouth)", "Sea", "Pier"]
const mkLocation = (location: string): LOCATION => {
  switch (location) {
    case 'River':
      return LOCATION.River;
    case 'River (Clifftop)' || 'River (Clifftop)  Pond':
      return LOCATION.RiverClifftop;
    case 'River (Mouth)':
      return LOCATION.RiverMouth;
    case 'Pond':
      return LOCATION.Pond;
    case 'Sea':
      return LOCATION.Sea;
    case 'Pier':
      return LOCATION.Pier;
    default:
      return LOCATION.River;
  }
}

//"All day", "9 AM - 4 PM", "4 PM - 9 AM", "9 PM - 4 AM", "9 AM - 4 PM & 9 PM - 4 AM", "4 AM - 9 PM"
const mkTime = (time: string): Time => {
  switch (time) {
    case '9 AM - 4 PM':
      return [[9, 16]];
    case '4 PM - 9 AM':
      return [[16, 9]];
    case '9 PM - 4 AM':
      return [[21, 4]];
    case '9 AM - 4 PM & 9 PM - 4 AM':
      return [[9, 16], [21, 4]];
    case '4 AM - 9 PM':
      return [[4, 21]];
    default:
      return [[0, 24]];
  }
}

type DATA = typeof FISH_DATA[1];

const mkMonth = (fish: DATA): number[]  => {
  return Object.keys(MONTHS).filter(month => !!fish[month]).map(month => MONTHS[month])
};

enum SHADOW_SIZE {
  Tiny = 1,
  Small,
  Medium,
  Large,
  VeryLarge,
  Huge,
  Long,
  Fin
}

const FISH_SIZE: {
  [k: string]: SHADOW_SIZE
} = {
  "1": 1,
  "2": 2,
  "3": 3, 
  "4": 4, 
  "5": 5, 
  "6": 6, 
  "Narrow": 7, 
  "6 (Fin)": 8, 
  "4 (Fin)": 8
};

const mkSize = (fishSize: string): SHADOW_SIZE => {
  return FISH_SIZE[fishSize];
};

// {
// 	"name": "Bitterling",
// 	"imageLink": "https://vignette.wikia.nocookie.net/animalcrossing/images/e/ea/NH-Icon-bitterling.png/revision/latest?cb=20200401003128",
// 	"price": 900,
// 	"location": "River",
// 	"shadowSize": "1",
// 	"time": "All day",
// 	"jan": true,
// 	"feb": true,
// 	"mar": true,
// 	"apr": false,
// 	"may": false,
// 	"jun": false,
// 	"jul": false,
// 	"aug": false,
// 	"sep": false,
// 	"oct": false,
// 	"nov": true,
// 	"dec": true
// }

const NEW_FISH_DATA = FISH_DATA.map(fish => {
  return {
    name: fish.name,
    image: fish.imageLink,
    price: fish.price,
    location: mkLocation(fish.location),
    time: mkTime(fish.time),
    months: mkMonth(fish),
    shadowSize: mkSize(fish.shadowSize)
  }
});

writeFile('./fish-data.json', JSON.stringify(NEW_FISH_DATA), () => {
  console.log("fish data created")
});