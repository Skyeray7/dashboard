export type DashboardView =
  | 'overview'
  | 'water'
  | 'ecology'
  | 'thermal'
  | 'context'
  | 'evidence'

export type MetricTone = 'water' | 'vegetation' | 'thermal' | 'neutral' | 'caution'

export type Metric = {
  label: string
  value: string
  unit?: string
  delta: string
  note: string
  tone: MetricTone
}

export type SignalPoint = {
  label: string
  value: number
}

export type TrendPoint = {
  year: number
  value: number
  quality?: string
}

export type TrendDataset = {
  label: string
  color: string
  points: TrendPoint[]
}

export type PhaseStat = {
  label: string
  group: DashboardView
  pre: string
  caution2014: string
  operation: string
  interpretation: string
}

export type FigureItem = {
  title: string
  group: DashboardView
  src: string
  caption: string
  emphasis?: 'wide' | 'standard'
}

export type EvidenceClaim = {
  claim: string
  evidence: string
  caution: string
}

export type ViewMeta = {
  id: DashboardView
  label: string
  eyebrow: string
  summary: string
}

export type SpotlightItem = {
  title: string
  category: string
  summary: string
  image: string
  status: string
  metric: string
}

export type DashboardContent = {
  profile: {
    title: string
    subtitle: string
    studyArea: string
    period: string
    sourceNote: string
  }
  views: ViewMeta[]
  metrics: Metric[]
  signals: SignalPoint[]
  trendDatasets: {
    waterArea: TrendDataset[]
    waterValidation: TrendDataset[]
    ecology: TrendDataset[]
    thermal: TrendDataset[]
    climate: TrendDataset[]
  }
  phaseStats: PhaseStat[]
  figures: FigureItem[]
  claims: EvidenceClaim[]
  qualityNotes: string[]
}
