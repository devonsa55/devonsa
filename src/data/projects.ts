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
}

import { getAssetPath } from '../utils/assets';

export const projects: ProjectCaseStudy[] = [
  {
    id: 'google',
    title: 'Google',
    subtitle: 'Confidential / Under NDA',
    description: 'Lead UX designer for a stealth AI-native hardware MVP project.',
    image: getAssetPath('/images/projects/google.svg'),
    tags: ['AI/ML', 'Hardware', 'Prototyping'],
    link: '/project/google',
    color: '#dbeafe',
    darkColor: '#0f172a', /* Deep Slate Blue */
    problem: 'How might we leverage generative AI to create a hardware device that feels intuitive and helpful without being intrusive?',
    role: 'Lead UX Designer',
    team: 'Product Managers, ML Engineers, Industrial Designers, Prototyping Engineers',
    timeline: '2023 - Present',
    outcomes: [
      'Led the end-to-end design of a novel hardware-software interface.',
      'Developed high-fidelity prototypes for internal executive reviews.',
      'Established core interaction patterns for AI-native multimodal inputs.'
    ],
    sections: [
      {
        title: 'The Mission',
        content: 'Working within a specialized innovation lab at Google, my role is to explore the intersection of generative AI and ambient hardware. We are building an MVP that challenges traditional screen-based interaction models.',
        layout: 'text-only'
      },
      {
        title: 'Conversational Insights',
        content: 'I developed a comprehensive design framework for "Conversational Insights," which was used to align directors and the broader organization on strategy and core hypotheses for AI-driven storytelling.',
        layout: 'text-only'
      },
      {
        title: '2024 Vision',
        content: 'Led the end-of-year vision work to define the 2024 roadmap, utilizing mid-fidelity storytelling and interactive strategy decks to align stakeholders across product and engineering.',
        layout: 'text-only'
      }
    ],
    challenge: 'Defining a new design language for AI that moves beyond chat-based interfaces into physical environments.'
  },
  {
    id: 'verizon-smart-family',
    title: 'Verizon Smart Family',
    subtitle: 'Helping 1.7M+ parents feel confident raising kids in the digital world.',
    description: 'Locate kids anytime, get insights into device usage, and block inappropriate apps and websites.',
    image: getAssetPath('/Verizon+Smart+Family+Header+Copy.jpeg'),
    tags: ['UX Design', 'iOS', 'Android'],
    link: '/project/verizon-smart-family',
    color: '#fee2e2',
    darkColor: '#450a0a', /* Deep Ruby Red */
    heroImage: getAssetPath('/Verizon+Smart+Family+Header+Copy.jpeg'),
    heroVideo: 'https://www.youtube.com/embed/0TITnVJdJfk',
    problem: 'In Q2 of 2016, the company was on an unsustainable trajectory supporting two aging platforms—one that offers parental controls and another that lets parents locate their family. Both were stagnant and facing robust competition. Verizon Smart Family was a chance to breathe new life into our products with original research, improved design thinking, and a modernized UI to win renewed carrier contracts and build the app for families.',
    role: 'Designer facilitating a 45-person cross-functional team performing needfinding, IA, wireframing, UI, prototyping, usability, copywriting, and product roadmap prioritization.',
    team: '45-person cross-functional team (Product, Engineering, Design).',
    timeline: 'Approx. 2 years (Launched May 18th, 2018).',
    outcomes: [
      '40%+ increase in DAUs compared to legacy products',
      'Positive press from The Verge, Engadget, and Mac Rumors',
      'Successfully unified parental controls and location into one app',
      'Established a new B&W brand language for Verizon\'s family products'
    ],
    sections: [
      {
        title: 'Users are the experts',
        content: 'We interviewed 15+ parents and distilled their most important concerns: Inappropriate content (limiting exposure then targeting specific concerns), Screen time (teaching balance), and Location (growing importance as kids gain independence).',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1525841107579-ZA7OUXIZL7NAB15YTUYS/Ring+Prioritization.png',
        layout: 'side-by-side'
      },
      {
        title: 'Design Principles',
        content: [
          'Deliver proactive value: Push insights, not just data parents have to sort through.',
          'Be action oriented: Allow parents to take immediate action so they feel like they are being good parents.',
          'Evolve with the family: Solutions must adapt as kid grows up and ownership changes.',
          'Minimal behavior change: Fit into the natural flow of what they are already doing.'
        ],
        layout: 'text-only'
      },
      {
        title: 'Building a UI',
        content: 'We focused on status for what\'s most important (pausing internet, location answers), highlights for "snacking" behaviors (Insights from our intelligence lab), and controls for "set it and trust it" features.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1524336644814-HR95XLUI91G5ZQ25G8T3/VZ+Ring+UI+GIf+high.gif',
        layout: 'side-by-side'
      },
      {
        title: 'The Outcome',
        content: 'The app launched on May 18th, 2018, resulting in a 40%+ increase in DAUs compared to the legacy product it replaced. The launch received positive coverage from The Verge, Engadget, and Mac Rumors, successfully unifying parental controls and location into a single, cohesive experience.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1525193796262-8I11Z1TXJW9E7MJU882Y/Verizon+Scale.png',
        layout: 'side-by-side'
      }
    ],
    challenge: 'Status section & pause internet—being the most valuable real estate, we were concerned about the placement of the pause button and potential confusion with pausing location.'
  },
  {
    id: 'sprint-family-locator',
    title: 'Sprint Family Locator',
    subtitle: 'Achieving peace of mind for the people that matter most.',
    description: 'Redesigning a tier-1 carrier service to compete with emerging technologies for Sprint, AT&T and T-Mobile.',
    image: getAssetPath('/assets/sfl_hero.png'),
    tags: ['Mobile Web', 'UI Design'],
    link: '/project/sprint-family-locator',
    color: '#fef3c7',
    darkColor: '#422006', /* Deep Amber/Brown */
    heroImage: getAssetPath('/assets/sfl_hero.png'),
    problem: 'Family Locator is a tier-1 carrier family location service. In 2017, we needed to redesign our platform to compete with emerging technologies and shifting consumer expectations for Sprint, AT&T and T-Mobile.',
    role: 'Lead designer on a 25-person team performing needfinding, roadmap prioritization, wireframing, UI, prototyping, and usability testing.',
    team: '25-person cross-functional team (Product, Mobile Intel Lab, Design).',
    timeline: 'Approx. 1 year',
    outcomes: [
      'Led the vision for an aggressive redesign that became the backbone of a 2-year roadmap',
      'Unified empathy across teams through persona-based journey mapping',
      'Foundations fed directly into the Verizon Smart Family product success',
      'Learned that simplified solutions achieve faster time-to-market and learning'
    ],
    sections: [
      {
        title: 'Know thy user',
        content: 'We categorized parents into "Schedulers", "Controllers" and "Just-in-case" users. We found parents didn\'t mind kids seeing their location, and kids were okay with being located if framed as a safety tool.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1524437824482-6C38RBC4T1MEQXGNXNWA/Locator+Persona+%E2%80%93+Worried+Protector+Copy.png',
        layout: 'side-by-side'
      },
      {
        title: 'Design Principles',
        content: [
          'Contextual: Offer stories instead of tools (e.g. "Curfew" instead of "Geofences").',
          'Robust: Feel deep and powerful with clear categories of value.',
          'Extensible: Build a modular UI model that supports future roadmap use cases.',
          'Focus on first week: Optimize onboarding to prevent the 80% drop-off typical after sign up.'
        ],
        layout: 'text-only'
      },
      {
        title: 'Prototyping & Communication',
        content: 'We use multiple fidelity levels to validate concepts with existing Sprint customers, asking them to describe the app to a friend as a value proxy for whether they understood the product\'s utility.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1523594846651-MIW7ZOUGJDX97QWSAVJA/Loc2+Gif.gif',
        layout: 'side-by-side'
      },
      {
        title: 'The Pivot',
        content: 'While this specific version never hit the market due to shifting executive priorities at Sprint, the foundations and design systems we built were directly integrated into the successful revamp of Verizon Smart Family, which now serves 1.7M+ subscribers.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1525193827308-36K84D681S43625E6NZ6/Sprint+Scale.png',
        layout: 'side-by-side'
      }
    ],
    challenge: 'Technical tension between lower-accuracy network locates (no app required) and high-accuracy GPS locates (app required)—how to communicate this difference without causing confusion or a sense of "missing out".'
  },
  {
    id: 'bivona-lab',
    title: 'Bivona Lab',
    subtitle: 'Building a better gateway to elite talent.',
    description: 'Branding and web design for a world-class biology laboratory at UCSF.',
    image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1524439845311-NCQZ2KUA8QKA11QSVWQJ/BivonaLab_HeaderBackground_big.png',
    tags: ['UX Research', 'Branding', 'Web Design'],
    link: '/project/bivona-lab',
    color: '#ccfbf1',
    darkColor: '#042f2e', /* Deep Forest Teal */
    heroImage: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1524439845311-NCQZ2KUA8QKA11QSVWQJ/BivonaLab_HeaderBackground_big.png',
    problem: 'The Bivona Lab at UCSF is a world-class biology laboratory using precision medicine to solve cancer. I designed a brand that reflects the quality of their work and built a more inviting website to help recruit the very best talent from around the globe.',
    role: 'Sole Designer & Photographer; facilitated needfinding, IA, wireframing, UI, prototyping, and website development.',
    team: 'Dr. Bivona and Lab Team',
    timeline: 'Approx. 4 Weeks',
    outcomes: [
      'Established a premium brand identity reflecting precision medicine',
      'Redesigned the website to be more inviting and recruitment-focused',
      'Captured all original photography for the site',
      'Improved candidate conversion and talent acquisition'
    ],
    sections: [
      {
        title: 'Audience and Goals',
        content: 'I collaborated with Dr. Bivona and his team through focused design exercises to define the website\'s goals and key personality traits to convey to prospective students. This ensured the site spoke directly to elite scientific talent. (Bonus: I also captured all the lab photography to ensure visual consistency).',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1473034170544-9NZW6I2JSZ8KYV2LEIP4/image-asset.jpeg',
        layout: 'side-by-side'
      },
      {
        title: 'Logo and Branding',
        content: 'The team wanted a logomark that evoked precision medicine and sophisticated lab techniques. The resulting mark represents both the target (cell) and the precision (scope) of their groundbreaking cancer research.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1473113982885-3VECHB8PQJY0BO36VMXU/Bivona+Lab+logo+B.W.png',
        layout: 'side-by-side'
      },
      {
        title: 'The Outcome',
        content: 'With a fresh brand identity and authentic photography, the Bivona Lab successfully repositioned itself to attract the next generation of elite researchers, moving from a standard scientific site to a premium digital home.',
        image: 'https://images.squarespace-cdn.com/content/v1/535973a1e4b0fde6329381a5/1473034094100-1ZK4FW1SLCU9DEQ0GAY4/image-asset.png',
        layout: 'side-by-side'
      }
    ],
    challenge: 'Summarizing complex precision medicine research into a simple, compelling visual narrative that appeals to elite scientific talent without losing scientific credibility.'
  }
];
