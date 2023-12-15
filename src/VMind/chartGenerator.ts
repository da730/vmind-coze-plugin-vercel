import { getDataset } from "./utils";
import {
  checkChartTypeAndCell,
  patchChartTypeAndCell,
  vizDataToSpec,
} from "./vizDataToSpec";
import { Cell } from "../typings";
export const generateChartFromCoze = (
  propsChartType: string,
  fieldMap: Cell,
  csvData: string,
  colorPalette?: string[],
  usefulFields?: string[]
) => {

  const fieldMapJson = fieldMap;
  const colorPaletteJson = colorPalette;
  const csvString = csvData;
  console.log("received params:");
  console.log("chartType", propsChartType);
  console.log("fieldMap", fieldMapJson);
  console.log("colorPalette", colorPaletteJson);
  console.log("csvString", csvString);
  const { dataset } = getDataset(csvString);
  let cell = fieldMapJson;
  let chartType = propsChartType.toUpperCase();



  const patchResult = patchChartTypeAndCell(chartType, cell, dataset);
  if (checkChartTypeAndCell(patchResult.chartTypeNew, patchResult.cellNew)) {
    chartType = patchResult.chartTypeNew;
    cell = patchResult.cellNew;
  }
  const spec = vizDataToSpec(dataset, chartType, cell, colorPaletteJson, 1000);
  spec.animation = false;
  spec.background = "#00000033";

  return spec;
};
