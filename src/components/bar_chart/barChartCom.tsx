"use client";

import ReactECharts from "echarts-for-react";

const rawSeries = [
  { data: [120, 100, 80, 50, 40, 10], type: "bar", stack: "a", name: "a" },
  // { data: [10],      type: 'bar', stack: 'a', name: 'b' },
  // { data: [30, '-', 0, 20, 10, '-', 0],       type: 'bar', stack: 'a', name: 'c' },
  // { data: [30, '-', 0, 20, 10, '-', 0],       type: 'bar', stack: 'b', name: 'd' },
  // { data: [10, 20, 150, 0, '-', 50, 10],      type: 'bar', stack: 'b', name: 'e' },
];

const stackInfo: Record<string, { stackStart: number[]; stackEnd: number[] }> =
  {};
for (let i = 0; i < rawSeries[0].data.length; ++i) {
  for (let j = 0; j < rawSeries.length; ++j) {
    const stackName = rawSeries[j].stack;
    if (!stackName) continue;
    if (!stackInfo[stackName])
      stackInfo[stackName] = { stackStart: [], stackEnd: [] };
    // const info = stackInfo[stackName];
    // const val = rawSeries[j].data[i];
    // // if (val && val !== '-') {
    //   if (info.stackStart[i] == null) info.stackStart[i] = j;
    //   info.stackEnd[i] = j;
    // }
  }
}

const series = rawSeries.map((s, i) => ({
  ...s,
  data: s.data.map((val, j) => {
    const isEnd = stackInfo[s.stack].stackEnd[j] === i;
    return {
      value: val,
      itemStyle: { borderRadius: isEnd ? [20, 20, 0, 0] : [0, 0, 0, 0] },
    };
  }),
}));

const option = {
  xAxis: {
    type: "category",
    data: ["90-100", "80-89", "70-79", "60-69", "50-59", "50<"],
  },
  yAxis: { type: "value" },
  series,
};

export function BarChart() {
  return <ReactECharts option={option} style={{ height: 400 }} />;
}
