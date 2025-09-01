import React from "react";
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomBarChart = () => {
  const { t, i18n } = useTranslation('global');

  const data = [
    { name: t('home.months.january'), stat1: 20, stat2: 30, stat3: 10 },
    { name: t('home.months.february'), stat1: 20, stat2: 30, stat3: 40 },
    { name: t('home.months.march'), stat1: 20, stat2: 50, stat3: 40 },
    { name: t('home.months.april'), stat1: 20, stat2: 3, stat3: 10 },
    { name: t('home.months.may'), stat1: 20, stat2: 10, stat3: 20 },
  ];

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0D6EFD1A" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#fbfbfb", border: "none", color: "#fff", fontSize: "11px" }} />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey="stat1" fill="#FFD200" radius={[10, 10, 0, 0]} name={`${t('home.statistic')} 1`} />
          <Bar dataKey="stat2" fill="#00C6FB" radius={[10, 10, 0, 0]} name={`${t('home.statistic')} 2`} />
          <Bar dataKey="stat3" fill="#F2205B" radius={[10, 10, 0, 0]} name={`${t('home.statistic')} 3`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
