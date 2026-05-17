import { select, type Selection } from 'd3-selection'
import {
  layout,
  // Supranational
  unGeneralAssembly,
  euParliament,
  // North America
  usSenate,
  usHouse,
  canadaSenate,
  canadaCommons,
  // United Kingdom
  ukCommons,
  ukLords,
  // Continental Europe
  germanyBundestag,
  franceAssembly,
  spainCongress,
  italyChamber,
  polandSejm,
  // Middle East
  israelKnesset,
  iranMajlis,
  // Eastern Europe / Russia
  ukraineRada,
  russiaDuma,
  russiaFedCouncil,
  // Asia
  chinaNpc,
  type AssemblyConfig,
  type AssemblyLayout,
} from 'rep-ass-js'

interface Section {
  heading: string
  configs: AssemblyConfig[]
}

const SECTIONS: Section[] = [
  { heading: 'Supranational', configs: [unGeneralAssembly, euParliament] },
  {
    heading: 'North America',
    configs: [usSenate, usHouse, canadaSenate, canadaCommons],
  },
  { heading: 'United Kingdom', configs: [ukCommons, ukLords] },
  {
    heading: 'Continental Europe',
    configs: [
      germanyBundestag,
      franceAssembly,
      spainCongress,
      italyChamber,
      polandSejm,
    ],
  },
  { heading: 'Middle East', configs: [israelKnesset, iranMajlis] },
  {
    heading: 'Eastern Europe & Russia',
    configs: [ukraineRada, russiaDuma, russiaFedCouncil],
  },
  { heading: 'Asia', configs: [chinaNpc] },
]

const root = select<HTMLElement, unknown>('#examples')

SECTIONS.forEach((section) => {
  root
    .append('h2')
    .attr('class', 'region-heading')
    .text(section.heading)

  section.configs.forEach((config) => {
    const result = layout(config)
    const card = root.append('section').attr('class', 'assembly')

    card
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

    renderLegend(card, config)
    renderChart(card, result)
  })
})

type AnySelection = Selection<HTMLElement, unknown, HTMLElement, unknown>

function renderLegend(card: AnySelection, config: AssemblyConfig) {
  const legend = card.append('ul').attr('class', 'legend')
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

function renderChart(card: AnySelection, result: AssemblyLayout) {
  const svg = card
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
    .attr('fill', (d) => d.group?.color ?? '#3a3940')
    .attr('stroke', 'rgba(0,0,0,0.55)')
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
