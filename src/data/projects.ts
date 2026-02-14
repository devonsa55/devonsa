export interface ProjectSection {
  title: string;
  content: string | string[];
  image?: string;
  video?: string;
  layout?: 'text-only' | 'side-by-side' | 'full-image' | 'video';
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description?: string; // Short description for cards
  image: string; // Card image
  tags: string[];
  link: string;
  heroImage?: string;
  heroVideo?: string;
  problem?: string;
  role?: string;
  team?: string;
  timeline?: string;
  outcomes?: string[];
  sections?: ProjectSection[];
  challenge?: string;
  color?: string;
  darkColor?: string;
  iconName?: string;
}


export const projects: ProjectCaseStudy[] = [
  {
    id: 'conversational-insights',
    title: 'Conversational Insights',
    subtitle: 'GenAI & Data Analytics',
    description: 'An Agentic UI embedded in Merchant Center that allows users to query their data using natural language, turning raw analytics into actionable business strategy.',
    image: '',
    heroImage: 'placeholder-hero.png', // Placeholder for Visual A
    iconName: 'MessageSquare',
    tags: ['AI/ML', 'Data Visualization', 'Strategy'],
    link: '/project/conversational-insights',
    color: '#dbeafe',
    darkColor: '#0f172a', /* Deep Slate Blue */
    problem: 'Small business owners are overwhelmed by data dashboards. They want to know "How am I doing?" and "What should I do next?" but lack the time to analyze complex charts.',
    role: 'Lead Product Designer',
    team: 'Product Managers, LLM Engineers, Data Scientists',
    timeline: '2023 - Present',
    outcomes: [
      'Shipped to Global Beta',
      'High engagement in pilot tests',
      'Reduced time-to-insight for complex queries',
      'Established organization-wide strategy for conversational AI patterns.'
    ],
    sections: [
      {
        title: 'The Problem',
        content: 'Merchants today struggle with overloaded dashboards. They often "don\'t always understand the information" presented in static reports, creating a gap between data availability and business action.',
        image: 'placeholder-problem.png', // Placeholder for Visual B
        layout: 'side-by-side'
      },
      {
        title: '3 Pillars of Personalized Insights',
        content: 'To solve this, we proposed three distinct levels of AI intervention: Smart Snippets for quick wins, Smart Reports for trend analysis, and a Performance Assistant for deep, open-ended exploration.',
        image: 'placeholder-strategy.png', // Placeholder for Visual C
        layout: 'side-by-side'
      },
      {
        title: 'Smart Snippets',
        content: 'AI-generated summaries pushed proactive insights to users who didn\'t know what to ask. This lowered the floor for data literacy by highlighting what matters most in a single sentence.',
        image: 'placeholder-snippets.png', // Placeholder for Visual D
        layout: 'full-image'
      },
      {
        title: 'The Deep Dive: Performance Assistant',
        content: 'For deeper questions, the conversational interface adapts to the merchant\'s level of data literacy, allowing for a progressive disclosure of complexity as the user drills into specific metrics.',
        image: 'placeholder-chat.png', // Placeholder for Visual E
        layout: 'side-by-side'
      },
      {
        title: 'Trust & Hallucination Framework',
        content: 'To ensure reliability, we developed a comprehensive evaluation framework that categorized AI outputs by helpfulness vs. hallucination risk, providing a technical baseline for design decisions.',
        image: 'placeholder-trust.png', // Placeholder for Visual F
        layout: 'full-image'
      }
    ],
    challenge: 'Turning complexity into simplicity: Balancing the open-ended nature of chat with the precision required for reliable business data.'
  },
  {
    id: 'merchant-comms-platform',
    title: 'Merchant Comms Platform',
    subtitle: 'Google Search & Maps (2018–2023)',
    description: 'Leading the UX strategy to unify 18M+ merchants and 9M monthly conversations across Google’s core surfaces.',
    image: '',
    iconName: 'Store',
    tags: ['Product Strategy', 'Scalable Systems', 'B2B'],
    link: '/project/merchant-comms-platform',
    color: '#f0f9ff',
    darkColor: '#0c4a6e',
    problem: 'How might we simplify communications for millions of merchants across different Google entry points?',
    role: 'Lead UX Strategist',
    team: 'Search, Maps, and Comms Teams',
    timeline: '2018 - 2023',
    outcomes: [
      'Unified 18M+ merchants under a single communications framework.',
      'Designed the Zendesk integration strategy for high-volume support.',
      'Reduced fragmentation across Search and Maps merchant interfaces.'
    ],
    sections: [
      {
        title: 'Platform Vision',
        content: 'I led the design of "the Mole" - a desktop-first chat experience that allowed merchants to manage customer interactions directly from Search results.',
        layout: 'text-only'
      }
    ],
    challenge: 'Aligning heterogeneous teams across Google to adopt a unified messaging API and UI framework.'
  },
  {
    id: 'shopstream',
    title: 'ShopStream',
    subtitle: 'Generative Video',
    description: 'Empowering merchants to create professional-quality video assets using AI-powered generation tools.',
    image: '',
    iconName: 'Video',
    tags: ['Generative AI', 'Video', 'Creation Tools'],
    link: '/project/shopstream',
    color: '#fdf2f8',
    darkColor: '#450a0a',
    problem: 'Creating video content is expensive and time-consuming for small businesses.',
    role: 'Senior Product Designer',
    team: 'AI Research, Engineering, Product',
    timeline: '2024 - Present',
    outcomes: [
      'Driven +$5.2M in incremental revenue through AI video tools.',
      'Powering >80% of PMax GenAI video revenue.',
      'Simplified the video creation funnel from hours to seconds.'
    ],
    sections: [
      {
        title: 'Video Generation',
        content: 'ShopStream allows merchants to generate high-quality video ads from simple text prompts or product URLs, democratizing access to high-production value marketing.',
        layout: 'text-only'
      }
    ],
    challenge: 'Ensuring brand consistency and quality in fully automated video generation pipelines.'
  },
  {
    id: 'family-safety-platforms',
    title: 'Family Safety Platforms',
    subtitle: 'Sprint + Verizon (2016–2018)',
    description: 'Leading the end-to-end design for a suite of family location and safety tools serving 1.7M+ active users.',
    image: '',
    iconName: 'Shield',
    tags: ['Mobile UX', 'Product Strategy', 'Ecosystem'],
    link: '/project/family-safety-platforms',
    color: '#fee2e2',
    darkColor: '#450a0a',
    problem: 'How might we unify disparate safety services into a cohesive ecosystem that parents trust?',
    role: 'Lead UX Designer',
    team: 'Verizon & Sprint Cross-functional Teams',
    timeline: '2016 - 2018',
    outcomes: [
      'Successfully launched across two major US carriers.',
      'Unified location and parental controls into a single UX framework.',
      'Grew active user base to 1.7M+.'
    ],
    sections: [
      {
        title: 'Ecosystem Thinking',
        content: 'I led the design strategy to move beyond siloed apps towards a safety ecosystem that scales with the family\'s needs as children grow.',
        layout: 'text-only'
      }
    ],
    challenge: 'Managing technical debt and legacy systems while delivering a modern, premium user experience.'
  }
];
