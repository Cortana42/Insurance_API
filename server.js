const express = require("express");
const app = express();
const soap = require("soap");
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/insurance", (req, res) => {
  var date = new Date();

  var test = [
    {
      login: "WSTEST_USER",
      password: "CkocpEJ3VI05F7H6jEZh9g==",
      Data: [
        {
          Assures: [
            {
              AssuraData: [
                {
                  Civilite: req.body.Sexe,
                  DateNaissance: req.body.DateNaissance,
                  Fumeur: req.body.Fumeur,
                  Quotite: req.body.Quotite,
                  Garanties: req.body.Garanties,
                  TauxCommission: req.body.TauxCommission,
                },
              ],
            },
          ],
          CodeLangue: "fr-FR",
          CotisationType: req.body.CotisationType,
          DateEffet: date.toISOString().split(".")[0],
          Periodicite: req.body.Periodicite,
          Prets: [
            {
              PretData: [
                {
                  Differe: req.body.Differe,
                  Duree: req.body.Duree,
                  Montant: req.body.Montant,
                  Numero: 1,
                  Type: req.body.Type,
                  ValeurResiduelle: 0,
                  Taux: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  soap.createClient(
    "https://recette-webservice-partenaire.afi-esca.com/Webservices/SimulateurPerenimMTService.svc?wsdl",
    function (err, client) {
      console.log(err);
      client.Simulate(test, function (err, result) {
        console.log(err);
        console.log(result);
        res.send(result);
      });
    }
  );
  // var request = http.request(options, function (response) {
  //   response.setEncoding("utf8");
  //   response.on("data", function (chunk) {
  //     res.send(chunk);
  //   });
  //   response.on("error", function (error) {
  //     console.log(error);
  //   });
  // });
  // request.write(JSON.stringify(test));
  // request.end();
});

app.listen(PORT, () => console.log(` it's a live on http://localhost:${PORT}`));
