import { select } from 'd3-selection'
import {
  layout,
  usSenate,
  ukCommons,
  euParliament,
  type AssemblyConfig,
  type AssemblyLayout,
} from 'rep-ass-js'

const CONFIGS: AssemblyConfig[] = [usSenate, ukCommons, euParliament]

const root = select<HTMLElement, unknown>('#examples')

CONFIGS.forEach((config) => {
  const result = layout(config)
  const section = root.append('section').attr('class', 'assembly')

  section
    .append('header')
    .attr('class', 'assembly-header')
    .html(
      `
      <div>
        <h2>${escapeHtml(config.name)}</h2>
        ${config.description ? `<p>${escapeHtml(config.description)}</p>` : ''}
      </div>
      <div class="assembly-meta">
        <span><strong>${result.seats.length}</strong> seats</span>
        <span class="muted">·</span>
        <span class="muted">${config.shape.type}</span>
      </div>
    `,
    )

  renderLegend(section, config)
  renderChart(section, result)
})

function renderLegend(
  section: ReturnType<typeof root.append>,
  config: AssemblyConfig,
) {
  const legend = section.append('ul').attr('class', 'legend')
  config.groups.forEach((g) => {
    const item = legend.append('li').attr('class', 'legend-item')
    item
      .append('span')
      .attr('class', 'swatch')
      .style('background', g.color ?? '#888')
    item
      .append('span')
      .attr('class', 'legend-label')
      .text(g.label ?? g.id)
    item.append('span').attr('class', 'legend-count').text(String(g.size))
  })
}

function renderChart(
  section: ReturnType<typeof root.append>,
  result: AssemblyLayout,
) {
  const svg = section
    .append('svg')
    .attr('class', 'assembly-svg')
    .attr('viewBox', `0 0 ${result.width} ${result.height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')

  svg
    .append('g')
    .attr('class', 'seats')
    .selectAll('circle')
    .data(result.seats)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.r)
    .attr('fill', (d) => d.group?.color ?? '#444')
    .attr('stroke', 'rgba(0,0,0,0.35)')
    .attr('stroke-width', 0.5)
    .append('title')
    .text((d) => {
      const groupLabel = d.group?.label ?? d.group?.id ?? 'Vacant'
      return `${groupLabel} — seat ${d.index + 1}`
    })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
