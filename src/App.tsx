import { useMemo, useState } from 'react'
import './App.css'
import { MetricCard } from './components/MetricCard'
import { SectionTitle } from './components/SectionTitle'
import { SignalChart } from './components/SignalChart'
import { dashboardContent } from './data/dashboard'
import type {
  DashboardView,
  FigureItem,
  PhaseStat,
  TrendDataset,
} from './types/dashboard'

const assetPath = (name: string) => `${import.meta.env.BASE_URL}danjiangkou/figures/${name}`

function formatValue(value: number) {
  if (Math.abs(value) >= 100) {
    return value.toFixed(0)
  }

  if (Math.abs(value) >= 10) {
    return value.toFixed(1)
  }

  return value.toFixed(2)
}

function TrendChart({
  datasets,
  unit,
}: {
  datasets: TrendDataset[]
  unit: string
}) {
  const values = datasets.flatMap((dataset) => dataset.points.map((point) => point.value))
  const years = datasets.flatMap((dataset) => dataset.points.map((point) => point.year))
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const valuePadding = Math.max((maxValue - minValue) * 0.1, maxValue === minValue ? 1 : 0)
  const yMin = minValue - valuePadding
  const yMax = maxValue + valuePadding
  const width = 720
  const height = 280
  const padding = { top: 18, right: 22, bottom: 38, left: 54 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const x = (year: number) =>
    padding.left + ((year - minYear) / Math.max(maxYear - minYear, 1)) * plotWidth
  const y = (value: number) =>
    padding.top + (1 - (value - yMin) / Math.max(yMax - yMin, 1)) * plotHeight

  return (
    <div className="trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Trend chart in ${unit}`}>
        <rect
          className="chart-frame"
          x={padding.left}
          y={padding.top}
          width={plotWidth}
          height={plotHeight}
        />
        <line
          className="event-line"
          x1={x(2014)}
          x2={x(2014)}
          y1={padding.top}
          y2={padding.top + plotHeight}
        />
        <text className="chart-event-label" x={x(2014) + 7} y={padding.top + 16}>
          2014
        </text>
        <text className="axis-label" x={padding.left - 8} y={padding.top + 5} textAnchor="end">
          {formatValue(yMax)}
        </text>
        <text
          className="axis-label"
          x={padding.left - 8}
          y={padding.top + plotHeight}
          textAnchor="end"
        >
          {formatValue(yMin)}
        </text>
        <text className="axis-label" x={padding.left} y={height - 10} textAnchor="middle">
          {minYear}
        </text>
        <text
          className="axis-label"
          x={padding.left + plotWidth}
          y={height - 10}
          textAnchor="middle"
        >
          {maxYear}
        </text>
        {datasets.map((dataset) => {
          const pointString = dataset.points
            .map((point) => `${x(point.year).toFixed(2)},${y(point.value).toFixed(2)}`)
            .join(' ')

          return (
            <g key={dataset.label}>
              <polyline
                points={pointString}
                fill="none"
                stroke={dataset.color}
                strokeWidth="3.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {dataset.points.map((point) => (
                <circle
                  key={`${dataset.label}-${point.year}`}
                  cx={x(point.year)}
                  cy={y(point.value)}
                  r={point.quality ? 5.8 : 4.2}
                  fill={point.quality ? '#d08a2d' : '#ffffff'}
                  stroke={dataset.color}
                  strokeWidth="2.4"
                />
              ))}
            </g>
          )
        })}
      </svg>
      <div className="chart-legend">
        {datasets.map((dataset) => (
          <span key={dataset.label}>
            <i style={{ background: dataset.color }} />
            {dataset.label}
          </span>
        ))}
        <span className="legend-note">unit: {unit}</span>
      </div>
    </div>
  )
}

function TrendPanel({
  title,
  description,
  datasets,
  unit,
}: {
  title: string
  description: string
  datasets: TrendDataset[]
  unit: string
}) {
  return (
    <article className="trend-panel">
      <div className="panel-heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <TrendChart datasets={datasets} unit={unit} />
    </article>
  )
}

