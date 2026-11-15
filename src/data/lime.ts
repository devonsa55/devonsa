// Content for the Lime support agent case study, taken from the Lime section
// of the portfolio deck (slides and speaker notes). Every chapter has a short
// version for the quick read; chapters with `deep` paragraphs expand in the
// in-depth view, and `deepOnly` chapters appear only there.

const IMG = '/images/projects/lime-support-agent'

export type LimeVisual = 'today' | 'questions' | 'entry' | 'moments' | 'endings' | 'card' | 'status'

export interface LimeChapter {
  id: string
  eyebrow: string
  title: string
  quick: string
  deep: string[]
  visual?: LimeVisual
  caption?: string
  deepOnly?: boolean
}

export const limeMeta = {
  title: 'A support agent riders can check',
  intro:
    'Lime’s support chat is text and numbers on a third-party platform. I’m prototyping a replacement built around three questions a rider has when something goes wrong: where do I start, what is it doing, and can I check it?',
  facts: [
    { label: 'Role', value: 'Staff Product Designer (contract)' },
    { label: 'Team', value: 'Customer Support AI Automation' },
    { label: 'Timeline', value: 'September 2026 to now' },
    { label: 'Status', value: 'Prototype, not yet tested with riders' },
  ],
}

export const limeChapters: LimeChapter[] = [
  {
    id: 'today',
    eyebrow: 'The starting point',
    title: 'Today, the chat is text and numbers.',
    quick:
      'To pick a charge, a rider types its number and the bot answers in a paragraph. There is nothing to look at and nothing to check, so when something goes wrong it is hard to reverse course without leaving the chat. Every escalation to a person costs money.',
    deep: [
      'The chat riders get today runs on a third-party platform. It offers quick replies, then a numbered list, then asks the rider to type a number or describe the transaction. The answer comes back as a paragraph.',
      'A rider trying to choose a ride they took has nothing to look at and nothing to check. When something goes wrong in the chat it is hard to reverse course, or to work out what to do next without leaving. And every escalation to a person costs money, so the questions have to be answered in the chat itself.',
      'The question is close to the one I worked on at Google, with a different user: can a rider check what a support agent tells them? So we are prototyping our own.',
    ],
    visual: 'today',
    caption: 'The current flow: quick replies, a numbered list, then the rider types a number.',
  },
  {
    id: 'questions',
    eyebrow: 'What I’m designing for',
    title: 'Three questions a rider has.',
    quick:
      'When something goes wrong, a rider has three questions, in order: where do I start, what is it doing, and can I check it?',
    deep: [
      'When something goes wrong and a rider is getting support, they have three questions, in this order. Each one has to be answered in the chat, because the alternative is a person, and that is the expensive path.',
      'The problems with today’s chat show up inside each question, so the rest of this case study takes them one at a time. None of it has been tested with riders yet, so I’ve tried to be clear about what is known and what isn’t.',
    ],
    visual: 'questions',
    deepOnly: true,
  },
  {
    id: 'getting-in',
    eyebrow: '1 of 3 · Getting in',
    title: 'Start with what just happened.',
    quick:
      'Riders struggle to say which trip it was, or which part of the vehicle was damaged. The new entry lists recent trips first, keeps the AI assistant at the bottom of the screen, and carries the trip a rider picks straight into the chat.',
    deep: [
      'The first question is “where do I start?” It is about getting the trip’s context into the chat, not about checking anything yet.',
      'Today a rider opens the side menu, goes to Help and gets a list of topics. When they want something fixed, the hard part is getting the context across: which trip it was, which part of the vehicle was damaged.',
      'So the entry starts from what just happened. Recent trips come first, the AI assistant is always there at the bottom, and the trip a rider picks brings its context straight into the chat. I explored a few other ways in, including a chat field on top of Help and shortcut chips, and this is the one I landed on.',
    ],
    visual: 'entry',
    caption: 'Today: side menu, then a list of Help topics. Where I landed: recent trips first.',
  },
  {
    id: 'the-wait',
    eyebrow: '2 of 3 · The wait',
    title: 'Waiting is the most common step I mapped.',
    quick:
      'Before redesigning anything, I counted. I mapped 13 common rider problems step by step, which came to 41 moments. In 14 of them the rider is waiting, more than any other kind of moment. So the wait gets designed, not defaulted.',
    deep: [
      'Before I redesigned anything, I counted. I took 13 problems riders contact support about, such as a parking fine they think is wrong, a ride that won’t end, or a charge they don’t recognize, and walked through what the rider sees from start to finish.',
      'Every step is a moment: the rider is told something, shown something, asked something, or made to wait. That came to 41 moments.',
      'The biggest group is waiting: 14 of the 41, ahead of show (11), tell (9) and ask (7). So that is where I put the design effort. The wait gets designed, not defaulted.',
    ],
    visual: 'moments',
    caption: '41 moments across 13 rider problems. Each square is one moment.',
  },
  {
    id: 'endings',
    eyebrow: '2 of 3 · The wait',
    title: 'Show the work. Say when you’re not sure.',
    quick:
      'While the rider waits, the chat shows a skeleton shaped like the answer and names what the system is checking. The same wait can end two ways: the system reverses the fine, or it says it isn’t confident and brings in a person.',
    deep: [
      'Take one of those waits. A rider sees a parking fine that looks wrong and opens the chat. What comes back is a skeleton shaped like the answer, and a line naming what the system is checking, so the work is visible while it happens.',
      'The same wait can end two ways. In one, the system finds the scooter was inside the approved zone and reverses the fine. In the other it isn’t confident, so it says so instead of guessing and brings in a person. That is the one escalation we want to pay for.',
      'What matters as much as the wait is what the rider is left with when it ends, and whether they can check it.',
    ],
    visual: 'endings',
    deepOnly: true,
  },
  {
    id: 'the-card',
    eyebrow: '3 of 3 · The card',
    title: 'Every part of a card answers one question.',
    quick:
      'A $15 parking fine is reversed because the scooter was inside the corral’s GPS margin of error. The card has to show why the fine didn’t hold, not only that it is gone. Each part answers one question, and if two parts answer the same question, one of them goes.',
    deep: [
      'The last question is “can I check it?” The fine was $15, the scooter was inside the approved corral, and the system reversed it. This card is how the rider finds out, so it has to show why the fine didn’t hold, not only that it is gone.',
      'One rule sits behind every card: each part answers one question. The status says where it stands. The headline says what it means for me, with the number. The support line says why. The body lets me check it, once, with a picture or a sentence. The footer says whether I can trust it and what to do next.',
      'If two parts answer the same question, one of them goes. Every part is there so the rider can see what happened and why, without needing a person to explain it.',
    ],
    visual: 'card',
    caption: 'The auto-reverse outcome, with the question each part answers.',
  },
  {
    id: 'status',
    eyebrow: 'Where this stands',
    title: 'What I know, what I don’t, and where it goes.',
    quick:
      'Riders don’t trust a bot that only replies in text, and waiting is the most common step in the flows I mapped. Whether the design holds up with riders is not known yet. The first thing I’d look at is escalations to a person.',
    deep: [
      'What I know: riders don’t trust a bot that only replies in text, and in the flows I mapped, waiting is the most common step. That is what I designed for.',
      'What I don’t know is whether it holds up with riders. It hasn’t been tested, and the first thing I’d look at is escalations to a person.',
      'If it works, it grows one problem type at a time, from the help menu into the chat.',
    ],
    visual: 'status',
  },
  {
    id: 'how',
    eyebrow: 'How it’s built',
    title: 'A prototype in code, not a deck.',
    quick:
      'The prototype is built in code from Lime’s design system components, with demo controls that put the app into any state.',
    deep: [
      'Anything involving live behavior I now lean toward building in code: streaming states, latency, whether a widget feels intrusive in a real surface. You can’t judge those in a static frame.',
      'For this work I pulled the components out of the design system repositories and rebuilt a prototyping environment I can play in, with demo controls at the bottom so I can put the app into any state I want. Right now that is mostly Antigravity and Claude Code, with Vercel and Supabase.',
      'The Google work took months of alignment, a formal pitch and a playbook. This is closer to how I work now: a bias to action, and a demo instead of a deck.',
    ],
    deepOnly: true,
  },
]

