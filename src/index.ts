import express, { Request, Response } from 'express';
import { Context, GenerateChartRequestParams, GenerateChartResponseParams } from './typings';
import { generateChartFromCoze } from './VMind/chartGenerator';
import { getChartImage } from './getChartImage';
const bodyParser = require('body-parser');
const app = express();


// 使用body parser中间件来解析请求体
app.use('/chartImage', express.static('chartImage'));

app.use(bodyParser.json());      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.post("/generateChart", async function (req, res) {
  console.log("--------------------");

  //console.log(await context.req.text());

  const params: any = req.body;
  console.log(req.body)
  const { chartType, fieldMap, csvData, colorPalette, usefulFields } = params;
  const spec = generateChartFromCoze(
    chartType,
    fieldMap,
    csvData,
    colorPalette,
    usefulFields
  );
  console.log(JSON.stringify(spec));

  const imageFileName = await getChartImage(spec);

  const basePath = ""

  return res.json({
    url: basePath + "/chartImage/" + imageFileName,
  } as GenerateChartResponseParams);
});

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

module.exports = app;