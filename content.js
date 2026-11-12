/* =========================================================
   CONTENT OF THE SITE
   This is the only file you need to touch to change the text.
   To add a session: copy a whole block { ... }, paste it at the end
   of the list, put a comma between blocks, and change the text.
   { ready: false } shows a session as "Coming soon".
   ========================================================= */

window.AUTHOR = "Héloïse Guerault";

window.SESSIONS = [
  /* ---------- Session 1 ---------- */
  {
    speaker: "Rishabh, Yibo and Nirvan",
    role: "",
    company: "Singapore American School",
    date: "09/10/2026",
    title: "Vibecoding",
    definition: "Vibecoding is a new way of creating websites and apps in which you describe the result you want in everyday language, and an AI tool turns that description into a working product. The creator's role shifts from writing code to directing the outcome: shaping the design, reviewing what the AI builds and refining it step by step, before tools such as GitHub and Vercel store it and publish it online.",
    learnings: [
      { t: "Marketers can now build without developers",
        d: "With tools like Claude Design, you describe the look and content of a page in words and the AI builds it. A landing page, a campaign microsite or a product prototype no longer has to wait for a developer, so the person who knows the customer can build the page directly." },
      { t: "From idea to a live link in minutes",
        d: "GitHub stores the code and every version of it; Vercel turns it into a public website and updates it in seconds after each change. Every proposed change also gets its own preview link, so a team can check a page before it goes live. For marketing, this means testing an idea with real people quickly and cheaply." },
      { t: "Knowing the three layers lets you brief the AI precisely",
        d: "index.html holds the words, styles.css holds the look, script.js holds the behaviour. In marketing terms: the copy, the brand identity, and what happens when someone clicks the call to action. Knowing which layer to change makes your instructions to the AI clear." }
    ],
    notes: [
      { h: "What surprised me",
        p: "How short the path is between an idea and a public website. You describe a design in words, the code goes to GitHub, and Vercel publishes it again after every change, with no manual uploading at all." },
      { h: "How it connects to my courses",
        p: "In marketing, the speed of testing matters. A landing page for a new product idea can now go live in an afternoon, which changes how fast a brand can try a concept with real people before investing in it." },
      { h: "What I will do with it",
        p: "This website is my first real project with these tools. I will add a page after each guest speaker session to keep track of the key ideas." }
    ]
  },

  /* ---------- Session 2 ---------- */
  {
    speaker: "Nick Goh",
    role: "",
    company: "",
    date: "30/10/2026",
    title: "Agentic AI",
    definition: "Agentic AI describes AI systems that do more than answer a single question: each one takes on a role, carries out a sequence of tasks towards a goal and passes its work to the next step, while a human sets the direction and checks the results. In marketing, a set of these AI agents can work like a small team, from the first brief to the evaluation of a campaign.",
    learnings: [
      {"t": "AI can now work as a full marketing team", "d": "Using a fictional product launch, Nick showed how AI agents can each take a marketing role: developing and validating the brief, building the strategy, producing the creative execution and evaluating the result. The output of one agent becomes the input of the next, so a whole campaign can be prepared in one connected workflow. The marketer's skill shifts from doing each task to designing and supervising the chain."},
      {"t": "CRAFT: brief the AI the way you would brief an agency", "d": "A prompt works best when it makes five things explicit: the Concept (the idea behind the request), the Role the AI should play, the Action it must carry out, the Format of the output and the Tone. In marketing terms, CRAFT is a creative brief: the clearer each element, the less generic and more on-brand the result."},
      {"t": "Lightweight, human-guided and within reach of small budgets", "d": "The workflow was deliberately simple, so that individuals and organisations with modest budgets can use it without expensive tools or a technical team. A human reviews and steers every stage, because AI may expand what is possible, but human creativity and judgement must decide what is worth pursuing."}
    ],
    notes: [
      {"h": "What surprised me", "p": "What struck me most was not the quality of what the AI produced, but how ordinary the set-up was. Nick did not rely on an expensive platform or a technical team: he chained a small number of AI agents, each with a clear role, and let the work of one feed the next, from the brief to the evaluation. The sophistication lay in the design of the workflow, not in the technology itself.\n\nIt challenged an assumption I had held, that AI in marketing is mainly a content generator, a faster way to write captions or produce visuals. Here it was organised like a team, with a strategist, a creative and a critic checking each other's work. That moves the question from 'which tool should I use?' to 'how should the work be divided, and where must a human step in?'\n\nI was also surprised by how candid Nick was when a student asked what AI means for our future jobs. Rather than reassuring us, he acknowledged that human judgement is the safeguard today, while openly asking how long that will remain true. Hearing that uncertainty from someone who builds these systems made the debate feel far less abstract."},
      {"h": "How it connects to my courses", "p": "The workflow mirrors the logic we study in marketing management: a brief, a strategy, an execution and an evaluation. What changes is not the structure of a campaign but who carries out each step. If agents can draft and test these steps in minutes, the strategic value of the marketer moves upstream, to framing the right problem, and downstream, to judging whether the output genuinely serves the brand and its consumers.\n\nIt also connects to the How Brands Grow principles we covered: brands grow by building mental and physical availability among many light buyers, through consistent and distinctive brand assets. An AI team can multiply the volume of creative work almost without limit, but volume without consistency risks diluting the very cues that make a brand recognisable. Protecting distinctiveness over time is a judgement call that cannot simply be delegated to a system optimised to produce more.\n\nFinally, CRAFT gave me a practical lens on something we often treat as intuitive. Writing a good prompt is very close to writing a good creative brief: the concept, the role, the expected action, the format and the tone must all be explicit. A vague brief produces generic work, whether the executor is an agency or an algorithm, which makes briefing one of the most transferable skills a marketer can develop."},
      {"h": "What I will do with it", "p": "In the short term, I want to apply CRAFT systematically in my group projects: setting the concept and the role before asking an AI for any output, and keeping a human review between each stage, as Nick did. Building this website through vibecoding has already shown me that the quality of the result depends far more on the clarity of my instructions than on the tool itself.\n\nLooking further ahead, I want to work in fashion and beauty, sectors where launches are frequent and content cycles are short. A lightweight agentic workflow could let a small team test many more concepts before committing budget. Yet this session convinced me that my value will lie less in executing tasks than in knowing which ideas deserve to be executed, and in keeping a brand coherent while the volume of content grows.\n\nI leave with the question Nick ended on: not only what AI is capable of doing, but what we, as humans, are prepared to let it do. As future marketers, deciding where to draw that line, for brands, for consumers and for our own profession, will be part of the job."}
    ]
  },

  /* ---------- Session 3 ---------- */
  { ready: false },

  /* ---------- Session 4 ---------- */
  { ready: false },

  /* ---------- Session 5 ---------- */
  { ready: false }
];
