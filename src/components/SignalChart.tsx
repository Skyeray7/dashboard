import type { SignalPoint } from '../types/dashboard'

type SignalChartProps = {
  points: SignalPoint[]
}

export function SignalChart({ points }: SignalChartProps) {
  return (
    <article className="signal-card">
      <div className="signal-header">
        <span>Evidence control</span>
        <strong>0-100</strong>
      </div>
      <div className="signal-chart" aria-label="Evidence control score chart">
        {points.map((point) => (
          <div className="signal-row" key={point.label}>
            <div className="signal-row__label">
              <span>{point.label}</span>
              <strong>{point.value}</strong>
            </div>
            <div className="signal-track">
              <span style={{ width: `${Math.max(point.value, 6)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
