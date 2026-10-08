// The words of brands.html, sport.html and artists.html that differ from the
// home page: title and description, the hero line (the page's h1), the world
// section, the world FAQ and the lines of the home sections each world says
// its own way. build-doors.mjs reads this file; edit here, then run
//   node .github/scripts/build-doors.mjs
// Fields ending in "Html" may hold links and <br>; the others are plain text.
// Facts only: plans, limits and the three fictional demos. No clients, no
// figures beyond the demos, no testimonials.

export const PAGES = {
  brand: {
    file: "brands.html",
    title: "Brand loyalty program: customers post about you · FAN/IP",
    description:
      "A loyalty program that rewards customers for posting about your brand. You see every post, its views and its media value. From €99 a month.",
    ogTitle: "FAN/IP for brands · Customers who post about you.",
    h1Html: 'Customers who post<br><span class="hero-promise__gold">about you.</span>',
    lead:
      "A loyalty program that rewards what customers say, not only what they buy. They post your product, earn points and unlock your rewards. You see every post and how far it went.",
    tickerLabel: "For beauty, skincare, fashion, food and lifestyle brands, and independent shops.",
    ticker: ["beauty brands", "coffee roasters", "fashion labels", "skincare brands", "sneaker shops", "bakeries", "craft breweries", "sportswear brands", "food brands", "concept stores"],

    why: {
      title: "Paid reach stops when the budget does.",
      oldLabel: "Reach you rent",
      oldLines: ["Budget → Ads → Views", "Stop paying, and the views stop."],
      verbs: [
        ["Post a photo", "Of the parcel, the shelf, the shop"],
        ["Share a story", "The routine, the new shade"],
        ["Tag you", "So their friends find you"],
        ["Invite a friend", "Who needs it too"],
      ],
      outcome: "Reach you don’t pay for.",
      note: "Your customers already recommend you to friends. Now you can ask them to post it, thank them with rewards and count every view.",
    },

    world: {
      kicker: "FAN/IP for brands",
      title: "Word of mouth you can count.",
      lead:
        "Your customers already show your products to their friends. FAN/IP turns that into an ambassador program anyone can join: a fan club under your brand’s name, with missions, points, levels and rewards you choose.",
      cols: [
        {
          h: "Who it’s for",
          pHtml:
            "Beauty, skincare, fashion, coffee, food, sportswear and independent shops. Any brand whose customers take photos of what they bought. It runs next to the loyalty program you already have: that one rewards what customers buy, this one rewards what they say. Start on Starter at €99 a month for up to 150 active members.",
        },
        {
          h: "Missions your customers run",
          list: [
            "Post an unboxing photo or video and tag you",
            "Share their routine in a story",
            "Invite a friend who needs it too",
            "Vote in a poll on the next shade or flavour",
            "Check in with the QR code in your shop",
            "Reach a community goal that unlocks a gift box",
          ],
          after:
            "Points go to the rewards shop: a code for the next order, early access to a drop, a PR package for your most active members.",
        },
        {
          h: "What you see in the admin",
          pHtml:
            "Every post made for a mission, with its views and the reach beyond the customer’s own followers. Your user-generated content, in one place. Media value puts a price on it: views × the cost per 1,000 views in your niche. We start brands at €8 and you can change it. Next to it sits what your gifts cost you.",
        },
      ],
      footHtml:
        'See it set up for a brand: <a href="demo/maison-aube/">the Maison Aube demo</a>, a fictional skincare brand.',
    },

    faqTitle: "Questions from brands.",
    faq: [
      {
        q: "How is this different from a loyalty program?",
        aHtml:
          "A classic loyalty program rewards purchases. FAN/IP rewards what customers do for you beyond the till: posting a photo, sharing a story, bringing a friend. You can run it next to the loyalty program you already have.",
      },
      {
        q: "What counts as user-generated content here?",
        aHtml:
          "The photos, videos and stories customers post on their own Instagram or TikTok for a mission. Your team reviews each one before points are awarded, and the admin keeps every post with its views.",
      },
      {
        q: "Is it an ambassador program?",
        aHtml:
          "Yes, one that every customer can join. Influencer platforms pay a few creators with large audiences. FAN/IP works with the people who already buy from you, each with friends who trust them.",
      },
      {
        q: "What does it cost a small brand?",
        aHtml:
          'Starter is €99 a month with a 7-day free trial: up to 150 active members, with 3 missions and 3 rewards at a time. Club is €490 a month and Season €1,290, for up to 10,000 active members. <a href="pricing.html">Compare the plans</a>.',
      },
      {
        q: "Does it work with our online shop?",
        aHtml:
          "Alongside it. Reward codes and member lists export as spreadsheets for tools like Shopify or Klaviyo, with nothing to install. On Season we set up the shop link with you.",
      },
    ],

    product: {
      titleHtml: "Three steps.<br>Your customers do the rest.",
      step2: "Customers share from their own accounts. Each approved post earns points, levels and rewards.",
      step3: "Every post, its views and its media value, next to what your gifts cost.",
      caption: "Illustrative values. You name and set your own missions, levels and rewards. ",
    },
    resultTitle: "What you see after 30 days.",
    resultCaptionHtml:
      'Screens from the Maison Aube demo: a fictional brand, illustrative figures. Media value is what the same views would cost as ads, at €8 per 1,000 views for a beauty brand. You set your own. <a href="reach-calculator.html?for=brand" data-calc-link>Work out your numbers</a>',
    demosLead:
      "Your name, your colours, your words. Customers see your brand, not ours. Open the Maison Aube demo and click through it as a customer, then as the team behind it.",
    worldLead: "This page is for brands. Pick another world to see its own page.",
    pricing: {
      lead:
        "Start on Starter at €99 a month, free for 7 days, then move up as your community grows. We count active members: customers who did something this month.",
      planFor: [
        "For a brand starting its fan club. Sign up online and set it up yourself.",
        "For a brand launching its first customer community.",
        "For brands with a real fan base and regular drops.",
        "For large communities and multi-brand groups.",
      ],
    },
    tryLead:
      "Type your brand name and we open your own fan club in Starter, free for 7 days, with a live preview as you set it up. Nothing is created until you finish.",
    tryPlaceholder: "Your brand name",
    closeLead: "Build a community your customers want to be part of.",
    footSentence: "FAN/IP gets brands talked about by their own customers.",
  },

  sport: {
    file: "sport.html",
    title: "Fan engagement app for clubs and esports teams · FAN/IP",
    description:
      "A supporters club app under your club’s name. Fans post, earn points and rewards, and your sponsors see the reach. For sport and esports. From €99 a month.",
    ogTitle: "FAN/IP for sport · Supporters who post. Sponsors who see it.",
    h1Html: 'Supporters who post.<br><span class="hero-promise__gold">Sponsors who see it.</span>',
    lead:
      "A supporters club app under your club’s name. Fans post from the stands, earn points and climb the levels. Your sponsors get a report of how many people saw it.",
    tickerLabel: "For football, basketball, ice hockey, handball and cycling clubs, esports teams and gaming venues.",
    ticker: ["football clubs", "esports teams", "basketball clubs", "ice hockey teams", "cycling clubs", "gaming venues", "handball clubs", "rugby clubs", "volleyball clubs", "running clubs"],

    why: {
      title: "A logo on a shirt doesn’t post.",
      oldLabel: "What sponsors get today",
      oldLines: ["Logo → Shirt → Matchday", "Hard to show what it was worth."],
      verbs: [
        ["Post a photo", "From the stands"],
        ["Share a story", "The goal, the result"],
        ["Tag the club", "And the sponsor"],
        ["Bring a mate", "To the next home game"],
      ],
      outcome: "Reach your sponsors can see.",
      note: "Your supporters already film every goal. Give them points for it, put the sponsor in the picture and show the sponsor the views.",
    },

    world: {
      kicker: "FAN/IP for sport and esports",
      title: "Fan engagement your sponsors can see.",
      lead:
        "Your supporters already film the goal and post the score. FAN/IP gives them a supporters club app with your crest on it, points for every post and a reason to bring a mate to the next home game.",
      cols: [
        {
          h: "Who it’s for",
          pHtml:
            "Football, basketball, ice hockey, handball and cycling clubs, esports teams and gaming venues. Clubs with sponsors to look after and supporters who travel. The app speaks English, French, German and Spanish, so supporters abroad can join too. Fan loyalty with points and perks by level, run under your name.",
        },
        {
          h: "Matchday missions",
          list: [
            "A photo from the stands, tagging the club and the sponsor",
            "A score prediction before kick-off",
            "A QR check-in at the ground or the venue",
            "A quiz on the club’s history",
            "Team battles between supporters’ groups",
            "A mission road that runs the whole season",
          ],
          after:
            "Points lead to the rewards shop: a signed shirt, or a limited supporters’ shirt for everyone once the community goal is reached.",
        },
        {
          h: "The sponsor report",
          pHtml:
            "Put a sponsor’s name on a set of missions. Supporters post with the sponsor in view, and the sponsor gets a private link on its phone: members who took part, posts, views, reach beyond the club’s followers and media value at €7 per 1,000 views, a rate you can change. More to show at renewal time than a logo on a shirt.",
        },
      ],
      footHtml:
        'See a full season at <a href="demo/aldermoor/">Aldermoor</a>, a fictional football club, sponsor report included.',
    },

    faqTitle: "Questions from clubs.",
    faq: [
      {
        q: "What is a supporters club app?",
        aHtml:
          "An app where supporters join the club’s community, complete missions, earn points and unlock rewards. With FAN/IP it carries your club’s name and colours, and fans open it in their browser, with nothing to download.",
      },
      {
        q: "How do we show sponsors what the fans are worth?",
        aHtml:
          'Run a sponsor quest. Supporters post matchday photos with the sponsor in view, and the sponsor gets a private report link: members who took part, posts, views and media value at the price per 1,000 views you set. The <a href="demo/aldermoor/">Aldermoor demo</a> shows one.',
      },
      {
        q: "Does it work for esports teams and gaming venues?",
        aHtml:
          "Yes. The missions are yours to write: a clip of the match, a prediction, a QR check-in at the venue, a team battle between members. Posts on Instagram and TikTok count the same way.",
      },
      {
        q: "Is it a fan loyalty program?",
        aHtml:
          "In part. Supporters earn points and perks by level, as in a fan loyalty program. The difference is that most missions happen on their own social accounts, so the club and its sponsors can count the reach.",
      },
      {
        q: "Which plan suits a club?",
        aHtml:
          'Season, at €1,290 a month for up to 10,000 active members, covers a full season with sponsors on board. A smaller club can start on Club at €490, or try Starter at €99 a month, free for 7 days. <a href="pricing.html">Compare the plans</a>.',
      },
    ],

    product: {
      titleHtml: "Three steps.<br>Your supporters do the rest.",
      step2: "Supporters post from their own accounts. Each approved post earns points, a higher level and rewards.",
      step3: "Every post and its views, in a report you can send to your sponsor.",
      caption: "Illustrative values. Each club names and sets its own challenges, levels and rewards, sponsors included. ",
    },
    resultTitle: "What you and your sponsor see.",
    resultCaptionHtml:
      'Screens from the Aldermoor demo: a fictional club, illustrative figures. Media value is what the same views would cost as ads, at €7 per 1,000 views for sport. You set your own. <a href="reach-calculator.html?for=sport" data-calc-link>Work out your numbers</a>',
    demosLead:
      "Your crest, your colours, your words. Supporters see the club, not us. Open the Aldermoor demo and play it as a supporter, then as the club.",
    worldLead: "This page is for clubs, teams and esports. Pick another world to see its own page.",
    pricing: {
      lead:
        "Season covers a whole season with your sponsors on board. A smaller club or esports team can start on Starter at €99 a month. We count active members, not dormant sign-ups.",
      planFor: [
        "For a small club or team. Sign up online and set it up yourself.",
        "For a club launching its supporters club.",
        "For a club with sponsors to report to.",
        "For large clubs and groups with several teams.",
      ],
    },
    tryLead:
      "Type your club’s name and we open your supporters club in Starter, free for 7 days, with a live preview as you set it up. Nothing is created until you finish.",
    tryPlaceholder: "Your club or team name",
    closeLead: "Build a supporters club people want to be part of.",
    footSentence: "FAN/IP gets clubs and teams talked about by their own supporters.",
  },

  artist: {
    file: "artists.html",
    title: "Fan club app for artists and creators · FAN/IP",
    description:
      "Fans post after every show, earn points and unlock rewards you choose. You see how many people they reached, city by city. Your own fan club, your name.",
    ogTitle: "FAN/IP for artists · Fans who post after every show.",
    h1Html: 'Fans who post<br><span class="hero-promise__gold">after every show.</span>',
    lead:
      "Your own fan club app, under your name. Fans post from the front row, earn points and unlock the rewards you choose. You see the reach of every show, city by city.",
    tickerLabel: "For bands, singers, DJs, rappers, festivals, podcasters and creators.",
    ticker: ["bands", "singers", "DJs", "festivals", "rappers", "podcasters", "YouTubers", "streamers", "comedians", "choirs"],

    why: {
      title: "Promo stops when the budget does.",
      oldLabel: "Reach you rent",
      oldLines: ["Budget → Ads → Views", "Stop paying, and the views stop."],
      verbs: [
        ["Post a photo", "From the front row"],
        ["Share a story", "The new single, the encore"],
        ["Tag you", "And the city"],
        ["Invite a friend", "To the next show"],
      ],
      outcome: "Reach you don’t pay for.",
      note: "Your fans already film the show. Now you can ask them to post it, reward them and see which city talked the most.",
    },

    world: {
      kicker: "FAN/IP for artists and creators",
      title: "A fan club app with your name on it.",
      lead:
        "Your fans already film the show and sing the chorus back. FAN/IP gives them your own fan club, with missions after every date, points, levels and rewards you choose. Fan loyalty you can see in numbers.",
      cols: [
        {
          h: "Who it’s for",
          pHtml:
            "Bands, singers, DJs, rappers, festivals, podcasters, YouTubers and streamers. Start alone on Starter at €99 a month, or bring your manager in with team seats on Club. Fans take part for free, in English, French, German or Spanish, so a tour abroad works the same way.",
        },
        {
          h: "Missions around the tour",
          list: [
            "Post your setlist photo, tag the city and the artist",
            "Share the new single in a story",
            "Bring a friend to the next show",
            "Check in with the QR code at the venue",
            "A quiz on the album, a poll on the encore",
            "A mission road from the first date to the last",
          ],
          after: "A community goal can unlock something for every member, like a signed tour poster.",
        },
        {
          h: "City by city",
          pHtml:
            "Each post is tied to a show. Your admin adds up views, reach among people who don’t follow you yet and media value, per show and per city, at €5 per 1,000 views for music. You set your own rate. You see where the word of mouth was loudest before you plan the next tour.",
        },
      ],
      footHtml:
        'See a six-date tour with <a href="demo/ilsa-morrow/">Ilsa Morrow</a>, a fictional singer.',
    },

    faqTitle: "Questions from artists.",
    faq: [
      {
        q: "What is a fan club app for artists?",
        aHtml:
          "A space under your name where fans join, complete missions, earn points and unlock rewards. You write the missions and choose the rewards. Fans take part for free.",
      },
      {
        q: "What do fans do after a show?",
        aHtml:
          "They post a setlist photo or a clip on Instagram or TikTok, tag the city and you, and earn points once your team approves the post. Other missions: a story for the new single, quizzes, polls, QR check-ins and inviting a friend.",
      },
      {
        q: "How do I see which cities talk the most?",
        aHtml:
          'Each post is tied to a show. The admin adds up views, reach beyond your followers and media value per show and per city. The <a href="demo/ilsa-morrow/">Ilsa Morrow demo</a> shows a six-date tour.',
      },
      {
        q: "How is this different from paid promotion?",
        aHtml:
          "Paid promotion stops when the budget does. Here the reach comes from fans posting to their own followers about a show they went to. That is word of mouth, and you thank them with rewards.",
      },
      {
        q: "How much does it cost?",
        aHtml:
          'Starter is €99 a month with a 7-day free trial, for up to 150 active fans and 3 missions and 3 rewards at a time. Club, at €490 a month, suits a first tour. Season, at €1,290, is for up to 10,000 active members. <a href="pricing.html">Compare the plans</a>.',
      },
    ],

    product: {
      titleHtml: "Three steps.<br>Your fans post after the show.",
      step2: "Fans post from their own accounts. Each approved post earns points, levels and rewards.",
      step3: "Every post and its views, show by show and city by city.",
      caption: "Illustrative values. You name and set your own missions, levels and rewards, tour by tour. ",
    },
    resultTitle: "What you see, show by show.",
    resultCaptionHtml:
      'Screens from the Ilsa Morrow demo: a fictional artist, illustrative figures. Media value is what the same views would cost as ads, at €5 per 1,000 views for music. You set your own. <a href="reach-calculator.html?for=artist" data-calc-link>Work out your numbers</a>',
    demosLead:
      "Your name, your colours, your words. Fans see you, not us. Open the Ilsa Morrow demo and play it as a fan, then as the team on tour.",
    worldLead: "This page is for artists and creators. Pick another world to see its own page.",
    pricing: {
      lead:
        "Start on Starter at €99 a month for a first fan club, or Club for a first tour. We count active members: fans who did something this month.",
      planFor: [
        "For an artist starting a fan club. Sign up online and set it up yourself.",
        "For a first tour with a fan club.",
        "For artists and festivals with a real fan base.",
        "For labels, festivals and large fan bases.",
      ],
    },
    tryLead:
      "Type your artist name and we open your own fan club in Starter, free for 7 days, with a live preview as you set it up. Nothing is created until you finish.",
    tryPlaceholder: "Your artist or band name",
    closeLead: "Build a fan club people want to be part of.",
    footSentence: "FAN/IP gets artists and creators talked about by their own fans.",
  },
};