export const limeToday = [
  {
    label: '1 · Quick replies',
    src: `${IMG}/today-quick-replies.webp`,
    alt: 'Current Lime support chat: a welcome message followed by three quick-reply buttons.',
  },
  {
    label: '2 · Numbered list',
    src: `${IMG}/today-numbered-list.webp`,
    alt: 'Current chat: the bot lists six recent charges as numbered lines of text.',
  },
  {
    label: '3 · Type a number',
    src: `${IMG}/today-type-a-number.webp`,
    alt: 'Current chat: the rider replies by typing the number 2 to pick a charge.',
  },
]

export const limeEntry = {
  today: [
    {
      src: `${IMG}/entry-menu.webp`,
      alt: 'Today: the Lime app side menu, with Help as one item in a long list.',
    },
    {
      src: `${IMG}/entry-help.webp`,
      alt: 'Today: the Help screen, a list of four topics.',
    },
  ],
  landed: {
    src: `${IMG}/entry-landed.webp`,
    alt: 'Proposed Help screen: a greeting, two recent trips with prices, two report shortcuts, and an AI assistant field at the bottom.',
  },
}

export const limeQuestions = [
  {
    question: 'Where do I start?',
    label: '01 · Getting in',
    answer: 'Start with what just happened.',
  },
  {
    question: 'What’s it doing?',
    label: '02 · The wait',
    answer: 'Show the work. Say when you’re not sure.',
  },
  {
    question: 'Can I check it?',
    label: '03 · The card',
    answer: 'Every part of a card answers one question.',
  },
]

