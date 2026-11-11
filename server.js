
/* =========================================
   MIN SERVER – EXPRESS API
   NODE.JS / JAVASCRIPT
========================================= */


/* =========================================
   01 – IMPORTER
========================================= */

import express from "express";
import cors from "cors";
import projekt from "./projekt.js";



/* =========================================
   02 – SERVERINSTÄLLNINGAR
========================================= */

const app = express();
const port = 3001;

app.use(cors());


/* =========================================
    03 – PROJEKTDATA
   IMPORTERAS FRÅN projekt.js
========================================= */



/* =========================================
   04 – HÄLSNING UTAN NAMN
   GET /hej
========================================= */

app.get("/hej", (req, res) => {
  res.send("Hej från min server!");
});


/* =========================================
   05 – HÄLSNING MED NAMN
   GET /hej/:namn
========================================= */

app.get("/hej/:namn", (req, res) => {
  res.send(`Hej ${req.params.namn}!`);
});


/* =========================================
   06 – AKTUELL TID
   GET /tid
========================================= */

app.get("/tid", (req, res) => {
  res.send(new Date().toLocaleTimeString("sv-SE"));
});


/* =========================================
   07 – INFORMATION
   GET /om
========================================= */

app.get("/om", (req, res) => {
  res.json({
    namn: "Anna",
    yrke: "Webbutvecklare"
  });
});


/* =========================================
   08 – ALLA PROJEKT
   GET /projekt
========================================= */

app.get("/projekt", (req, res) => {
  res.json(projekt);
});


/* =========================================
   09 – ENSKILT PROJEKT
   GET /projekt/:id
========================================= */

app.get("/projekt/:id", (req, res) => {
  const id = Number(req.params.id);

  const valtProjekt = projekt.find((p) => p.id === id);

  if (!valtProjekt) {
    return res.status(404).json({
      fel: "Projektet hittades inte"
    });
  }

  res.json(valtProjekt);
});

/* =========================================
   10 – STARTA SERVERN
========================================= */

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
