
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
app.use(express.json());

/* =========================================
    03 – PROJEKTDATA
   IMPORTERAS FRÅN projekt.js
========================================= */

/* =========================================
   KONTAKTMEDDELANDEN
   SPARAS TILLFÄLLIGT I SERVERN
========================================= */

const meddelanden = [];

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
   KONTAKTFORMULÄR
   POST /kontakt
========================================= */

app.post("/kontakt", (req, res) => {

  /* =====================================
     01 – HÄMTA FORMULÄRDATA
  ===================================== */

  const { namn, email, text } = req.body;


  /* =====================================
     02 – VALIDERA FORMULÄRDATA
  ===================================== */

  if (
    typeof namn !== "string" ||
    namn.trim() === "" ||
    typeof text !== "string" ||
    text.trim() === ""
  ) {
    return res.status(400).json({
      fel: "Namn och meddelande måste fyllas i."
    });
  }


  /* =====================================
     03 – SKAPA NYTT MEDDELANDE
  ===================================== */

  const nyttMeddelande = {
    namn,
    email,
    text
  };


  /* =====================================
     04 – SPARA MEDDELANDET
  ===================================== */

  meddelanden.push(nyttMeddelande);


  /* =====================================
     05 – SKICKA BEKRÄFTELSE
  ===================================== */

  res.status(201).json({
    meddelande: "Meddelandet har tagits emot!",
    data: nyttMeddelande
  });

});

/* =========================================
   VISA ALLA KONTAKTMEDDELANDEN
   GET /kontakt
========================================= */

app.get("/kontakt", (req, res) => {

  res.json(meddelanden);

});


/* =========================================
   10 – STARTA SERVERN
========================================= */

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