export const limeMoments = {
  total: 41,
  problems: 13,
  groups: [
    { label: 'Waiting', count: 14 },
    { label: 'Show', count: 11 },
    { label: 'Tell', count: 9 },
    { label: 'Ask', count: 7 },
  ],
}

// Screen recordings of the two endings live in the deck as video and can't be
// exported from Figma. Add them as files under public/ and set `video` here.
export const limeEndings: { label: string; title: string; body: string; video?: string }[] = [
  {
    label: 'Auto-reverse',
    title: 'It finds the answer and acts.',
    body: 'The scooter was inside the approved zone, so the system reverses the fine and shows why.',
  },
  {
    label: 'Low confidence',
    title: 'It says it isn’t sure.',
    body: 'Instead of guessing, it tells the rider and brings in a person. That is the one escalation we want to pay for.',
  },
]

// `top` is each marker's vertical position on the card image, as a percentage
// of the card's height (measured from the deck).
export const limeCardImage = {
  src: `${IMG}/outcome-card.webp`,
  alt: 'Outcome card. Status: Reversed. Headline: $15.00 is back on your Apple Pay. Support line: the scooter was inside the corral’s GPS margin of error, so the fine didn’t hold. A small map shows the scooter 4 metres outside the approved corral with a 9 metre GPS margin. A ledger shows the $15.00 penalty, a $15.00 credit and a net of $0.00. Footer: ledger time and reference, and a Receipt link.',
}

export const limeCardParts = [
  {
    key: 'A',
    top: 8.8,
    part: 'Status',
    question: 'Where does it stand?',
    rule: 'The only place a state word appears.',
  },
  {
    key: 'B',
    top: 19.7,
    part: 'Headline',
    question: 'What does it mean for me?',
    rule: 'The consequence, with the number.',
  },
  {
    key: 'C',
    top: 34.5,
    part: 'Support',
    question: 'Why?',
    rule: 'The interpretation, not the data.',
  },
  {
    key: 'D',
    top: 50.1,
    part: 'Body',
    question: 'Can I check it?',
    rule: 'Evidence once: a picture or a sentence.',
  },
  {
    key: 'E',
    top: 91,
    part: 'Footer',
    question: 'Can I trust it? What now?',
    rule: 'Provenance, then at most one action.',
  },
]

export const limeStatus = [
  {
    label: '01 · What I know',
    statement: 'Riders don’t trust a text-only bot.',
    note: 'From the logs. And in the flows I mapped, waiting is the most common step.',
  },
  {
    label: '02 · What I don’t',
    statement: 'Whether it holds up with riders.',
    note: 'I haven’t tested it yet. First thing to look at: escalations to a person.',
  },
  {
    label: '03 · Where it goes',
    statement: 'More moves into chat over time.',
    note: 'One problem type at a time, from the help menu into the trip.',
  },
]
