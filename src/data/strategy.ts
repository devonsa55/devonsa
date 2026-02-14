import { ProjectCaseStudy } from './projects';

export interface StrategyItem extends ProjectCaseStudy {
    layout?: 'case-study' | 'paper';
    heroImageAttribution?: {
        name: string;
        link: string;
    };
    deckEmbed?: string;
    processLink?: {
        label: string;
        url: string;
    };
}

export const strategyFrameworks: StrategyItem[] = [
    {
        id: 'designing-for-trust',
        title: 'The Architecture of Autonomy: Scaling Execution in the Age of AI',
        subtitle: '',
        description: 'Translating high-level agentic mandates into defensible, traceable product roadmaps.',
        image: '/assets/ascend.png',
        iconName: 'Fingerprint',
        tags: ['AI Strategy', 'Trust', 'Framework'],
        link: '/strategy/designing-for-trust',
        layout: 'paper',
        deckEmbed: 'https://docs.google.com/presentation/d/e/2PACX-1vRvkv-tHQYZHpDLY5J3uKWzqbil6UggQeRqpMiC0amVWXMdyahSBUH-FCKD09FpODS0qCxThFb4N6Lt/pubembed?start=false&loop=false&delayms=3000',
        problem: 'How do we build trust when AI models are inherently probabilistic and prone to hallucinations?',
        role: 'Lead UX Strategist',
        team: 'AI Research, UX, Policy',
        timeline: '2023 - 2024',
        outcomes: [
            'Decreased user anxiety around AI outputs by 30%.',
            'Standardized hallucination labeling across Google Search.',
            'Proposed "calibrated trust" as a core design principle.'
        ],
        sections: [
            {
                title: 'Helpfulness vs. Accuracy',
                content: 'The core tension in LLMs is that a helpful answer is not always an accurate one. This framework helps designers navigate that edge.',
                layout: 'text-only'
            }
        ],
        challenge: 'Balancing conservative safety guardrails with the "magic" of creative generation.'
    },
    {
        id: 'managing-complexity',
        title: 'Managing Complexity',
        subtitle: 'Designing Against the Headwind: A Framework for Operational Clarity',
        description: 'Aligning incentives across Maps, Search, and Ads to build cohesive platform experiences.',
        image: '/assets/complexity_header.png',
        iconName: 'GitMerge',
        tags: ['Product Strategy', 'Alignment', 'Scale'],
        link: '/strategy/managing-complexity',
        layout: 'paper',
        heroImage: '/assets/complexity_header.png',
        heroImageAttribution: {
            name: 'Labyrinth',
            link: 'https://dribbble.com/shots/14980597-Abstract-geometrical-labyrinth-pattern'
        },
        problem: 'Disparate team goals leading to fragmented user journeys across Google entry points.',
        role: 'UX Strategy Lead',
        team: 'Search & Maps Cross-functional Leaders',
        timeline: '2021 - 2023',
        outcomes: [
            'Unified merchant onboarding experience across 3 major surfaces.',
            'Established a shared incentive map for cross-team collaboration.',
            'Reduced merchant support tickets by 15% through design alignment.'
        ],
        sections: [
            {
                title: 'The Physics of "Coordination Headwind"',
                content: 'At a certain scale, shipping product ceases to be a design challenge and becomes a physics problem. We often label the feeling of resistance in large organizations as "bureaucracy" or "politics," but there is a more precise term for it: Coordination Headwind.\n\nThe math behind this is brutal but consistent: the probability of a project’s success drops exponentially with every additional collaborator required to move it forward.\n\nWhen you are working across multiple platform teams, privacy reviews, and legacy infrastructure groups, that probability approaches zero. This isn\'t a "people problem." It isn\'t a failure of culture. It is simply the physics of large-scale systems. The mistake most teams make is trying to solve this through charisma or more meetings. You cannot "charm" your way through exponential math. You have to engineer your way out of it.',
                layout: 'text-only'
            },
            {
                title: 'The Solution: Managing Constraints, Not Opinions',
                content: 'As a Staff Product Designer, my primary responsibility shifts from designing screens to designing the environment in which decisions are made. When complexity is high, the "User Goal" often gets cannibalized by the "Business Goal" or the "Technical Constraint.\"\n\nTo combat this, I shifted our team’s operating model from seeking alignment in meetings to tracking alignment in shared artifacts.\n\nWe needed a system that decoupled these tensions. I implemented a centralized documentation strategy that explicitly separates the user narrative from the organizational requirements. By documenting assumptions and constraints (e.g., "Must launch in Q3," "No new components") upfront, we stop debating constraints as if they were design choices. We treat them as boundary conditions. This creates a psychological safety net: the team knows exactly where the walls are, so they can run fast within them.',
                layout: 'text-only'
            },
            {
                title: 'The Framework: The Feature Alignment Matrix',
                content: 'The engine of this strategy is the "Feature Alignment Matrix."\n\nIn complex organizations, "approval" is rarely a single moment; it is a fragmented series of gates. I replaced our vague status updates with a rigorous stakeholder mapping system. We track every necessary cross-functional partner—from the Platform Team to specific Engineering leads—against a granular set of statuses.\n\nWe moved away from binary "Approved/Not Approved" states. Instead, we use specific indicators like "Concepting," "WIP," "Awaiting Crit," or "Blocked."\n\nThis transparency is weaponized clarity. It forces Cross-Functional partners to confront the reality of the project status. There is no ambiguity about why a feature is stalled. If a specific stakeholder has an action item to unblock the design, it is visible on the board. It turns "I think we\'re waiting on approvals" into "We are blocked by [Specific Team] until [Specific Date]."',
                layout: 'text-only'
            },
            {
                title: 'The Takeaway',
                content: 'Structure is often vilified in creative disciplines as a hindrance to speed. My experience suggests the opposite.\n\nWhen you fail to manage the "Coordination Headwind," your designers spend 80% of their energy on logistics and 20% on the user. By operationalizing the complexity—by building a scaffold that handles the weight of coordination—we buy back the team’s mental bandwidth.\n\nProcess doesn\'t stifle creativity. Rigorous process protects the space required for creativity to survive in a complex environment.',
                layout: 'text-only'
            }
        ],
        challenge: 'Facilitating consensus among high-level leadership with competing organizational priorities.'
    }
];
