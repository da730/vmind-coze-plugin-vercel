import express, { Request, Response } from 'express';
import { Context, GenerateChartRequestParams, GenerateChartResponseParams } from './typings';
import { generateChartFromCoze } from './VMind/chartGenerator';
import { getChartImage } from './getChartImage';
const bodyParser = require('body-parser');
const app = express();


// 使用body parser中间件来解析请求体
app.use(bodyParser.json());      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));
app.use('/chartImage', express.static('chartImage'));
app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.post("/generateChart", function (req, res) {
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
  const testSpec = {
    type: "bar",
    data: {
      id: "data",
      values: [
        { "Product Name": "Coke", Region: " South", Sales: " 2350" },
        { "Product Name": "Coke", Region: " East", Sales: " 1027" },
        { "Product Name": "Coke", Region: " West", Sales: " 1027" },
        { "Product Name": "Coke", Region: " North", Sales: " 1027" },
        { "Product Name": "Sprite", Region: " South", Sales: " 215" },
        { "Product Name": "Sprite", Region: " East", Sales: " 654" },
        { "Product Name": "Sprite", Region: " West", Sales: " 159" },
        { "Product Name": "Sprite", Region: " North", Sales: " 28" },
        { "Product Name": "Fanta", Region: " South", Sales: " 345" },
        { "Product Name": "Fanta", Region: " East", Sales: " 654" },
        { "Product Name": "Fanta", Region: " West", Sales: " 2100" },
        { "Product Name": "Fanta", Region: " North", Sales: " 1679" },
        { "Product Name": "Mirinda", Region: " South", Sales: " 1476" },
        { "Product Name": "Mirinda", Region: " East", Sales: " 830" },
        { "Product Name": "Mirinda", Region: " West", Sales: " 532" },
        { "Product Name": "Mirinda", Region: " North", Sales: " 498" },
      ],
    },
    color: [
      "#1DD0F3",
      "#2693FF",
      "#3259F4",
      "#1B0CA1",
      "#CB2BC6",
      "#FF581D",
      "#FBBB16",
      "#F6FB17",
    ],
    xField: ["Product Name", "Region"],
    yField: "Sales",
    seriesField: "Region",
    axes: [
      {
        orient: "bottom",
        type: "band",
        label: { style: { fill: "#FFFFFF" } },
        title: { visible: false, style: { fill: "#FFFFFF" } },
      },
      {
        orient: "left",
        type: "linear",
        label: { style: { fill: "#FFFFFF" } },
        title: { visible: false, style: { fill: "#FFFFFF" } },
      },
    ],
    legends: [
      {
        orient: "right",
        type: "discrete",
        item: {
          visible: true,
          background: { style: { fillOpacity: 0 } },
          label: { style: { fill: "#FFFFFF" } },
          shape: { style: { symbolType: "rect" } },
        },
      },
    ],
    bar: { style: { cornerRadius: [8, 8, 0, 0] } },
    animationAppear: { oneByOne: 5e-324, duration: 250 },
    animation: false,
    background: "#00000033",
  };

  const imageFileName = getChartImage(testSpec);

  return res.json({
    url: "https://vmind-coze-plugin-vercel-iew8xj68w-das-projects-ebf9cd71.vercel.app/chartImage/" + imageFileName,
  } as GenerateChartResponseParams);
});

app.listen(3001, function () {
  console.log('App listening on port 3000!');
});
