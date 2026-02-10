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
          title: "Senior Product Designer (Lead)",
          year: "2023 — Present",
          location: "Honolulu, Hawaii · Remote",
          summary: "Currently leading 0→1 design strategy for **Merchant Shopping AI**. I specialize in translating complex **LLM (Large Language Model)** capabilities into intuitive user interfaces.",
          description: [
            "**Incremental Revenue:** Led design for *ShopStream*, an AI-powered video generation tool driving **+$5.2M incremental revenue** and powering >80% of PMax GenAI video revenue.",
            "**Agentic AI:** Architecting **agentic system patterns** that allow merchants to use natural language to generate business reports and take automated actions.",
            "**Strategy:** Facilitating cross-PA (Product Area) workshops to align AI design frameworks across Google Ads and Shopping."
          ]
        },
        {
          title: "Product Designer",
          year: "2018 — 2023",
          location: "San Francisco Bay Area",
          summary: "Served as the sole Interaction Designer (IXD) for a 30+ person engineering org, driving the end-to-end UX vision for global messaging.",
          description: [
            "**Scale:** Launched Calls, Messaging, and Photos to **13M+ verified users** across Google Search and Maps.",
            "**Omnichannel UX:** Designed surface-agnostic messaging systems, scaling merchant chat from a localized pilot to a global platform with an **80% CSAT**.",
            "**Leadership:** Navigated complex legal, privacy, and x-functional (xFN) requirements for Billion+ user products."
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
