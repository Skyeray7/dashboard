import { useState } from 'react'
import './App.css'
import { MetricCard } from './components/MetricCard'
import { SectionTitle } from './components/SectionTitle'
import { SignalChart } from './components/SignalChart'
import { SpotlightCard } from './components/SpotlightCard'
import { dashboardContent } from './data/dashboard'
import type { DashboardView } from './types/dashboard'

const views: Array<{
  id: DashboardView
  label: string
  summary: string
}> = [
  {
    id: 'overview',
    label: '概览',
    summary: '先看整体结构、模块和当前准备度。',
  },
  {
    id: 'showcase',
    label: '展示',
    summary: '聚焦精选内容位、案例位和图文模块。',
  },
  {
    id: 'timeline',
    label: '时间线',
    summary: '聚焦发布节奏、更新计划和待办推进。',
  },
]

function App() {
  const [activeView, setActiveView] = useState<DashboardView>('overview')

  const activeMeta = views.find((view) => view.id === activeView) ?? views[0]
  const spotlightItems =
    activeView === 'showcase'
      ? dashboardContent.spotlight
      : dashboardContent.spotlight.slice(0, 2)
  const timelineItems =
    activeView === 'timeline'
      ? dashboardContent.timeline
      : dashboardContent.timeline.slice(0, 4)
  const collectionItems =
    activeView === 'overview'
      ? dashboardContent.collections.slice(0, 2)
      : dashboardContent.collections

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <span className="brand-badge">Dashboard</span>
          <span className="brand-subtitle">Vite + React starter</span>
        </div>

        <div className="sidebar-cover">
          <img
            src={dashboardContent.profile.coverImage}
            alt="Workspace cover"
          />
        </div>

        <section className="sidebar-card profile-card">
          <span className="card-label">Positioning</span>
          <h1>{dashboardContent.profile.name}</h1>
          <p>{dashboardContent.profile.description}</p>

          <ul className="highlight-list">
            {dashboardContent.profile.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="sidebar-card">
          <span className="card-label">Workspace view</span>
          <div className="view-switcher">
            {views.map((view) => (
              <button
                key={view.id}
                type="button"
                className={view.id === activeView ? 'active' : ''}
                onClick={() => setActiveView(view.id)}
              >
                <span>{view.label}</span>
                <small>{view.summary}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="sidebar-card">
          <span className="card-label">Anchor links</span>
          <ul className="quick-link-list">
            {dashboardContent.quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div>
            <span className="topbar-label">Current focus</span>
            <h2>{activeMeta.label}</h2>
          </div>
          <p>{activeMeta.summary}</p>
        </header>

        <section className="hero-panel" id="overview">
          <div className="hero-copy">
            <span className="hero-eyebrow">{dashboardContent.hero.eyebrow}</span>
            <h3>{dashboardContent.hero.focus}</h3>
            <p>{dashboardContent.hero.description}</p>

            <div className="hero-tags">
              {dashboardContent.hero.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="hero-note">{dashboardContent.hero.note}</div>
          </div>

          <SignalChart points={dashboardContent.signals} />
        </section>

        <section className="metrics-grid" aria-label="Metric overview">
          {dashboardContent.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="section-block" id="showcase">
          <SectionTitle
            eyebrow="Showcase modules"
            title="精选展示位"
            description="这里先搭出能长期扩展的展示布局，后面只要继续填真实项目和内容即可。"
          />

          <div className="spotlight-grid">
            {spotlightItems.map((item) => (
              <SpotlightCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="section-block timeline-block" id="timeline">
          <SectionTitle
            eyebrow="Release rhythm"
            title="更新与发布时间线"
            description="这部分适合继续演化成 changelog、周报、里程碑日志或活动排期区。"
          />

          <div className="timeline-list">
            {timelineItems.map((entry) => (
              <article className="timeline-item" key={`${entry.date}-${entry.title}`}>
                <div className="timeline-date">
                  <span>{entry.date}</span>
                  <strong>{entry.tag}</strong>
                </div>
                <div className="timeline-content">
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block split-grid" id="assets">
          <div className="panel">
            <SectionTitle
              eyebrow="Resource modules"
              title="资源与展示模块"
              description="每个模块都留了可继续拆分和接数据的空间，适合你后面逐步拓展。"
            />

            <div className="resource-list">
              {dashboardContent.resources.map((resource) => (
                <article className="resource-item" key={resource.title}>
                  <div className="resource-meta">
                    <span>{resource.kind}</span>
                    <strong>{resource.readiness}</strong>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.summary}</p>
                  <div className="resource-owner">{resource.owner}</div>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <SectionTitle
              eyebrow="Execution list"
              title="接下来要补的内容"
              description="把工程跑起来以后，最自然的下一步就是继续填真实内容和上线配置。"
            />

            <div className="checklist">
              {dashboardContent.checklist.map((item) => (
                <article className="check-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.due}</p>
                  </div>
                  <strong>{item.status}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <SectionTitle
            eyebrow="Collection slots"
            title="内容合集占位"
            description="现在先用三种常见展示形式占位，后面你可以把它们演化成真实栏目。"
          />

          <div className="collection-grid">
            {collectionItems.map((item) => (
              <article className="collection-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="collection-card__body">
                  <div className="collection-card__meta">
                    <span>{item.format}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
