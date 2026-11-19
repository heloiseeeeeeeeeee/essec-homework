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
         { quote: "..." }  a large pull quote (optional)
         { figure: "chain" } or { figure: "scores" }  an interactive figure (data below) */
    essay: {
      title: "REFLECTION",
      standfirst: "Agentic AI can organise marketing work into a chain of specialised tasks. This reflection looks at what that changes, what it does not change, and why human judgement should remain at the centre of every decision.",
      chapters: [
        { h: "From tools to workflows", blocks: [
          "The session presented agentic AI not as a single tool but as a workflow: a sequence of defined roles (brief writing, validation, strategy, design, copywriting and review), in which the output of each step becomes the input of the next. The example used was a fictional luxury product launch, prepared from the brief to the evaluation of the creative work within one environment.",
          "In my view, the main lesson concerns organisation rather than technology. Dividing the work into smaller tasks with explicit handoffs makes each output easier to check, and therefore easier to control. This logic is not new: it reflects the division of labour between planning, creative and review functions that agencies have relied on for decades.[[The industry context presented was consistent with this shift: large holding groups are consolidating their agencies, and some companies are reallocating budgets towards AI. These signals point to restructuring, but their long-term effect on marketing roles remains uncertain.]]",
          { figure: "chain" },
          "I remain cautious about how far this can go. A workflow that runs smoothly is not necessarily a workflow that produces sound decisions. Each step inherits the assumptions of the previous one, so a weak brief can travel through the entire chain and reappear at the end as a well presented but misguided campaign. The efficiency gains are real, yet they increase rather than reduce the need for careful supervision."
        ]},
        { h: "Keeping the human at the centre", blocks: [
          "In the workflow presented, the human intervenes at step four, after the strategy and before any production. This placement is significant: the person does not simply correct a finished output, but approves the strategic direction on which everything else depends. Responsibility for the brand stays with a person at the moment where it matters most.",
          "I would go further than this model. Human judgement should not be limited to a single checkpoint; it should be present throughout, from framing the problem and questioning the data used, to the final decision to publish. AI can propose options and point out weaknesses, but accountability towards consumers, the brand and the law cannot be delegated to a system.[[Advertising remains subject to codes of practice, such as the Singapore Code of Advertising Practice. Responsibility for compliance lies with the advertiser and its partners, not with the tool used to produce the content.]]",
          "The CRAFT framework (Concept, Role, Action, Format, Tone) supports this view. It is less a technical technique than a reminder that the quality of an output depends on the quality of the brief. Writing a clear brief, whether for an agency or an AI system, requires the marketer to know precisely what they want before delegating anything."
        ]},
        { h: "Evaluation and its limits", blocks: [
          "The session also showed AI being used to evaluate creative work, scoring each execution through the lenses of three agencies. The feedback was concrete and, in several cases, relevant: it noted that the setting contradicted the research and that the product shown did not match the one described in the brief.",
          { figure: "scores" },
          "These scores should nevertheless be read with caution. They measure conformity to the criteria the system has been given, not the actual response of consumers. A rubric rewards what it can recognise, and the highest rated visual was itself judged more refined than surprising. If creative work is optimised mainly towards such scores, it risks converging on a competent but undistinctive average.",
          "This matters from a brand-building perspective. According to Byron Sharp, brands grow through mental and physical availability, supported by consistent and distinctive brand assets.[[Sharp, B. (2010). How Brands Grow: What Marketers Don't Know. Oxford University Press.]] Producing more content more quickly does not build distinctiveness on its own, and may even dilute it. Deciding which brand codes to protect over time is a strategic choice that, in my view, must remain with the people who understand the brand and its consumers.",
        ]},
        { h: "What I will do with it", blocks: [
          "In my group projects, I will use CRAFT to structure briefs, ask a separate chat to challenge a brief before relying on it, and always review AI outputs myself before they are shared.",
          "In fashion and beauty, where I hope to work, these tools could help small teams explore more ideas. I see them as support rather than replacement: the value of a marketer lies in judgement, understanding of the brand and responsibility for what is published."
        ]}
      ]
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
  {
    speaker: "Cindy Leong",
    role: "Head of Scaled Agency Development, APAC",
    company: "LinkedIn",
    date: "13/11/2026",
    title: "From SEO to GEO",
    definition: "Generative Engine Optimisation (GEO) is the practice of making a brand's content easy for AI assistants such as ChatGPT, Gemini or Perplexity to find, understand and cite in their answers. Where SEO aims to rank a web page in search results, GEO aims for the brand to be part of the answer itself, which raises the importance of credible, expert content on trusted platforms such as LinkedIn.",
    learnings: [
      { t: "From ranking in results to being part of the answer",
        d: "As people ask AI assistants instead of scrolling through search results, visibility no longer depends only on ranking a page. Brands now need to be mentioned, and described accurately, in AI-generated answers. A new KPI is emerging alongside the classic ones: AI visibility, or share of model, which tracks how often and how accurately AI assistants mention a brand." },
      { t: "Know the audience before planning the media",
        d: "Every media plan rests on two kinds of audience data: insights, which are qualitative and explain who the audience is (from tools such as GWI, Nielsen or GA4), and size, which is quantitative and estimates how many people can be reached (from the buying platforms). LinkedIn's Campaign Manager, for instance, estimates audiences by job title, industry, company size and professional interests, with a minimum of 300 members to serve ads and 50,000 or more recommended. Good audience understanding reduces media wastage, meaning ads shown to people outside the target." },
      { t: "AI speeds up research, but real data must confirm it",
        d: "Deep research agents and \u201csynthetic audiences\u201d (AI twins of consumers) can draft an audience brief in minutes. The evidence calls for caution: Pew found that AI twins flattened opinions (98% agreement on one question against 42% among real people), and Strat7 found synthetic willingness to pay 16% too high and right only 47% of the time. The recommended use is to form hypotheses with AI, validate them with real data, and cap synthetic respondents at 10 to 20% of a sample." }
    ],

    essay: {
      title: "REFLECTION",
      standfirst: "Search is moving from lists of links to answers written by AI. This reflection considers what that shift means for how brands are found, how audiences are understood, and why the evidence behind marketing decisions matters more than ever.",
      chapters: [
        { h: "From search results to answers", blocks: [
          "For two decades, being visible online meant ranking well in search engines. Generative AI changes the format of the result: instead of a list of pages to compare, the user increasingly receives a single synthesised answer. The question for a brand is therefore no longer only \u201cwhere do we rank?\u201d but \u201care we mentioned, and are we described correctly?\u201d",
          "This shift gives new weight to credible, consistent content published where expertise is visible, which is the case LinkedIn makes for its own platform. It also creates a new indicator, AI visibility or share of model.[[Share of model measures how often, and how accurately, AI assistants mention a brand when answering relevant questions. It sits alongside classic KPIs rather than replacing them.]] In my view, the logic is familiar from How Brands Grow: being easily recalled in buying situations now includes being retrieved by the systems people consult before they buy.",
          "I would nevertheless remain cautious. Brands do not control how an AI model summarises them, answers can be inaccurate, and the methods for measuring this visibility are still immature. GEO is worth understanding, but it should complement, not replace, the fundamentals of a clear positioning and a recognisable brand."
        ]},
        { h: "Knowing who to reach", blocks: [
          "The second part of the session placed audience understanding at the heart of media planning. A plan moves through successive decisions, from the business context to the final media plan, and each stage depends on the quality of the previous one.",
          { figure: "chain", caption: "The stages of media planning. Click a stage, or play the sequence.", play: "Play the stages" },
          "The distinction between audience insights and audience size struck me as particularly useful. Insights explain who the audience is and what motivates it; size estimates how many of these people a platform can actually reach. Confusing the two leads either to precise messages with no reach, or to large reach with no relevance. Platform estimates should also be read critically, since they come from the companies selling the advertising space.[[With AI-driven targeting, such as broad automated audiences, platform estimates increasingly describe a large reachable pool rather than a precisely defined target.]]",
          "Understanding an audience also means recognising that not all customers bring the same value. Some generate long-term profit, while others mainly respond to discounts. For a retailer such as Sephora, this changes where investment should go.",
          { figure: "matrix", caption: "Customer quality: what customers receive from a company, and what they deliver to it. Click a quadrant." }
        ]},
        { h: "Synthetic answers, real people", blocks: [
          "AI is now built into most research tools, and \u201csynthetic audiences\u201d promise survey answers in hours rather than weeks. The appeal is obvious for teams under time and budget pressure.",
          "The evidence presented, however, shows clear limits. AI twins tend to flatten the diversity of opinion: on one question, 98% of synthetic respondents agreed, against 42% of real people. Another study found synthetic willingness to pay 16% too high, and correct only 47% of the time.[[Sources listed in the session slides include Pew Research (September 2026) and Research Live (July 2026).]] A model reproduces the average of what it has learned; real consumers are inconsistent, emotional and diverse, which is precisely what marketers need to understand.",
          "This echoes what I am learning in consumer and market research: findings are only as reliable as the people behind them. I see AI as a useful way to explore a topic and form hypotheses quickly, but decisions on positioning, pricing or targeting should rest on validated data from real consumers, interpreted by people who understand the context."
        ]},
        { h: "What I will do with it", blocks: [
          "In my projects, I will use free tools such as Google Trends, TikTok or Reddit to form first hypotheses about an audience, then check them against real data before drawing conclusions. On LinkedIn, I will treat my own profile as content that should stay credible and consistent.",
          "In fashion and beauty, I take away two ideas: brands must now consider how AI describes them, and the most valuable customers are not always the cheapest to acquire. Both require human judgement on what the brand stands for and whom it truly serves."
        ]}
      ]
    },

    chain: [
      { role: "Business context", does: "Understand the brand's objectives, market and constraints before any media decision.", note: "Media planning is about answering the brief, and about giving stakeholders confidence." },
      { role: "Audience insights", does: "Qualitative understanding of who the audience is: behaviours, interests, channels, purchase drivers.", note: "Tools: GWI, Nielsen, GA4, or free ones such as Google Trends and Reddit." },
      { role: "Channel decisioning", does: "Choose where to reach the audience, among more platforms than ever.", note: "Fragmentation and data overload can paralyse choice." },
      { role: "Investment decisioning", does: "Split the budget across channels and funnel stages, balancing brand building and short-term sales.", note: "Beyond a channel's saturation point, extra spend brings diminishing returns." },
      { role: "Measurement plan", does: "Define the KPIs and methods that will show what worked: mix modelling, incrementality tests, attribution.", note: "No single tool answers every question." },
      { role: "Media plan", does: "The tactical execution: specific platforms, budgets, targeting and timing.", note: "Educated decisions are required at every stage.", human: true }
    ],
    matrix: {
      y: "Value delivered to the company",
      x: "Value received from the company",
      cells: [
        { name: "Vulnerable customers", tag: "High value, little return", d: "Highly valuable to the company but receive little value in return, so they are at risk of leaving.", ex: "Worth protecting before a competitor offers them more." },
        { name: "Star customers", tag: "High value both ways", d: "Receive high value from the company and deliver high value to it.", ex: "At Sephora: shops several times a year, loyalty member, buys new launches at full price.", best: true },
        { name: "Lost causes", tag: "Little value either way", d: "Derive little value from the product and bring little profit in return.", ex: "Rarely worth significant acquisition spend." },
        { name: "Free riders", tag: "Happy, not profitable", d: "Take advantage of every offer, discount and promotion: very satisfied, but not very profitable.", ex: "At Sephora: buys during sales events, loves free samples and birthday gifts, waits for a deal." }
      ]
    }
  },

  /* ---------- Session 4 ---------- */
  { ready: false },

  /* ---------- Session 5 ---------- */
  { ready: false }
];