function PhaseTable({ rows }: { rows: PhaseStat[] }) {
  return (
    <div className="phase-table-wrap">
      <table className="phase-table">
        <thead>
          <tr>
            <th>指标</th>
            <th>参考期</th>
            <th>2014</th>
            <th>运行期</th>
            <th>解释</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.group}-${row.label}`}>
              <td>{row.label}</td>
              <td>{row.pre}</td>
              <td>{row.caution2014}</td>
              <td>{row.operation}</td>
              <td>{row.interpretation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FigureGallery({ figures }: { figures: FigureItem[] }) {
  return (
    <div className="figure-grid">
      {figures.map((figure) => (
        <article
          className={`figure-card ${figure.emphasis === 'wide' ? 'figure-card--wide' : ''}`}
          key={`${figure.group}-${figure.src}`}
        >
          <img src={assetPath(figure.src)} alt={figure.title} loading="lazy" />
          <div className="figure-caption">
            <h3>{figure.title}</h3>
            <p>{figure.caption}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState<DashboardView>('overview')
  const activeMeta =
    dashboardContent.views.find((view) => view.id === activeView) ?? dashboardContent.views[0]

  const currentFigures = useMemo(() => {
    if (activeView === 'overview') {
      return dashboardContent.figures.filter((figure) => figure.group === 'overview')
    }

    return dashboardContent.figures.filter((figure) => figure.group === activeView)
  }, [activeView])

  const currentPhaseRows = dashboardContent.phaseStats.filter(
    (row) => row.group === activeView || activeView === 'overview',
  )

  const chartPanels = {
    overview: [
      {
        title: '水体面积时间序列',
        description: '默认阈值 MNDWI > 0，2014 作为 transition caution 标记。',
        datasets: dashboardContent.trendDatasets.waterArea,
        unit: 'km²',
      },
      {
        title: 'NDVI / NDMI 概览',
        description: '四级缓冲区均值，2010 和 2014 保留特殊解释标记。',
        datasets: dashboardContent.trendDatasets.ecology,
        unit: 'index',
      },
      {
        title: '水体冷岛强度',
        description: 'WCI = 陆地缓冲区平均 LST - 水体区 LST。',
        datasets: dashboardContent.trendDatasets.thermal,
        unit: '℃',
      },
    ],
    water: [
      {
        title: 'MNDWI 水体面积',
        description: '面积统计使用 30 m raster pixelArea，限制在最终水库范围内。',
        datasets: dashboardContent.trendDatasets.waterArea,
        unit: 'km²',
      },
      {
        title: 'Landsat 与 JRC 对比',
        description: 'JRC YearlyHistory 用于 2010-2021 独立参考验证。',
        datasets: dashboardContent.trendDatasets.waterValidation,
        unit: 'km²',
      },
    ],
    ecology: [
      {
        title: 'NDVI / NDMI 年际变化',
        description: '陆地区域缓冲区平均值，排除年度水体像元。',
        datasets: dashboardContent.trendDatasets.ecology,
        unit: 'index',
      },
    ],
    thermal: [
      {
        title: 'WCI 年际变化',
        description: '水体相对陆地的冷岛强度，单位为摄氏度。',
        datasets: dashboardContent.trendDatasets.thermal,
        unit: '℃',
      },
    ],
    context: [
      {
        title: '降水与 ET/PET 背景',
        description: 'CHIRPS 与 MOD16A2GF 作为解释背景，不做因果证明。',
        datasets: dashboardContent.trendDatasets.climate,
        unit: 'mm / ratio',
      },
    ],
    evidence: [
      {
        title: '水体面积与验证主线',
        description: '最终结论依赖 MNDWI、JRC、质量诊断和 caution 标记共同支撑。',
        datasets: dashboardContent.trendDatasets.waterValidation,
        unit: 'km²',
      },
    ],
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-main">
          <div>
            <span className="project-kicker">Remote sensing dashboard</span>
            <h1>
              <span>丹江口水库</span>
              <span>环境遥感分析仪表盘</span>
            </h1>
            <p>{dashboardContent.profile.subtitle}</p>
          </div>
          <div className="header-facts" aria-label="Project facts">
            <span>{dashboardContent.profile.studyArea}</span>
            <span>{dashboardContent.profile.period}</span>
          </div>
        </div>

        <nav className="view-tabs" aria-label="Dashboard sections">
          {dashboardContent.views.map((view) => (
            <button
              type="button"
              key={view.id}
              className={view.id === activeView ? 'active' : ''}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section className="intro-band">
          <div className="intro-copy">
            <span>{activeMeta.eyebrow}</span>
            <h2>{activeMeta.label}</h2>
            <p>{activeMeta.summary}</p>
            <p className="source-note">{dashboardContent.profile.sourceNote}</p>
          </div>
          <SignalChart points={dashboardContent.signals} />
        </section>

        <section className="metrics-grid" aria-label="Key results">
          {dashboardContent.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="section-band">
          <SectionTitle
            eyebrow="Time series"
            title="关键时间序列"
            description="所有折线都保留 2014 节点；橙色点表示需要谨慎解释的年份。"
          />
          <div className="trend-grid">
            {chartPanels[activeView].map((panel) => (
              <TrendPanel
                key={panel.title}
                title={panel.title}
                description={panel.description}
                datasets={panel.datasets}
                unit={panel.unit}
              />
            ))}
          </div>
        </section>

        {currentPhaseRows.length > 0 ? (
          <section className="section-band">
            <SectionTitle
              eyebrow="Phase statistics"
              title="阶段统计摘要"
              description="采用 2010-2013、2014、2015-2024 的主结构；生态指标同时强调 2011-2013 敏感性参考期。"
            />
            <PhaseTable rows={currentPhaseRows} />
          </section>
        ) : null}

        <section className="section-band">
          <SectionTitle
            eyebrow="Figures"
            title="报告图件解读"
            description="这里展示的是本地报告已经生成的正式图件，网页只做排版与索引，不改动图中数据。"
          />
          <FigureGallery figures={currentFigures} />
        </section>

        <section className="section-band evidence-layout">
          <div>
            <SectionTitle
              eyebrow="Claims"
              title="可陈述结论与边界"
              description="这些句子适合转化为课程汇报中的结论页，但需要连同 caution 一起表述。"
            />
            <div className="claim-list">
              {dashboardContent.claims.map((claim) => (
                <article className="claim-card" key={claim.claim}>
                  <h3>{claim.claim}</h3>
                  <p>{claim.evidence}</p>
                  <strong>{claim.caution}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="quality-panel">
            <span>Quality notes</span>
            <ul>
              {dashboardContent.qualityNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default App
