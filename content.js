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
    title: "LinkedIn",
    definition: "LinkedIn is the world's largest professional network, with more than one billion members in over 200 countries and regions. Beyond profiles and job offers, it works as a media platform where professionals follow companies, read expert content and make business decisions, which allows both B2B and B2C brands to reach people in a professional mindset.",
    learnings: [
      { t: "A large audience in a professional mindset",
        d: "LinkedIn reports more than one billion members, over 200 countries and regions and more than 69 million companies on the platform. According to LinkedIn, four in five members drive business decisions, and its audience has twice the buying power of the average web audience. People come to the platform to learn, build a career and follow their industry, so content is judged on usefulness and credibility more than on entertainment." },
      { t: "B2B: speak to the 95%, not only the 5% ready to buy",
        d: "Research by the Ehrenberg-Bass Institute for LinkedIn's B2B Institute suggests that only about 5% of business buyers are in the market for a given product at any time; the other 95% will buy later. Purchases are made by buying groups of around ten people, and LinkedIn data indicates that around 40% of deals are lost to indecision rather than to a competitor. B2B brands therefore need to build familiarity and trust with the whole buying group over time, not only collect leads." },
      { t: "Best practices for members and brands",
        d: "For members: a complete profile with a photo, a clear headline and regular, genuine engagement. For brands, LinkedIn's own guidance: complete Pages get 30% more weekly views, posting weekly brings a 2x lift in engagement, images double the comment rate and video attracts more engagement still. Employees can be a brand's most credible voices. B2C brands perform best with content that feels native to the platform: behind the scenes, values, innovation and people, rather than direct selling." }
    ],

    essay: {
      title: "REFLECTION",
      standfirst: "LinkedIn is often seen as a place to look for a job. This reflection considers it from three angles: the user building a professional identity, the B2B brand selling to groups rather than individuals, and the consumer brand trying to earn attention in a professional space.",
      chapters: [
        { h: "A platform built on professional identity", blocks: [
          "What distinguishes LinkedIn from other social platforms is that members appear under their real name, job and employer. This makes the network more credible, but it also changes how people behave: they are not only consuming content, they are managing a professional reputation. Every like, comment or post is, to some extent, public and attached to a career.",
          "From the user's point of view, this creates real value. A complete, consistent profile makes a person findable by recruiters and peers, and following companies and experts turns the feed into a source of learning about an industry. It also explains why the audience is attractive to brands: people arrive in a mindset of progress and information rather than distraction.",
          "I would add a note of caution. The same reputational logic can encourage polished self-promotion and a culture of performance, where posts are written to impress rather than to inform. Figures on audience and buying power also come from the platform itself, which has an interest in presenting them favourably.[[Membership, decision-making and buying-power figures are reported by LinkedIn. They are useful orders of magnitude, but should be compared with independent sources before being used to justify a media budget.]] Using LinkedIn well therefore means staying authentic and reading its numbers critically."
        ]},
        { h: "B2B: selling to groups, not individuals", blocks: [
          "The most useful idea for me concerned B2B buying. A business purchase is rarely the decision of one person: it involves a buying group, often around ten people with different priorities, from users to finance and management. And at any given moment, only a small minority of potential buyers are actively looking.",
          { figure: "split", caption: "The 95:5 rule. Out of 100 potential business buyers, how many are in the market today? Click each group." },
          "This connects directly to How Brands Grow. The 95:5 rule comes from the Ehrenberg-Bass Institute, the same research centre as Byron Sharp, and applies the logic of mental availability to B2B: brands must be known and trusted before the need arises, so that they come to mind when the buying group finally starts searching.[[Dawes, J. (2021). Advertising effectiveness and the 95-5 rule. Ehrenberg-Bass Institute, for the LinkedIn B2B Institute.]] A strategy focused only on lead generation reaches the 5% and ignores the rest.",
          "The data on indecision also struck me. If many deals are lost because the group cannot agree, the role of marketing is not only to persuade but to reduce perceived risk: helping each member of the group understand the choice and feel safe making it. This is, in my view, where credible and expert content matters more than volume of advertising."
        ]},
        { h: "From the customer's point of view", blocks: [
          "For B2C brands, LinkedIn is less obvious, but customers are also professionals. Consumer brands can use the platform to speak about what usually stays invisible to shoppers: the people behind the products, innovation, sustainability commitments and company culture. In sectors such as beauty and luxury, it seems better suited to building reputation and attracting talent than to selling products directly.",
          { figure: "chain", caption: "Best practices for a brand Page, according to LinkedIn's guidance. Click a step, or play the sequence.", play: "Play the steps" },
          "What these practices have in common is that they treat the audience as people looking for something useful. From a customer's perspective, hard selling feels out of place on a professional network, while honest and informative content is more likely to be read and shared. This content also has a second life: as buyers increasingly ask AI assistants for advice before contacting a company, credible information published on trusted platforms is more likely to be found and cited. I see this as a reason for more rigour in what brands publish, rather than for producing more content."
        ]},
        { h: "What I will do with it", blocks: [
          "For myself, I will complete my LinkedIn profile, write a clear headline that reflects my interest in fashion and beauty marketing, and follow brands and professionals in this sector to understand how they communicate.",
          "As a future marketer, I take away that LinkedIn should be judged over time, on reputation and trust, and not only on immediate leads. Choosing what a brand says there, and how honestly, remains a human responsibility."
        ]}
      ]
    },

    split: {
      parts: [
        { label: "in market now", pct: 5, d: "Buyers actively looking for a solution today. Lead generation and sales activity can capture this demand.", ex: "Measured by leads, conversions and pipeline." },
        { label: "in market later", pct: 95, d: "Future buyers who will not purchase for months or years. Brand building aims to be known and trusted by them before the need arises.", ex: "Measured by reach, awareness and recall over time, not cost per lead." }
      ]
    },
    chain: [
      { role: "Complete the Page", does: "Logo, cover image, overview with relevant keywords, company information and a call-to-action button.", note: "Complete Pages get 30% more weekly views." },
      { role: "Post weekly", does: "Publish regularly, at times when the audience is most active.", note: "Weekly posting brings a 2x lift in engagement." },
      { role: "Use rich media", does: "Images, image collages, documents and video rather than plain text.", note: "Images bring a 2x higher comment rate." },
      { role: "Humanise the brand", does: "Show the people, culture and values behind the company, and celebrate employees.", note: "Behind-the-scenes content feels native to the platform." },
      { role: "Involve employees", does: "Invite employees to follow the Page and share important posts.", note: "Posts shared by employees often feel more credible than the brand's own." },
      { role: "Measure and adjust", does: "Use Page analytics to track visitors, followers and content performance, and compare with competitors.", note: "A human decides what to keep, change or stop.", human: true }
    ]
  },

  /* ---------- Session 4 ---------- */
  { ready: false },

  /* ---------- Session 5 ---------- */
  { ready: false }
];
