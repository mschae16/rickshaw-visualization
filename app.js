const Influx = require('influx');
const express = require('express');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');
const app = express();
const influx = new Influx.InfluxDB('http://127.0.0.1:8086/telegraf');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', 3000);

influx.getMeasurements()
  .then(names => console.log('My measurement names are: ' + names.join(', ')))
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Listening on ${app.get('port')}.`);
    });
  })
  .catch(error => console.log({ error }));

app.get('/api/v1/load_times', (request, response) => {
  influx.query(`
    select mean("load1") as "mean_load1",
    mean("load15") as "mean_load15",
    mean("load5") as "mean_load5" from system
    where time > now() - 1h and
    host = 'Margos-MBP.attlocal.net'
    group by time(1m)
    limit 100
    `)
    .then(result => response.status(200).json(result))
    .catch(error => response.status(500).json({ error }));
});
