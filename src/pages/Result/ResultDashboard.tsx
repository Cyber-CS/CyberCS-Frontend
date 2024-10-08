import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Flower } from "@phosphor-icons/react";

// Tipagem dos resultados
interface MaliciousIntent {
  description: string;
}

interface Result {
  maliciousIntent: MaliciousIntent[];
  repositoryUrl: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultDashboard = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] as Result[] }; // Tipagem adicionada aqui

  const chartRef = useRef(null);

  // 1. Gráfico de Tipos de Ameaças por Arquivo
  const threatTypes = results
    .flatMap((result: Result) => result.maliciousIntent.map((intent: MaliciousIntent) => intent.description))
    .reduce((acc: { [key: string]: number }, type: string) => {
      acc[type] = acc[type] ? acc[type] + 1 : 1;
      return acc;
    }, {});

  const chartDataThreats = {
    labels: Object.keys(threatTypes),
    datasets: [
      {
        label: "Quantidade de Arquivos",
        data: Object.values(threatTypes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptionsThreats: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // Cor da legenda
        },
      },
      title: {
        display: true,
        text: "Tipos de Ameaças Encontradas",
        color: "#333", // Cor do título
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333", // Cor dos rótulos do eixo X
        },
      },
      y: {
        ticks: {
          color: "#333", // Cor dos rótulos do eixo Y
        },
      },
    },
  };

  // 2. Gráfico de Arquivos por Fonte de Busca
  const sources = results.reduce((acc: { [key: string]: number }, result: Result) => {
    const source = result.repositoryUrl.includes("github")
      ? "GitHub"
      : result.repositoryUrl.includes("bitbucket")
      ? "Bitbucket"
      : "Outro";
    acc[source] = acc[source] ? acc[source] + 1 : 1;
    return acc;
  }, {});

  const chartDataSources = {
    labels: Object.keys(sources),
    datasets: [
      {
        label: "Quantidade de Arquivos",
        data: Object.values(sources),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartOptionsSources: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // Cor da legenda
        },
      },
      title: {
        display: true,
        text: "Arquivos Encontrados por Fonte de Busca",
        color: "#333", // Cor do título
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333", // Cor dos rótulos do eixo X
        },
      },
      y: {
        ticks: {
          color: "#333", // Cor dos rótulos do eixo Y
        },
      },
    },
  };
  

  return (
    <div className="bg-gray-150 flex-1 text-white w-full px-32">
        <section className="flex gap-12 items-center py-12 mx-32 border-b border-white">
          <Flower size={48} />
          <article>
            <h1 className="text-24 font-semibold">Dashboard de Ameaças</h1>
          </article>
        </section>
      {/* Div para alinhar os gráficos lado a lado */}
      <div className="flex justify-between my-32">
        {/* Gráfico 1: Tipos de Ameaças por Arquivo */}
        <div style={{ width: "45%" }}>
          <Bar ref={chartRef} data={chartDataThreats} options={chartOptionsThreats} />
        </div>
        
        {/* Gráfico 2: Arquivos por Fonte de Busca */}
        <div style={{ width: "45%" }}>
          <Bar ref={chartRef} data={chartDataSources} options={chartOptionsSources} />
        </div>
      </div>
    </div>
  );
};

export { ResultDashboard as Component };
