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
    role: "CMO",
    company: "Yellow Pages Singapore",
    date: "30/10/2026",
    title: "Agentic AI",
    definition: "Agentic AI describes AI systems that do more than answer a single question: each one takes on a role, carries out a sequence of tasks towards a goal and passes its work to the next step, while a human sets the direction and checks the results. In marketing, a set of these AI agents can work like a small team, from the first brief to the evaluation of a campaign.",
    learnings: [
      { t: "A marketing team built from AI roles",
        d: "Nick split the work of an agency into six roles, each saved as a reusable Claude skill inside one Project: a Brief Writer, a Brief Validator and a Strategist for planning; an Art Director, a Copywriter and a Reviewer for production. The output of each role feeds the next, and a scheduled task can start the chain from an emailed request. The marketer's skill shifts from doing each task to designing the chain and approving what passes through it." },
      { t: "CRAFT: brief the AI the way you would brief an agency",
        d: "A prompt works best when it makes five things explicit: the Concept (the idea behind the request), the Role the AI should play, the Action it must carry out, the Format of the output and the Tone. In marketing terms, CRAFT is a creative brief. Nick then had a Brief Validator check the objective, audience, message and metric in a fresh chat before anything was produced, because every later step is only as good as the brief." },
      { t: "AI can judge the work, not only make it",
        d: "A Creative Review Scorer rated each execution of a fictional Louis Vuitton launch, the Terra handbag, through the lenses of three agencies (BBH, Ogilvy and McCann), with strengths, weaknesses and one concrete fix. The Instagram Story scored 5.7/10, the feed post 4.3/10, and a reworked visual reached 6.7/10. Another skill checks copy against the Singapore Code of Advertising Practice. Evaluation becomes a fast loop, while the decision about what to change stays human." }
    ],

    /* The reflection, written as an essay.
       chapters: each has a title (h) and blocks, shown in order:
         "text"            a paragraph. [[...]] inside it becomes a clickable side note.
         { quote: "..." }  a large pull quote
         { figure: "chain" } or { figure: "scores" }  an interactive figure (data below) */
    essay: {
      title: "Step four is the job",
      standfirst: "Nick Goh built a six-role marketing team out of Claude and used it to launch a Louis Vuitton handbag that does not exist. What stayed with me was not the speed of the machine, but the place he kept for the human.",
      chapters: [
        { h: "A team, not a tool", blocks: [
          "Nick did not open with technology but with the news: companies cutting jobs as investment shifts toward AI, and WPP folding Ogilvy, VML and AKQA into a single creative banner. The industry is already reorganising itself. What he then showed us was the same reorganisation at the scale of one person: a Claude Project holding a planning team and a production team, each role written as a reusable skill, with a scheduled task that turns an emailed request into a first brief.",
          "What struck me most was how ordinary the set-up was. There was no expensive platform and no technical team, only a sequence of clearly defined roles in which the output of one becomes the input of the next. The sophistication lay in the design of the workflow, not in the technology itself.[[In organisational terms, this is a division of labour. Nick did not make the AI more intelligent; he made each task smaller and each handoff explicit, which is exactly what makes the output easier to check.]]",
          { figure: "chain" },
          "It challenged an assumption I had held, that AI in marketing is mainly a content generator, a faster way to write captions or produce visuals. Here it was organised like an agency, with a strategist, a creative and a critic checking each other's work. The question moves from which tool to use to how the work should be divided, and where a human must step in."
        ]},
        { h: "Step four is the job", blocks: [
          "In the handoff chain, the human does not appear at the end as a final proofreader. You are step four, in the middle: after the brief has been drafted, challenged and turned into a Big Idea, and before anything is produced. Approving the strategy and saving it to the knowledge base is the moment where intent becomes binding for everything downstream. That is where the marketer's value now concentrates.",
          "Two details made this concrete. First, the Brief Validator works in a new chat, with fresh eyes, so the brief is critiqued by an agent that did not write it. This separation of authorship and review is the logic agencies have long built into the relationship between planners and creatives.[[A model reviewing its own text in the same conversation tends to defend it. A fresh chat removes that context, much like asking a colleague who was not in the room.]] Second, every later step depends on that brief, which is why CRAFT matters: making the Concept, the Role, the Action, the Format and the Tone explicit is the same discipline as writing a good creative brief.",
          { quote: "A vague brief produces generic work, whether the executor is an agency or an algorithm." },
          "Building this website through vibecoding has taught me the same lesson on a small scale: the quality of the result depends far more on the clarity of my instructions than on the tool."
        ]},
        { h: "When the machine marks the homework", blocks: [
          "The part of the session I found most thought-provoking was evaluation. A Creative Review Scorer rated each execution of the fictional Terra launch through the lenses of three agencies. The feedback was specific: the desert setting worked against the research, two frames of the Story were near duplicates, and the bag on screen did not match the product being launched. A reworked visual, a hand resting on the clasp, scored best.",
          { figure: "scores" },
          "This is powerful. Critique that once took a round of agency meetings now takes seconds, and it is anchored in the brief. But it raises a question I want to keep open: a rubric rewards what it can recognise. Even the winning visual was described by the scorer itself as more refined than surprising. If every idea is optimised toward the same three lenses, creative work risks converging on a competent average.",
          "This connects directly to How Brands Grow. Byron Sharp argues that brands grow by building mental and physical availability among many light buyers, through consistent and distinctive brand assets.[[Sharp, B. (2010). How Brands Grow: What Marketers Don't Know. Oxford University Press.]] An AI team can multiply the volume of content almost without limit, but volume without distinctiveness dilutes the very cues that make a brand recognisable. Protecting those cues over years is a judgement that cannot be delegated to a system rewarded for producing more.",
          { quote: "A rubric rewards what it can recognise. Distinctiveness is precisely what it cannot." }
        ]},
        { h: "What I will do with it", blocks: [
          "In the short term, I want to apply CRAFT systematically in my group projects, and borrow Nick's best habit: asking a separate chat to challenge a brief before anyone executes it, and keeping a human approval between strategy and production.",
          "Further ahead, I want to work in fashion and beauty, where launches are frequent, content cycles are short and brand codes are everything. A lightweight agentic team could let a small brand test many more concepts before committing budget. Yet this session convinced me that my value will lie less in executing tasks than in deciding which ideas deserve to be executed, and in keeping a brand coherent while the volume of content grows. The scorer could flag that the bag on screen was not Terra; only someone who understands the Maison can decide what Terra should feel like.",
          "When a classmate asked what AI means for our future jobs, Nick did not reassure us. He said human judgement is the safeguard today, and openly wondered how long that will remain true. Hearing that uncertainty from someone who builds these systems made the debate far less abstract."
        ]}
      ],
      closing: "The real question is not only what AI is capable of doing, but what we, as humans, are prepared to let it do."
    },

    /* data for the interactive figures of the essay */
    chain: [
      { role: "Brief Writer", does: "Drafts the brief from the Project context: goal, audience, budget, timing.", note: "Starts automatically when a request arrives by email." },
      { role: "Brief Validator", does: "New chat, fresh eyes. Checks objective, audience, message and metric, then gives a verdict and the top fixes.", note: "The reviewer never wrote the brief it reviews." },
      { role: "Strategist", does: "Digests the validated brief and shapes the Big Idea into a one-page proposition.", note: "Research on the brand and product feeds this step." },
      { role: "You", does: "Approve the strategy and save it to the knowledge base.", note: "The only human step, placed before anything is produced.", human: true },
      { role: "Designer + Copywriter", does: "Key visuals through Higgsfield, plus a messaging hierarchy adapted to each channel.", note: "Output: “Nothing to explain. Terra. Louis Vuitton craft, since 1854.”" },
      { role: "Reviewer", does: "Checks the work against the brand voice, the brief and the Big Idea, then edits and signs off.", note: "Then the Creative Review Scorer rates each execution." }
    ],
    scores: {
      lenses: ["BBH", "Ogilvy", "McCann"],
      items: [
        { name: "Instagram Story, 3 frames", v: [5, 6, 6], verdict: "Strong craft close-up, but the desert setting works against the research and two frames are near duplicates." },
        { name: "Instagram feed post", v: [4, 4, 5], verdict: "Restrained caption, but a generic luxury-in-the-desert image: the Big Idea reads as a slogan, not something you see." },
        { name: "Reworked: hand on the clasp", v: [6, 7, 7], verdict: "The moment before she opens the bag carries desire and anticipation. Best idea of both rounds, though more refined than surprising.", best: true }
      ]
    }
  },

  /* ---------- Session 3 ---------- */
  { ready: false },

  /* ---------- Session 4 ---------- */
  { ready: false },

  /* ---------- Session 5 ---------- */
  { ready: false }
];
