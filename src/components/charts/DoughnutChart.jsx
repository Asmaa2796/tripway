import React, { useMemo } from "react";
import { useTranslation } from 'react-i18next';
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = () => {
  const { t, i18n } = useTranslation('global');

  const inService = 68;
  const done = 25;
  const cancelled = 14;
  const total = inService + done + cancelled;

  const inServicePercent = ((inService / total) * 100).toFixed(0);

  const options = useMemo(() => ({
    animationEnabled: true,
    backgroundColor: "#fff",
    title: {
      text: "",
      fontColor: "#0f1535",
    },
    subtitles: [
      {
        text: `${t('home.totalTripRequests')} ${inServicePercent}%`,
        verticalAlign: "center",
        fontSize: 16,
        fontColor: "#0f1535",
        fontFamily: "GE, sans-serif",
        dockInsidePlotArea: true,
        maxWidth: 150,
        wrap: true
      },
    ],
    data: [
      {
        type: "doughnut",
        radius: "90%",
        innerRadius: "70%",
        showInLegend: false,
        indexLabelFontColor: "#fff",
        indexLabel: "",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: t('home.inService'), y: inService, color: "#3494E6" },
          { name: t('home.done'), y: done, color: "#FF6A00" },
          { name: t('home.cancelled'), y: cancelled, color: "#17AD37" }
        ],
      },
    ],
  }), [i18n.language, inServicePercent, t]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <CanvasJSChart
        options={options}
        containerProps={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DoughnutChart;
