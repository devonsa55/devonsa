export interface ProjectSection {
  title: string;
  content: string | string[];
  image?: string;
  video?: string;
  icon?: string;
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
    id: 'shopstream',
    title: 'ShopStream',
    subtitle: 'GenAI Video Pipeline',
    description: 'An AI-powered video generation tool that transforms static merchant catalogs into high-fidelity, brand-aligned video assets automatically.',
    image: '',
    heroIcon: 'Monitor',
    iconName: 'Video',
    tags: ['Generative AI', 'Video Design', 'UX Strategy'],
    link: '/project/shopstream',
    color: '#fdf2f8',
    darkColor: '#2d1a1a',
    problem: 'Video ads convert 60% better than static images, but 69% of small businesses lack the time, budget, or expertise to produce them. They were getting left behind in the shift to video-first platforms like YouTube Shorts and TikTok.',
    solution: 'An end-to-end GenAI pipeline that transforms static product images from a merchant\'s catalog into high-fidelity, brand-aligned video assets automatically.',
    role: 'Lead Product Designer & Strategy',
    team: 'AI Research, Ads Engineering, UX',
    timeline: '2024',
    result: 'Double-digit Ad Revenue Uplift',
    outcomes: [
      'Early experiments showed double-digit increases in Click-Through-Conversion (CTC).',
      'Significant uplifts in Ad Revenue for merchants using ShopStream video assets.',
      'Powering >80% of PMax GenAI video revenue.'
    ],
    sections: [
      {
        title: 'The Market Gap',
        content: 'Video content is the future of commerce, but it\'s prohibitively expensive for most small businesses. We set out to close this "Creative Gap" by automating the production of high-quality video assets.',
        icon: 'TrendingUp',
        layout: 'side-by-side'
      },
      {
        title: 'The ShopStream Engine',
        content: 'Under the hood, our pipeline handles Signal Collection, Generation, and Serving. We simplified a complex technical workflow into a clean design system that focuses on input-to-output efficiency.',
        icon: 'Cpu',
        layout: 'side-by-side'
      },
      {
        title: 'Integrated Creation Workflow',
        content: 'Instead of a standalone tool, we piloted ShopStream as a native experience inside Shopify and Merchant Center, meeting users where they already manage their business.',
        icon: 'Wrench',
        layout: 'side-by-side'
      },
      {
        title: 'Multichannel Distribution',
        content: 'The generated assets are designed to live natively on YouTube Shorts, Discover, and Gmail, ensuring brand-aligned quality across all major Google surfaces.',
        icon: 'Youtube',
        layout: 'side-by-side'
      },
      {
        title: 'Business Impact',
        content: 'Early experiments showed double-digit increases in Click-Through-Conversion (CTC) and significant uplifts in Ad Revenue for merchants using ShopStream video assets.',
        icon: 'Zap',
        layout: 'text-only'
      }
    ],
    challenge: 'Bridging the Creative Gap: Transforming static catalogs into dynamic video without sacrificing brand quality or merchant control.'
  },
  {
    id: 'merchant-comms',
    title: 'Merchant Comms Platform',
    subtitle: 'Unified Messaging OS',
    description: 'A unified "Communication as a Service" platform standardizing consumer UX across Search and Maps while opening the ecosystem to 3rd-party integrations.',
    image: '',
    heroIcon: 'MessageSquare',
    iconName: 'MessageSquare',
    tags: ['Systems Design', 'Product Strategy', 'Scale'],
    link: '/project/merchant-comms',
    color: '#eff6ff',
    darkColor: '#1e293b',
    problem: 'Google’s business messaging was fragmented across surfaces. A user on Maps had a different chat experience than a user on Search, and merchants were forced to use Google’s proprietary inbox, ignoring the tools they already used (Zendesk, Shopify).',
    solution: 'A unified "Communication as a Service" platform. We standardized the consumer UX across surfaces (Search, Maps) and opened the backend to third-party integrations, allowing merchants to answer Google messages from the tools they already use.',
    role: 'Lead Product Designer',
    team: 'Maps, Search, Merchant Center',
    timeline: '2018–2023',
    result: '18M+ Merchants / 9M+ Conversations',
    resultLabel: 'Scale',
    outcomes: [
      'Scaled the ecosystem to 18 million active merchants.',
      'Driving 9 million monthly conversations.',
      'Became the #1 driver of merchant engagement on the platform.'
    ],
    sections: [
      {
        title: 'The "Spaghetti" Problem',
        content: 'Our client strategy was confusing and fragmented across Android, iOS, and Web. Standardizing this was the first step toward a coherent platform architecture.',
        icon: 'Share2',
        layout: 'side-by-side'
      },
      {
        title: 'Introducing the "Mole"',
        content: 'A persistent, non-intrusive chat window on Desktop Search that maintained context while users browsed, bridging the gap between discovery and conversation.',
        icon: 'Monitor',
        layout: 'side-by-side'
      },
      {
        title: 'The Strategic Pivot',
        content: 'Instead of a walled garden, we enabled 3rd-party integrations with tools like Zendesk and Shopify, meeting merchants where they already work.',
        icon: 'Store',
        layout: 'side-by-side'
      },
      {
        title: 'Multichannel Adaptation',
        content: 'Ensuring a consistent experience across different entry points—from local inventory on Maps to support queries on Search—at a global scale.',
        icon: 'Smartphone',
        layout: 'side-by-side'
      },
      {
        title: 'Systemic Impact',
        content: 'By unifying the communication stack, we unlocked massive scale, reaching 18M merchants and driving engagement as the platform\'s primary interaction channel.',
        icon: 'TrendingUp',
        layout: 'text-only'
      }
    ],
    challenge: 'Unifying a multi-surface ecosystem into a single, scalable platform that works for both global enterprises and small local businesses.'
  },
  {
    id: 'family-safety-platforms',
    title: 'Family Safety Platforms',
    subtitle: 'Unified Carrier Safety Suite',
    description: 'A unified safety ecosystem for 1.7M+ parents across Sprint and Verizon, consolidating location tracking, parental controls, and screen-time management.',
    image: '',
    heroIcon: 'Shield',
    iconName: 'Shield',
    tags: ['Mobile UX', 'Systems Thinking', 'Scale'],
    link: '/project/family-safety-platforms',
    color: '#fee2e2',
    darkColor: '#450a0a',
    problem: 'Family safety apps in 2016 were clunky, "spyware-like" utilities. Sprint\'s legacy locator was dated and losing users. Verizon saw an opportunity to build a premium, trust-based safety suite but needed to move beyond simple location tracking into digital parenting (content filters, driving safety).',
    solution: 'A complete reimagining of the family safety stack. We moved from a "tracking" mental model to a "connection" model, launching a modern iOS/Android experience that unified location, content filtering, and driving insights into a single subscription.',
    role: 'Lead Product Designer',
    team: 'Verizon & Sprint Cross-functional Teams',
    timeline: '2016–2018',
    result: '1.7M+ Paying Subscribers / 4.5+ Star Rating',
    resultLabel: 'Scale',
    outcomes: [
      'Successfully launched to 1.7M active users across two major US carriers.',
      'Achieved a 4.5+ Star Rating (up from 2.5 stars on the legacy app).',
      'Unified location and parental controls into a single UX framework.',
      'Secured long-term carrier contracts through a modernized future vision.'
    ],
    sections: [
      {
        title: 'The "Evolution"',
        content: 'From legacy utility to modern subscription service. We transitioned the mental model from "pins on a map" to "family members in context," humanizing the data points through avatars and intuitive status updates.',
        icon: 'RefreshCcw',
        layout: 'side-by-side'
      },
      {
        title: 'The "Messy" Reality',
        content: 'User interviews revealed that parents felt guilty "spying" on their kids. We needed to pivot to "safety and connection," addressing the high cognitive load and dated navigation of the legacy Sprint experience.',
        icon: 'CircleAlert',
        layout: 'side-by-side'
      },
      {
        title: 'Humanizing Location Data',
        content: 'Moving beyond simple coordinates, we focused on "Bubbles" and avatars. This key design decision helped reframe the app as a tool for coordination and peace of mind rather than just surveillance.',
        icon: 'Map',
        layout: 'side-by-side'
      },
      {
        title: 'The Digital Parenting Suite',
        content: 'It wasn\'t just a map; it was a comprehensive system for managing digital life. We unified content filters, driving scores, and "Pause Internet" features into a single, cohesive subscription experience.',
        icon: 'LayoutGrid',
        layout: 'side-by-side'
      },
      {
        title: 'Systems & Craft',
        content: 'To ensure consistency across the massive family of apps, we built a comprehensive component library and iconography set, proving that premium design can exist within complex carrier frameworks.',
        icon: 'Palette',
        layout: 'side-by-side'
      },
      {
        title: 'High-Scale Impact',
        content: 'The results spoke for themselves: a jump from 2.5 to 4.5 stars and 1.7M+ paying subscribers. "Finally an app that doesn\'t make me feel like a jailer," noted one user review.',
        icon: 'Star',
        layout: 'text-only'
      }
    ],
    challenge: 'Managing massive technical debt and legacy backend systems while delivering a modern, high-confidence user experience that parents trust.'
  }
];
