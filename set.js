const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUNKOUNLd0hBL2tiZEtLUFRoR01USElRYWlyODFINktYV25NQTUydzFsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYytXL2w0bUVGRHNwcnRObjdxWkxoUm5mVUdQU2habWhOcmxhaEV5VW9BZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTT1Jud3h2SUF1VHVaU2prN2lwOERXdmZHWkJRbWxXd2w0THR1bkFtb21vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiNExSNEhvSVJLa1hCT0JBSVdydXVzZ2hwVm9XYmxjc1ZrM2tnQU5aWncwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldGaGJHNWxyTmloSzZST083ejM1M29ocURURGJnQ2drMWw0S04zWEJMMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBa1VtN3YwYTh4V2hCcUYyeExaaHQ1SWxmcjJXa3RHakRtZ24yRUZaUzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY05OaXlLdXpUbnRTdmhPTHBvNXJPVy8zV2RrUXdla0llSTVjY3J1NGFIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM21SMlpFRnpUaWVtc3JmWTdKVHhIUXpaRUdiM0RoZm5YRUVUSC8rM29tST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBubGlEWnhsaTdHUzZZMkNrK1lib2lhT0dLK1pRYnJVVGhiRDdYblczR3FRZUhVbUw0bFJDOVN5Q3d4cURPZktIMG4vUHJpNlRrNEdhZitaZmlOT0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6IkhnWjlCZVFwaXNYQ1NiTHBVTWVRUHlXbFlnQncrRUdnREh4OVdKUTNDTGc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQ2NzU1OTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg1NzExRUVDQkUxMEFDN0FGQzMzMEZEOUQxRUFGRUMxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA4ODk5NDZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0Njc1NTkyOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxRDdEOTQzQUM0M0RBRUQ2Q0M0RDM5NDJBRUNGRjZBRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwODg5OTU2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjU0NzQ2NzU1OTI5OjI0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkdhbWluZyIsImxpZCI6IjE5MzkzMTIxMjAwOTU5NjoyNEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tuQ2tOWUVFTVhyOGNJR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZDR21IZldMekdIUXhGc2x5dWw5WFEzcDFhTDVxcXVPelhnOFRsZk9sUkk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBpU0hGK0UvZVg0WU1WRVF4WHptTnNzekRnVERKWjVza3FYSVBYQzNoZ1lVVG9IRUNxQUhxOUR4TUdkbE1nZmdOcjI1NWhOeHh3QTJSR25HVUJSYkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4YTExaVlBcXI0TFZubWNsY3MvRzVCVHdsQlNtTW9WeENPWnNvNFZacHBrZEF3UWxUUm1rc0V5R1M1emdvaG0xZ1R2MnFHVGgrZHg4TnBTMFlCVnNBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0Njc1NTkyOToyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWUWhwaDMxaTh4aDBNUmJKY3JwZlYwTjZkV2krYXFyanMxNFBFNVh6cFVTIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA4ODk5MzgsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ3ZqIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Blak",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "NEURO-MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEURO-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/grlqyj.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

