export interface ProjectSection {
  title: string;
  content: string | string[];
  image?: string;
  video?: string;
  icon?: string;
  layout?: 'text-only' | 'side-by-side' | 'full-image' | 'video';
  gridSpan?: number;
  bgColor?: string;
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
  heroIcon?: string;
  problem?: string;
  solution?: string;
  role?: string;
  team?: string;
  timeline?: string;
  result?: string;
  resultLabel?: string;
  outcomes?: string[];
  sections?: ProjectSection[];
  challenge?: string;
  color?: string;
  darkColor?: string;
  iconName?: string;
  template?: 'slack' | 'default';
  impact?: string;
  complexity?: string;
  context?: string;
  cardImageBg?: string;
  animatedIcon?: string;
}


export const projects: ProjectCaseStudy[] = [
  {
    id: 'conversational-insights',
    title: 'Agentic Conversational Insights',
    subtitle: 'GenAI & Data Analytics',
    description: 'An Agentic UI embedded in Merchant Center that allows users to query their data using natural language, turning raw analytics into actionable business strategy.',
    image: '/images/projects/ci-thumb.svg',
    heroImage: '/images/projects/conversational-insights/agentic-hero.png',
    iconName: 'MessageSquare',
    tags: ['AI/ML', 'Data Visualization', 'Strategy'],
    link: '/project/conversational-insights',
    color: '#dbeafe',
    darkColor: '#0f172a', /* Deep Slate Blue */
    cardImageBg: '#F3F4F6',
    animatedIcon: 'conversational-insights',
    problem: 'UTLT merchants struggle to interpret complex dashboards. I led the design of an LLM-driven assistant that parses raw analytics into natural language, allowing merchants to "query" their business performance directly.',
    role: 'Design Lead & Strategy (0→1)',
    team: 'Product Managers, LLM Engineers, Data Scientists',
    timeline: '2023 - Present',
    impact: 'Global Merchant Center Ecosystem',
    result: '80% CSAT on millions of reviews',
    resultLabel: 'Satisfaction',
    template: 'slack',
    sections: [
      {
        title: 'From Dashboard Overload to Conversational Clarity',
        content: 'UTLT merchants struggle to interpret complex dashboards. I led the design of an LLM-driven assistant that parses raw analytics into natural language, allowing merchants to "query" their business performance directly.',
        image: '/images/projects/conversational-insights/agentic-hero.png',
        layout: 'full-image'
      },
      {
        title: 'Proactive Intelligence',
        content: 'Moving beyond reactive charts. We designed "Smart Snippets" to push critical insights (e.g., "Traffic is down due to low inventory") to the user before they even ask, establishing trust in the AI model.',
        image: '/images/projects/conversational-insights/agentic-snippets.png',
        layout: 'full-image'
      },
      {
        title: 'Lowering the Barrier to Data Science',
        content: 'Enabled merchants to generate complex custom reports using simple natural language prompts, democratizing data access for non-technical business owners.',
        image: '/images/projects/conversational-insights/agentic-flow.png',
        layout: 'full-image'
      }
    ],
    challenge: 'Turning complexity into simplicity: Balancing the open-ended nature of chat with the precision required for reliable business data.'
  },
  {
    id: 'shopstream',
    title: 'GenAI Video for Merchants',
    subtitle: 'GenAI Video Pipeline',
    description: 'An AI-powered video generation tool that transforms static merchant catalogs into high-fidelity, brand-aligned video assets automatically.',
    image: '/images/projects/shopstream-thumb.svg',
    heroImage: '/images/projects/shopstream/shopstream-hero.png',
    heroIcon: 'Monitor',
    iconName: 'Video',
    tags: ['Generative AI', 'Video Design', 'UX Strategy'],
    link: '/project/shopstream',
    color: '#fdf2f8',
    darkColor: '#2d1a1a',
    cardImageBg: '#F3F4F6',
    animatedIcon: 'shopstream',
    problem: 'Small merchants lack the budget for video production. I led the UX strategy for ShopStream, a GenAI pipeline that transforms standard product photos into high-conversion video assets.',
    solution: 'An end-to-end GenAI pipeline that transforms static product images from a merchant\'s catalog into high-fidelity, brand-aligned video assets automatically.',
    role: 'Strategic Lead & Principal Designer',
    team: 'AI Research, Ads Engineering, UX',
    timeline: '2024',
    result: '150k+ Merchants',
    resultLabel: 'Scale',
    impact: '+5.4% Revenue Lift & +19% CTR',
    template: 'slack',
    sections: [
      {
        title: 'Turning Static Assets into Revenue Streams',
        content: 'Small merchants lack the budget for video production. I led the UX strategy for ShopStream, a GenAI pipeline that transforms standard product photos into high-conversion video assets.',
        image: '/images/projects/shopstream/shopstream-hero.png',
        layout: 'full-image'
      },
      {
        title: 'Zero-Friction Creation',
        content: 'Lowering the barrier to entry. Merchants simply select a product, and our model identifies the best assets to animate, removing the need for creative briefs or storyboards.',
        image: '/images/projects/shopstream/shopstream-input.png',
        layout: 'full-image'
      },
      {
        title: 'Create Once, Distribute Everywhere',
        content: 'Designed a unified ingestion engine where a single generated asset is automatically formatted and distributed across Paid Ads, Organic Search, and Social platforms.',
        image: '/images/projects/shopstream/shopstream-system.png',
        layout: 'full-image'
      }
    ],
    challenge: 'Bridging the Creative Gap: Transforming static catalogs into dynamic video without sacrificing brand quality or merchant control.'
  },
  {
    id: 'merchant-comms',
    title: 'The Communications Ecosystem',
    subtitle: 'Unified Messaging OS',
    description: 'A unified "Communication as a Service" platform standardizing consumer UX across Search and Maps while opening the ecosystem to 3rd-party integrations.',
    image: '/images/projects/bm-thumb.svg',
    heroImage: '/images/projects/merchant-comms/coco-hero.png',
    heroIcon: 'MessageSquare',
    iconName: 'MessageSquare',
    tags: ['Systems Design', 'Product Strategy', 'Scale'],
    link: '/project/merchant-comms',
    template: 'slack',
    color: '#eff6ff',
    darkColor: '#1e293b',
    cardImageBg: '#F3F4F6',
    animatedIcon: 'merchant-comms',
    problem: 'Google’s business messaging was fragmented across surfaces. A user on Maps had a different chat experience than a user on Search, and merchants were forced to use Google’s proprietary inbox, ignoring the tools they already used (Zendesk, Shopify).',
    solution: 'A unified "Communication as a Service" platform. We standardized the consumer UX across surfaces (Search, Maps) and opened the backend to third-party integrations, allowing merchants to answer Google messages from the tools they already use.',
    role: 'Lead Interaction Designer (L5)',
    timeline: '2018–2023',
    result: '18M Enabled Merchants / 9M Monthly Conversations',
    resultLabel: 'Scale',
    impact: '#1 Driver of Merchant Product Stickiness',
    complexity: 'Cross-PA (Search, Maps, Ads, Shopping)',
    sections: [
      {
        title: 'Bridging the Gap on Search',
        content: 'Designed and launched the "Mole"—a persistent, non-intrusive chat layer on Search that drove a significant increase in merchant-consumer engagement by maintaining context during the discovery phase.',
        image: '/images/projects/merchant-comms/coco-hero.png',
        layout: 'full-image'
      },
      {
        title: 'Ubiquity without Fragmentation',
        content: 'Orchestrating a unified messaging layer across different Google surfaces, ensuring that whether a user starts on Maps or Search, the experience remains consistent and high-quality.',
        image: '/images/projects/merchant-comms/coco-ecosystem.png',
        layout: 'full-image'
      },
      {
        title: 'Embracing the Open Ecosystem',
        content: 'Enabling merchants to use their existing tools like Zendesk and Shopify to manage Google conversations, moving away from a walled-garden approach to an open, scalable strategy.',
        image: '/images/projects/merchant-comms/coco-strategy.png',
        layout: 'full-image'
      }
    ],
    outcomes: [
      'Scaled the ecosystem to 18 million active merchants.',
      'Driving 9 million monthly conversations.',
      'Became the #1 driver of merchant engagement on the platform.'
    ]
  },
  {
    id: 'family-safety-platforms',
    title: 'Family Safety Platforms',
    subtitle: 'Unified Carrier Safety Suite',
    description: 'A unified safety ecosystem for 1.7M+ parents across Sprint and Verizon, consolidating location tracking, parental controls, and screen-time management.',
    image: '/images/projects/family-safety-thumb.svg',
    heroVideo: 'https://www.youtube.com/embed/1iooNY64eDU',
    heroImage: '/images/projects/family-safety-platforms/SFL – See Location History.png',
    heroIcon: 'Shield',
    iconName: 'Shield',
    tags: ['Mobile UX', 'Systems Thinking', 'Scale'],
    link: '/project/family-safety-platforms',
    color: '#fee2e2',
    darkColor: '#450a0a',
    cardImageBg: '#F3F4F6',
    animatedIcon: 'family-safety',
    problem: 'Family safety apps in 2016 were clunky, "spyware-like" utilities. Sprint\'s legacy locator was dated and losing users. Verizon saw an opportunity to build a premium, trust-based safety suite but needed to move beyond simple location tracking into digital parenting (content filters, driving safety).',
    solution: 'A complete reimagining of the family safety stack. We moved from a "tracking" mental model to a "connection" model, launching a modern iOS/Android experience that unified location, content filtering, and driving insights into a single subscription.',
    role: 'Lead Product Designer',
    context: 'Verizon Smart Family & Sprint Safe & Found',
    timeline: '2016–2018',
    result: '1.7M+ Paying Subscribers',
    resultLabel: 'Scale',
    impact: '4.5 Star App Store Rating (Rebuilt from 2.0)',
    template: 'slack',
    sections: [
      {
        title: 'Physical & Digital Safety in One Hub',
        content: 'Unifying a fragmented feature set. I architected a scalable navigation system that allowed parents to manage physical location, screen time limits, and content filters from a single, intuitive dashboard.',
        image: '/images/projects/family-safety-platforms/VSF – feature summary.jpg',
        gridSpan: 2
      },
      {
        title: 'Granular Controls',
        content: 'Digital boundaries that scale. We designed a modular filtering system that allowed parents to pause the internet or set complex scheduling with just a few taps.',
        image: '/images/projects/family-safety-platforms/VSF – content filters.jpg',
        gridSpan: 1,
        bgColor: '#eff6ff'
      },
      {
        title: 'Precision & Context',
        content: 'High-accuracy location details with human-centric labeling, ensuring parents know exactly where their family is without needing to interpret raw coordinates.',
        image: '/images/projects/family-safety-platforms/VSF – location.jpg',
        gridSpan: 1,
        bgColor: '#f0fdf4'
      },
      {
        title: 'The Unified Dashboard',
        content: 'A holistic view of the family\'s safety status, aggregating location history, battery levels, and safety alerts into a single, high-confidence interface.',
        image: '/images/projects/family-safety-platforms/VSF Entire page.png',
        gridSpan: 2
      },
      {
        title: 'Real-time Verification',
        content: 'The core utility: instant location refreshes for immediate peace of mind, optimized for battery efficiency and high-speed retrieval.',
        image: '/images/projects/family-safety-platforms/SFL – Locate.png',
        gridSpan: 1,
        bgColor: '#fff1f2'
      },
      {
        title: 'Humanizing Surveillance',
        content: 'Location tracking is inherently sensitive. I redesigned the core experience to focus on connection ("Is she safe?") rather than policing ("Where is she?"), resulting in a massive shift in user sentiment and adoption.',
        image: '/images/projects/family-safety-platforms/SFL – See Location History.png',
        gridSpan: 1,
        bgColor: '#f5f5f5'
      },
      {
        title: 'Proactive Peace of Mind',
        content: 'Reducing anxiety through automation. We designed "Safety Checks" to notify parents automatically when kids arrive at key locations (School, Home), reducing the cognitive load of constantly checking the map.',
        image: '/images/projects/family-safety-platforms/SFL – Safety Checks.webp',
        gridSpan: 1,
        bgColor: '#fff7ed'
      }
    ],
    challenge: 'Managing massive technical debt and legacy backend systems while delivering a modern, high-confidence user experience that parents trust.'
  },
];
