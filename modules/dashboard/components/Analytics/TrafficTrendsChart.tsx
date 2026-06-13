"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { id, enUS } from "date-fns/locale";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DataPoint {
  x: string;
  y: number;
}

interface DataProps {
  data: {
    pageviews: DataPoint[];
    sessions: DataPoint[];
  };
}

const TrafficTrendsChart = ({ data }: DataProps) => {
  const rawLabels = data?.pageviews?.map((point) => point.x) || [];
  
  // Format labels on X-axis: "Jun 2026"
  const labels = rawLabels.map((isoDate) => format(parseISO(isoDate), "MMM yyyy"));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Page Views",
        data: data?.pageviews?.map((point) => point.y) || [],
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: "Unique Visitors",
        data: data?.sessions?.map((point) => point.y) || [],
        borderColor: "#10b981", // Emerald
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            family: "'Inter', sans-serif",
            size: 13,
            weight: 500,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)", // Dark modern tooltip
        titleFont: { size: 14, family: "'Inter', sans-serif", weight: 600 },
        bodyFont: { size: 13, family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 8,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const isoDate = rawLabels[index];
            if (!isoDate) return "";
            // Menampilkan bulan lengkap: "Juni 2026"
            return format(parseISO(isoDate), "MMMM yyyy", { locale: id });
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hilangkan garis vertikal agar bersih
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
          tickLength: 0,
        },
        ticks: {
          precision: 0,
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-4xl h-[350px] mt-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrafficTrendsChart;
