import { getAssetPath } from '../utils/assets';

export const aboutData = {
  name: "Devon",
  fullName: "Devon Anderson",
  profileImage: getAssetPath('/assets/avatar-svg.svg'),
  headline: "Hey, I’m Devon. ",
  subHeadline: "I bridge the gap between abstract strategy & concrete pixels. Guided by a background in **Philosophy & Environmental Science**, I design from **first principles**—stripping away complexity to build **Agentic AI & Communication systems** that scale to millions of users.",
  work: [
    {
      title: "GenAI for Commerce",
      body: "Leading design for ShopStream and Conversational Insights, leveraging LLMs to help merchants create video assets and understand business data.",
      highlight: ">$5.2M PMax revenue impact in 2024."
    },
    {
      title: "Platform Scale",
      body: "Previously drove the end-to-end UX for Merchant Communications (Maps & Shopping), bringing messaging features to 13M+ users.",
      context: "Scaled from a localized pilot to a global platform."
    }
  ],
  philosophy: "My background is in Philosophy (UC Santa Cruz). I apply that rigor to design—stripping complex problems down to their 'First Principles' to build simple, elegant solutions.",
  hobbies: [
    {
      title: "Surfing",
      description: "Catching breaks at home in Honolulu or traveling to Nicaragua.",
      image: getAssetPath('/images/Carosel_images/IMG_1920.jpg')
    },
    {
      title: "Building",
      description: "Converted my Honda Element into a custom camper—focused on the craft of 'making'.",
      image: getAssetPath('/images/Carosel_images/IMG_3247.jpg')
    },
    {
      title: "Competition",
      description: "National & World Champion Ultimate Frisbee player with Revolver; emphasizing elite teamwork.",
      image: getAssetPath('/images/Carosel_images/IMG_7630.jpg')
    },
    {
      title: "Adventure",
      description: "Exploring new places and experiences.",
      image: getAssetPath('/images/Carosel_images/A9322471-1E24-444C-9209-B0A2FFDBD4DE.jpg')
    },
    {
      title: "Nature",
      description: "Connecting with the outdoors.",
      image: getAssetPath('/images/Carosel_images/IMG_3205.jpg')
    },

  ],
  timeline: [
    {
      company: "Google",
      logo: getAssetPath('/assets/google-logo.png'),
      duration: "2018 — Present",
      promotionBadge: "Promoted twice: L3 → L5",
      roles: [
        {
          title: "Lead UX Designer",
          year: "Apr 2022 — Present",
          location: "Honolulu, Hawaii · Remote",
          summary: "Currently leading 0→1 design strategy for **Generative AI initiatives**, specializing in AI agent workflows and predictive, adaptive user interfaces.",
          description: [
            "**Generative AI:** Spearheading design for GenAI initiatives, focusing on AI agent workflows and predictive, adaptive user interfaces.",
            "**LLM Evaluation:** Developed and implemented evaluation systems for LLM agents, achieving a performance lift from **50% to 90%+** in factuality and helpfulness.",
            "**Workflow Automation:** Independently built and deployed multiple high-impact workflow automations, streamlining the development lifecycle for 0-1 agentic products.",
            "**Agentic Architecture:** Architected structured instruction sets (**skill.md**) and state machines to define agentic behavior and response quality.",
            "**Collaborative Research:** Collaborating with ML Research and Engineering to translate LLM capabilities into intuitive, scalable product features."
          ]
        },
        {
          title: "User Experience Designer",
          year: "Sep 2018 — Apr 2022",
          location: "San Francisco Bay Area",
          summary: "Orchestrated the Communication as a Service (CaaS) strategy, standardizing omnichannel messaging workflows across Google Search, Maps, and Ads.",
          description: [
            "**CaaS Strategy:** Standardized omnichannel messaging workflows across Google Search, Maps, and Ads through a unified Communication as a Service strategy.",
            "**Platform Extensibility:** Designed a scalable framework for third-party extensibility, allowing global businesses to integrate custom communication tools into the Google ecosystem.",
            "**Merchant Platforms:** Led the 0-1 design of merchant-facing communication platforms to balance platform standardization with high-intent user interaction.",
            "**Architectural Scalability:** Focused on the architectural scalability of B2B communication tools, ensuring consistency across diverse web and mobile entry points."
          ]
        }
      ]
    },
    {
      company: "Location Labs by Avast",
      logo: getAssetPath('/assets/ll-logo.jpg'),
      duration: "5 yrs 3 mos",
      roles: [
        {
          title: "Product Designer",
          year: "Nov 2016 — Aug 2018 · 1 yr 10 mos",
          location: "Emeryville, CA",
          description: [
            "Redesigned two core company products for **Sprint & Verizon** improving the range of features and user engagement."
          ]
        },
        {
          title: "Associate Product Designer",
          year: "Oct 2015 — Oct 2016 · 1 yr 1 mo",
          location: "Emeryville, CA",
          description: [
            "Designer on a three-person, four week design/dev sprint that launched new security features."
          ]
        },
        {
          title: "QA Engineer",
          year: "Aug 2012 — Nov 2014 · 2 yrs 4 mos",
          location: "Emeryville, California",
          description: [
            "As a QA engineer and project lead, I oversaw Android projects across multiple carriers and OS versions."
          ]
        }
      ]
    },
    {
      company: "General Assembly",
      logo: getAssetPath('/assets/ga-logo.png'),
      roles: [
        {
          title: "User Experience Design Immersive",
          year: "2014 — 2015",
          description: [
            "Intensive professional training program in UX design principles and practice."
          ]
        }
      ]
    },
    {
      company: "University of California, Santa Cruz",
      logo: getAssetPath('/assets/ucsc-logo.png'),
      roles: [
        {
          title: "B.A. Philosophy & Environmental Studies",
          year: "2007 — 2011",
          description: [
            "Bachelor of Arts, Environmental Studies (Dual Focus), Graduated with **Highest Honors**.",
            "Grade: 3.6 Overall - 3.9 within Environmental Studies.",
            "Activities: Ultimate Frisbee (National & World Champion), Outdoors club."
          ]
        }
      ]
    }
  ],
  resumeUrl: "https://drive.google.com/file/d/1LjKp_-EX9THCmLxqcG5a1z9TRBkcBbfI/view?usp=drive_link",
  linkedinUrl: "https://www.linkedin.com/in/devonanderson1/"
};