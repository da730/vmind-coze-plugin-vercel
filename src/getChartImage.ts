import Canvas, { createCanvas } from "canvas";
import VChart from "@visactor/vchart";
import { promises as fs } from 'fs'
export const getChartImage = async (spec: any) => {
  const cs = new VChart(spec, {
    // 声明使用的渲染环境以及传染对应的渲染环境参数
    mode: 'node',
    modeParams: Canvas,
    animation: false
  });

  cs.renderSync();

  const buffer = cs.getImageBuffer();
  const timestamp = Date.now();

  await fs.writeFile(`src/chartImage/${timestamp}.png`, buffer);
  return timestamp + '.png';
};
