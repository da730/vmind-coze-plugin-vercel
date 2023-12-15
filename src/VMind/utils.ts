import { DataItem } from "../typings";
import { DataSet, DataView, csvParser, fold } from "@visactor/vdataset";

export const detectAxesType = (values: any[], field: string) => {
  const isNumber = values.every((d) => !d[field] || !isNaN(Number(d[field])));
  if (isNumber) {
    return "linear";
  } else {
    return "band";
  }
};

export const CARTESIAN_CHART_LIST = [
  "Dynamic Bar Chart",
  "Bar Chart",
  "Line Chart",
  "Scatter Plot",
  "Funnel Chart",
  "Dual Axis Chart",
  "Waterfall Chart",
  "Box Plot Chart",
];
export const parseCSVWithVChart = (csvString: string) => {
  //Parse csv string to VChart Dataview so it can be directly used in VChart spec
  const dataSet = new DataSet();
  dataSet.registerParser("csv", csvParser);
  dataSet.registerTransform("fold", fold);
  const dataView = new DataView(dataSet, { name: "data" });
  console.log("123123123", csvString);
  dataView.parse(csvString, {
    type: "csv",
  });
  return dataView;
};

export const getDataset = (
  csvString: string
): { dataset: DataItem[]; columns: string[] } => {
  //get dataset from csv string
  const dataView = parseCSVWithVChart(csvString);
  console.log(csvString);
  console.log(dataView);
  const { columns, ...dataColumns } = dataView.latestData;
  const dataset = Object.keys(dataColumns).map((key) => dataColumns[key]);
  return { dataset, columns };
};
