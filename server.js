
import express from "express";

const app = express();
const port = 3001;

// Hälsning utan namn
app.get("/hej", (req, res) => {
  res.send("Hej från min server!");
});

// Hälsning med namn
app.get("/hej/:namn", (req, res) => {
  res.send(`Hej ${req.params.namn}!`);
});

app.get("/tid", (req, res) => {
  res.send(new Date().toLocaleTimeString("sv-SE"));
});

app.get("/om", (req, res) => {
  res.json({
    namn: "Anna",
    yrke: "Webbutvecklare"
  });
});


// Starta servern
app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
