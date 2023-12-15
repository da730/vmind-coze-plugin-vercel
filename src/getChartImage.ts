import Canvas, { createCanvas } from "canvas";
import VChart from "@visactor/vchart";

export const getChartImage = (spec: any) => {
  const cs = new VChart(spec, {
    // 声明使用的渲染环境以及传染对应的渲染环境参数
    mode: 'node',
    modeParams: Canvas,
    animation: false
  });

  cs.renderSync();

  const buffer = cs.getImageBuffer();
  console.log(buffer);
  const timestamp = Date.now();
  //fs.writeFileSync(`./chartImage/${timestamp}.png`, buffer);
  return timestamp;
};
