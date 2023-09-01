import { BR, EU, GB, US } from 'country-flag-icons/react/1x1'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import exchangeImg from './assets/exchange.svg'

import './App.scss'

const chartOptions: ApexOptions = {
  chart: {
    id: 'currency-chart',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  yaxis: {
    min: 5,
    tickAmount: 4,
    labels: {
      formatter: (value: number) => {
        return value.toFixed(1).replace('.', ',')
      },
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    axisTicks: {
      show: false,
    },
  },
  fill: {
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  colors: ['#7c3aed'],
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return `
        <div class="tooltip"
          <span>
            ${String(series[seriesIndex][dataPointIndex]).replace('.', ',')}
          </span>
          <span>
            ${new Date(
              w.globals.seriesX[seriesIndex][dataPointIndex],
            ).toLocaleDateString('pt-BR', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      `
    },
  },
  series: [
    {
      name: 'exchange',
      data: [
        {
          x: new Date('2018-02-12').getTime(),
          y: 5.18,
        },
        {
          x: new Date('2018-02-13').getTime(),
          y: 5.3,
        },
        {
          x: new Date('2018-02-14').getTime(),
          y: 5.18,
        },
        {
          x: new Date('2018-02-15').getTime(),
          y: 5.11,
        },
        {
          x: new Date('2018-02-16').getTime(),
          y: 5.18,
        },
        {
          x: new Date('2018-02-17').getTime(),
          y: 5.25,
        },
        {
          x: new Date('2018-02-18').getTime(),
          y: 5.18,
        },
        {
          x: new Date('2018-02-19').getTime(),
          y: 5.2,
        },
      ],
    },
  ],
}

function App() {
  return (
    <main id="container">
      <section className="converter">
        <h2>Conversor de moedas</h2>

        <div className="wrapper">
          <div className="money-wrapper">
            <input type="text" className="amount-input" value="$1.000" />

            <div className="dropdown">
              <div className="selected">
                <US />
                USD
              </div>

              <ul>
                <li>
                  <BR />
                  BRL
                </li>
                <li>
                  <US />
                  USD
                </li>
                <li>
                  <EU />
                  EUR
                </li>
                <li>
                  <GB />
                  GBP
                </li>
              </ul>
            </div>
          </div>
          <div className="exchange">
            <img src={exchangeImg} alt="Trocar moeda" />
          </div>
          <div className="money-wrapper">
            <input type="text" className="amount-input" value="R$ 5.148,20" />

            <div className="dropdown">
              <div className="selected">
                <BR />
                USD
              </div>

              <ul>
                <li>
                  <BR />
                  BRL
                </li>
                <li>
                  <US />
                  USD
                </li>
                <li>
                  <EU />
                  EUR
                </li>
                <li>
                  <GB />
                  GBP
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="exchange">
        <h2>Taxa de câmbio</h2>

        <div className="wrapper">
          <div id="chart">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="area"
            />
          </div>
          <div className="chart-controls">
            <button>1D</button>
            <button>5D</button>
            <button className="active">1M</button>
            <button>1A</button>
            <button>5A</button>
            <button>Máx</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
