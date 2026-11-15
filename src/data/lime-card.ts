import type { ProjectCaseStudy } from './projects'

// The homepage card and page metadata for the Lime case study. Kept apart
// from the case study's content (lime.ts) so that content only downloads
// with the page itself. The whole case study sits behind the `lime` preview
// flag (src/utils/flags.ts).
export const LIME_PATH = '/project/lime-support-agent'

export const limeCard: ProjectCaseStudy = {
  id: 'lime-support-agent',
  title: 'A Support Agent Riders Can Check',
  subtitle: 'Agentic Support · Lime',
  description:
    'Rebuilding Lime’s text-only support chat as an agent that starts from the trip, shows its work while the rider waits, and ends in a card the rider can check.',
  image: '',
  tags: ['AI/ML', 'Agentic UX', 'Prototyping'],
  link: LIME_PATH,
  ditherConfig: {
    idleShape: 'wave',
    iconShape: 'location-pin',
    particleCount: 2400,
    hoverColor: '#0a7a1f',
  },
}
