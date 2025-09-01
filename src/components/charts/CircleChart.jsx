import React from "react";
import { useTranslation } from 'react-i18next';
const CircleChart = () => {
  const {t,i18n} = useTranslation('global');
  return (
    <div className="circle_chart">
      <div className="row">
        <div className="col-lx-4 col-lg-4 col-md-6 col-12">
          <div className="chart-text border-0">
            <div>
              <svg
                width="50px" // let SVG fill container width
                height="50px" // keep aspect ratio
                viewBox="0 0 42 42"
                className="pie"
                aria-labelledby="css-pie-chart"
                role="img"
              >
                <circle
                  className="donut-hole"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="#fff"
                />
                <circle
                  className="donut-ring"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#ddd"
                  strokeWidth="3"
                />
                <circle
                  className="donut-segment"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#FFD200"
                  strokeWidth="3"
                  strokeDasharray="75 25"
                  strokeDashoffset="25"
                />
                <g className="chart-text"></g>
              </svg>
            </div>
            <div>
              <b className="text-lighter">{t('sidenav.individualClients')}</b>
              <h5 className="text-lighter">65,127</h5>
            </div>
          </div>
        </div>
        <div className="col-lx-4 col-lg-4 col-md-6 col-12">
          <div className="chart-text">
            <div>
              <svg
                width="50px" // let SVG fill container width
                height="50px" // keep aspect ratio
                viewBox="0 0 42 42"
                className="pie"
                aria-labelledby="css-pie-chart"
                role="img"
              >
                <circle
                  className="donut-hole"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="#fff"
                />
                <circle
                  className="donut-ring"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#ddd"
                  strokeWidth="3"
                />
                <circle
                  className="donut-segment"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#00C6FB"
                  strokeWidth="3"
                  strokeDasharray="75 25"
                  strokeDashoffset="25"
                />
                <g className="chart-text"></g>
              </svg>
            </div>
            <div>
              <b className="text-lighter">{t('sidenav.individualClients')}</b>
              <h5 className="text-lighter">65,127</h5>
            </div>
          </div>
        </div>
        <div className="col-lx-4 col-lg-4 col-md-6 col-12">
          <div className="chart-text">
            <div>
              <svg
                width="50px" // let SVG fill container width
                height="50px" // keep aspect ratio
                viewBox="0 0 42 42"
                className="pie"
                aria-labelledby="css-pie-chart"
                role="img"
              >
                <circle
                  className="donut-hole"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="#fff"
                />
                <circle
                  className="donut-ring"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#ddd"
                  strokeWidth="3"
                />
                <circle
                  className="donut-segment"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#F2205B"
                  strokeWidth="3"
                  strokeDasharray="75 25"
                  strokeDashoffset="25"
                />
                <g className="chart-text"></g>
              </svg>
            </div>
            <div>
              <b className="text-lighter">{t('sidenav.individualClients')}</b>
              <h5 className="text-lighter">65,127</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;