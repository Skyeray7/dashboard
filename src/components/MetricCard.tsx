import type { Metric } from '../types/dashboard'

type MetricCardProps = {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${metric.tone}`}>
      <div className="metric-header">
        <span>{metric.label}</span>
        <strong>{metric.delta}</strong>
      </div>
      <div className="metric-value-row">
        <p className="metric-value">{metric.value}</p>
        {metric.unit ? <span className="metric-unit">{metric.unit}</span> : null}
      </div>
      <p className="metric-note">{metric.note}</p>
    </article>
  )
}
