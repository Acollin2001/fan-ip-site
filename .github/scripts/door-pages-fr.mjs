// The French words of fr/brands.html, fr/sport.html and fr/artists.html that
// differ from fr/index.html: the same fields as door-pages.mjs, written for
// French-speaking marketing teams, clubs and artists' teams (not a word-for-
// word translation). build-doors.mjs reads this file; edit here, then run
//   python3 .github/scripts/typo_fr.py .github/scripts/door-pages-fr.mjs
//   node .github/scripts/build-doors.mjs
// The first line sets French spacing (no-break spaces before : ; ? ! and €,
// between thousands). Links go to ../ for the pages that exist in English
// only (FAQ, reach calculator) and stay in fr/ for the French pages.
// Plan names (Starter, Club, Season, Signature) and the demo names stay as
// they are. Facts only: same plans, prices and figures as the English pages.

export const UI_FR = {
  trial: "Commencer mon essai gratuit",
  demo: "Réserver une démo",
  faqMoreHtml: 'D’autres réponses, pour tous les univers, dans la <a href="../faq.html" hreflang="en">FAQ complète</a>.',
};

export const PAGES_FR = {
  brand: {
    file: "brands.html",
    title: "Programme de fidélité : vos clients parlent de vous · FAN/IP",
    description:
      "Un programme de fidélité qui récompense vos clients quand ils publient sur votre marque. Chaque post, ses vues, sa valeur média. Dès 99 € par mois.",
    ogTitle: "FAN/IP pour les marques · Des clients qui parlent de vous.",
    valueLine: "Dès 99 € par mois. Chaque post, ses vues et ce qu’il aurait coûté en publicité.",
    planNote:
      "Objets à collectionner, jeux-concours et colis presse arrivent avec Club, les objectifs communs avec Season. Avec Starter, vous pouvez essayer les missions photo et vidéo, les sondages, les quiz, le parrainage, les récompenses et le classement.",
    h1Html: 'Des clients qui parlent<br><span class="hero-promise__gold">de vous.</span>',
    lead:
      "Un programme de fidélité qui récompense ce que vos clients disent, pas seulement ce qu’ils achètent. Ils publient votre produit, gagnent des points et débloquent vos récompenses. Vous voyez chaque publication et jusqu’où elle est allée.",
    tickerLabel: "Pour les marques de beauté, de soin, de mode, d’alimentation et de lifestyle, et les boutiques indépendantes.",
    ticker: ["marques de beauté", "torréfacteurs", "marques de mode", "marques de soin", "boutiques de sneakers", "boulangeries", "brasseries artisanales", "marques de sportswear", "marques alimentaires", "concept stores"],

    why: {
      title: "La portée payante s’arrête avec le budget.",
      oldLabel: "Une portée que vous louez",
      oldLines: ["Budget → Pubs → Vues", "Vous arrêtez de payer, les vues s’arrêtent."],
      verbs: [
        ["Publier une photo", "Du colis, du rayon, de la boutique"],
        ["Partager une story", "La routine, la nouvelle teinte"],
        ["Vous identifier", "Pour que leurs amis vous trouvent"],
        ["Inviter un ami", "Qui en a besoin aussi"],
      ],
      outcome: "Une portée que vous ne payez pas.",
      note: "Vos clients vous recommandent déjà à leurs amis. Vous pouvez maintenant leur proposer de le publier, les remercier avec des récompenses et compter chaque vue.",
    },

    world: {
      kicker: "FAN/IP pour les marques",
      title: "Un bouche-à-oreille que vous pouvez compter.",
      lead:
        "Vos clients montrent déjà vos produits à leurs amis. FAN/IP en fait un programme d’ambassadeurs ouvert à tous : un fan club au nom de votre marque, avec des missions, des points, des niveaux et les récompenses que vous choisissez.",
      cols: [
        {
          h: "Pour qui",
          pHtml:
            "Beauté, soin, mode, café, alimentation, sportswear et boutiques indépendantes. Toute marque dont les clients prennent en photo ce qu’ils ont acheté. FAN/IP fonctionne à côté de votre programme de fidélité actuel : l’un récompense ce que les clients achètent, l’autre ce qu’ils disent. Commencez avec Starter à 99 € par mois, jusqu’à 150 membres actifs.",
        },
        {
          h: "Les missions de vos clients",
          list: [
            "Publier une photo ou une vidéo d’unboxing en vous identifiant",
            "Partager leur routine en story",
            "Inviter un ami qui en a besoin aussi",
            "Voter pour la prochaine teinte ou la prochaine saveur",
            "Faire un check-in avec le QR code de votre boutique",
            "Atteindre un objectif collectif qui débloque un coffret cadeau",
          ],
          after:
            "Les points s’échangent dans la boutique de récompenses : un code pour la prochaine commande, un accès en avant-première à un drop, un colis presse pour vos membres les plus actifs.",
        },
        {
          h: "Ce que vous voyez dans l’admin",
          pHtml:
            "Chaque publication faite pour une mission, avec ses vues, ses j’aime, ses commentaires et ses partages, et les abonnés du client qui l’a publiée. Votre contenu généré par les utilisateurs (UGC), au même endroit. La valeur média lui donne un prix : les vues × le coût pour 1 000 vues dans votre niche. Nous partons de 8 € pour les marques, et vous pouvez le modifier. Juste à côté, ce que vos cadeaux vous coûtent.",
        },
      ],
      footHtml:
        'Voyez-le configuré pour une marque : <a href="../demo/maison-aube/" hreflang="en">la démo Maison Aube</a>, une marque de soin fictive.',
    },

    faqTitle: "Les questions des marques.",
    faq: [
      {
        q: "En quoi est-ce différent d’un programme de fidélité ?",
        aHtml:
          "Un programme de fidélité classique récompense les achats. FAN/IP récompense ce que vos clients font pour vous au-delà de la caisse : publier une photo, partager une story, amener un ami. Vous pouvez le faire tourner à côté de votre programme de fidélité actuel.",
      },
      {
        q: "Qu’est-ce qui compte comme contenu généré par les utilisateurs ?",
        aHtml:
          "Les photos, vidéos et stories que vos clients publient sur leur propre compte Instagram ou TikTok pour une mission. Votre équipe valide chacune avant l’attribution des points ; les publications que le réseau confirme via le compte lié d’un membre peuvent être validées automatiquement, et vous pouvez désactiver cette option. L’admin conserve chaque publication avec ses vues. Pour Instagram, il faut un compte Créateur ou Professionnel, gratuit, pour le relier ; TikTok fonctionne avec n’importe quel compte.",
      },
      {
        q: "Est-ce un programme d’ambassadeurs ?",
        aHtml:
          "Oui, un programme que chaque client peut rejoindre. Les plateformes d’influence rémunèrent quelques créateurs à forte audience. FAN/IP travaille avec les personnes qui achètent déjà chez vous, chacune avec des amis qui lui font confiance.",
      },
      {
        q: "Combien ça coûte pour une petite marque ?",
        aHtml:
          'Starter coûte 99 € par mois, avec 7 jours d’essai gratuit : jusqu’à 150 membres actifs, avec 3 missions et 3 récompenses à la fois et un classement. Club est à 490 € par mois pour jusqu’à 1 500 membres actifs, et Season à 1 290 € pour jusqu’à 10 000. <a href="pricing.html">Comparer les formules</a>.',
      },
      {
        q: "Est-ce que ça marche avec notre boutique en ligne ?",
        aHtml:
          "En parallèle. Les codes de récompense s’exportent en tableur pour des outils comme Shopify ou Klaviyo, sans rien à installer, et les listes de membres aussi à partir de Club. Avec Season, nous mettons en place le lien avec la boutique à vos côtés.",
      },
    ],

    product: {
      titleHtml: "Trois étapes.<br>Vos clients font le reste.",
      step2: "Les clients partagent depuis leurs propres comptes. Chaque publication leur rapporte de l’XP pour leur niveau dès l’envoi, et des points pour la boutique une fois validée.",
      step3: "Chaque publication, ses vues et sa valeur média, à côté de ce que vos cadeaux vous coûtent.",
      caption: "Valeurs indicatives. Vous nommez et réglez vos propres missions, niveaux et récompenses. ",
    },
    resultTitle: "Ce que vous voyez au bout de 30 jours.",
    resultCaptionHtml:
      'Écrans de la démo Maison Aube : une marque fictive, des chiffres indicatifs. La valeur média correspond à ce que les mêmes vues coûteraient en publicité, à 8 € les 1 000 vues pour une marque de beauté. Vous fixez votre propre tarif. <a href="../reach-calculator.html?for=brand" hreflang="en" data-calc-link>Calculez vos chiffres</a>',
    demosLead:
      "Votre nom, vos couleurs, vos mots. Les clients voient votre marque, pas la nôtre. Ouvrez la démo Maison Aube et parcourez-la comme un client, puis comme l’équipe qui la gère.",
    worldLead: "Cette page s’adresse aux marques. Choisissez un autre univers pour voir sa page.",
    pricing: {
      lead:
        "Commencez avec Starter à 99 € par mois, gratuit pendant 7 jours, puis passez à la formule supérieure à mesure que votre communauté grandit. Nous comptons les membres actifs : les clients qui ont envoyé une mission ces 90 derniers jours.",
      planFor: [
        "Pour une marque qui lance son fan club. Inscrivez-vous en ligne et configurez tout vous-même.",
        "Pour une marque qui lance sa première communauté de clients.",
        "Pour les marques qui ont une vraie base de fans et des drops réguliers.",
        "Pour les grandes communautés et les groupes multimarques.",
      ],
    },
    tryLead:
      "Saisissez le nom de votre marque : nous ouvrons votre propre fan club en Starter, gratuit pendant 7 jours, avec un aperçu en direct pendant que vous le configurez. Rien n’est créé tant que vous n’avez pas terminé.",
    tryPlaceholder: "Nom de votre marque",
    closeLead: "Construisez une communauté dont vos clients ont envie de faire partie.",
    footSentence: "FAN/IP fait parler des marques par leurs propres clients.",
  },

  sport: {
    file: "sport.html",
    title: "App d’engagement des fans pour clubs et esport · FAN/IP",
    description:
      "Une app de supporters à votre nom. Les fans publient et gagnent des récompenses, vos sponsors voient la portée. Sport et esport, dès 99 € par mois.",
    ogTitle: "FAN/IP pour le sport · Des supporters qui publient. Des sponsors qui le voient.",
    valueLine: "Dès 99 € par mois. Chaque post, ses vues et sa valeur média, avec un rapport privé pour votre sponsor.",
    demoFirst: true,
    planNote:
      "Les quêtes sponsor et les pronostics de match arrivent avec Club, les batailles d’équipes et les objectifs communs avec Season. Avec Starter, vous pouvez essayer les missions, les check-ins par QR code, les récompenses et le classement.",
    h1Html: 'Des supporters qui publient.<br><span class="hero-promise__gold">Des sponsors qui le voient.</span>',
    lead:
      "Une app de supporters au nom de votre club. Les fans publient depuis la tribune, gagnent des points et montent de niveau. Quand un sponsor rejoint une mission, il reçoit un rapport privé : les posts, leurs vues et ce qu’elles valent.",
    tickerLabel: "Pour les clubs de football, de basket, de hockey sur glace, de handball et de cyclisme, les équipes esport et les salles gaming.",
    ticker: ["clubs de football", "équipes esport", "clubs de basket", "équipes de hockey sur glace", "clubs cyclistes", "salles gaming", "clubs de handball", "clubs de rugby", "clubs de volley", "clubs de running"],

    why: {
      title: "Un logo sur un maillot ne publie rien.",
      oldLabel: "Ce que les sponsors obtiennent aujourd’hui",
      oldLines: ["Logo → Maillot → Jour de match", "Difficile de montrer ce que ça a rapporté."],
      verbs: [
        ["Publier une photo", "Depuis la tribune"],
        ["Partager une story", "Le but, le résultat"],
        ["Identifier le club", "Et le sponsor"],
        ["Amener un pote", "Au prochain match à domicile"],
      ],
      outcome: "Une portée que vos sponsors peuvent voir.",
      note: "Vos supporters filment déjà chaque but. Donnez-leur des points pour ça, mettez le sponsor dans le cadre et montrez-lui les vues.",
    },

    world: {
      kicker: "FAN/IP pour le sport et l’esport",
      title: "L’engagement des fans, visible par vos sponsors.",
      lead:
        "Vos supporters filment déjà le but et publient le score. FAN/IP leur donne une app de supporters avec votre écusson, des points pour chaque publication et une raison d’amener un pote au prochain match à domicile.",
      cols: [
        {
          h: "Pour qui",
          pHtml:
            "Clubs de football, de basket, de hockey sur glace, de handball et de cyclisme, équipes esport et salles gaming. Des clubs qui ont des sponsors à soigner et des supporters qui se déplacent. L’app parle anglais, français, allemand et espagnol : les supporters à l’étranger peuvent participer aussi. La fidélisation des fans avec points et avantages par niveau, à votre nom.",
        },
        {
          h: "Missions de jour de match",
          list: [
            "Une photo depuis la tribune, en identifiant le club et le sponsor",
            "Un pronostic avant le coup d’envoi",
            "Un check-in par QR code au stade ou dans la salle",
            "Un quiz sur l’histoire du club",
            "Des batailles d’équipes entre groupes de supporters",
            "Un parcours de missions sur toute la saison",
          ],
          after:
            "Les points mènent à la boutique de récompenses : un maillot dédicacé, ou un maillot supporter en édition limitée pour tout le monde une fois l’objectif collectif atteint.",
        },
        {
          h: "Le rapport sponsor",
          pHtml:
            "De temps en temps, associez le nom d’un sponsor à une mission. Les supporters publient avec le sponsor dans le cadre, et le sponsor reçoit un lien privé sur son téléphone : membres qui ont participé, publications, vues et valeur média à 7 € les 1 000 vues, un tarif que vous pouvez modifier. De quoi montrer bien plus qu’un logo sur un maillot au moment du renouvellement.",
        },
      ],
      footHtml:
        'Voyez une saison complète à <a href="../demo/aldermoor/" hreflang="en">Aldermoor</a>, un club de football fictif, avec <a href="../demo/aldermoor/?view=sponsor" hreflang="en">son rapport sponsor</a>, ou lisez <a href="../sample-report.html" hreflang="en">un exemple de rapport sponsor</a>.',
    },

    faqTitle: "Les questions des clubs.",
    faq: [
      {
        q: "Qu’est-ce qu’une app de supporters ?",
        aHtml:
          "Une app où les supporters rejoignent la communauté du club, réalisent des missions, gagnent des points et débloquent des récompenses. Avec FAN/IP, elle porte le nom et les couleurs de votre club, et les fans l’ouvrent dans leur navigateur, sans rien télécharger.",
      },
      {
        q: "Comment montrer aux sponsors ce que valent les fans ?",
        aHtml:
          'Lancez une quête sponsor. Les supporters publient des photos de match avec le sponsor dans le cadre, et le sponsor reçoit un lien privé vers son rapport : membres qui ont participé, publications, vues et valeur média au prix des 1 000 vues que vous fixez. La <a href="../demo/aldermoor/?view=sponsor" hreflang="en">démo Aldermoor</a> en montre un.',
      },
      {
        q: "Est-ce que ça marche pour les équipes esport et les salles gaming ?",
        aHtml:
          "Oui. Vous écrivez vos missions : un clip du match, un pronostic, un check-in par QR code dans la salle, une bataille d’équipes entre membres. Les publications sur Instagram et TikTok comptent de la même façon.",
      },
      {
        q: "Est-ce un programme de fidélité pour les fans ?",
        aHtml:
          "En partie. Les supporters gagnent des points et des avantages selon leur niveau, comme dans un programme de fidélité. La différence : la plupart des missions se passent sur leurs propres comptes, donc le club et ses sponsors peuvent compter la portée.",
      },
      {
        q: "Quelle formule pour un club ?",
        aHtml:
          'La plupart des clubs commencent avec Club, à 490 € par mois jusqu’à 1 500 membres actifs. Season, à 1 290 € par mois, convient à un club dont plusieurs sponsors mènent des quêtes toute la saison. Un petit club ou une équipe peut essayer Starter à 99 € par mois, gratuit pendant 7 jours. <a href="pricing.html">Comparer les formules</a>.',
      },
    ],

    product: {
      titleHtml: "Trois étapes.<br>Vos supporters font le reste.",
      step2: "Les supporters publient depuis leurs propres comptes. Chaque publication leur rapporte de l’XP pour leur niveau dès l’envoi, et des points pour la boutique une fois validée.",
      step3: "Chaque publication et ses vues dans votre admin, et un rapport privé avec les totaux pour votre sponsor.",
      caption: "Valeurs indicatives. Chaque club nomme et règle ses propres défis, niveaux et récompenses, sponsors compris. ",
    },
    resultTitle: "Ce que vous et votre sponsor voyez.",
    resultCaptionHtml:
      'Écrans de la démo Aldermoor : un club fictif, des chiffres indicatifs. La valeur média correspond à ce que les mêmes vues coûteraient en publicité, à 7 € les 1 000 vues pour le sport. Vous fixez votre propre tarif. <a href="../reach-calculator.html?for=sport" hreflang="en" data-calc-link>Calculez vos chiffres</a> · <a href="../sample-report.html" hreflang="en">Voir un exemple de rapport sponsor</a>',
    demosLead:
      "Votre écusson, vos couleurs, vos mots. Les supporters voient le club, pas nous. Ouvrez la démo Aldermoor et jouez-la comme un supporter, puis comme le club.",
    worldLead: "Cette page s’adresse aux clubs, aux équipes et à l’esport. Choisissez un autre univers pour voir sa page.",
    pricing: {
      lead:
        "La plupart des clubs commencent avec Club ; Season quand plusieurs sponsors mènent des quêtes toute la saison. Un petit club ou une équipe esport peut commencer avec Starter à 99 € par mois. Nous comptons les membres actifs : les supporters qui ont envoyé une mission ces 90 derniers jours.",
      planFor: [
        "Pour un petit club ou une petite équipe. Inscrivez-vous en ligne et configurez tout vous-même.",
        "Là où la plupart des clubs commencent : un club de supporters et des quêtes sponsor.",
        "Pour un club dont plusieurs sponsors mènent des quêtes toute la saison.",
        "Pour les grands clubs et les groupes qui ont plusieurs équipes.",
      ],
    },
    tryLead:
      "Saisissez le nom de votre club : nous ouvrons votre club de supporters en Starter, gratuit pendant 7 jours, avec un aperçu en direct pendant que vous le configurez. Rien n’est créé tant que vous n’avez pas terminé.",
    tryPlaceholder: "Nom du club ou de l’équipe",
    closeLead: "Construisez un club de supporters dont on a envie de faire partie.",
    footSentence: "FAN/IP fait parler des clubs et des équipes par leurs propres supporters.",
  },

  artist: {
    file: "artists.html",
    title: "App de fan club pour artistes et créateurs · FAN/IP",
    description:
      "Vos fans publient après chaque concert, gagnent des points et vos récompenses. Vous voyez les vues de leurs posts, concert par concert. Votre fan club.",
    ogTitle: "FAN/IP pour les artistes · Des fans qui publient après chaque concert.",
    valueLine: "Dès 99 € par mois. Chaque post de vos fans, ses vues et sa valeur média.",
    planNote:
      "Questions ouvertes, parcours de missions et jeux-concours arrivent avec Club, les objectifs communs avec Season. Avec Starter, vous pouvez essayer les missions photo et vidéo, les sondages, les quiz, les check-ins par QR code, les récompenses et le classement.",
    h1Html: 'Des fans qui publient<br><span class="hero-promise__gold">après chaque concert.</span>',
    lead:
      "Votre propre app de fan club, à votre nom. Les fans publient depuis le premier rang, gagnent des points et débloquent les récompenses que vous choisissez. Vous voyez les vues et la valeur média de chaque concert.",
    tickerLabel: "Pour les groupes, chanteurs, DJ, rappeurs, festivals, podcasteurs et créateurs.",
    ticker: ["groupes", "chanteurs", "DJ", "festivals", "rappeurs", "podcasteurs", "youtubeurs", "streamers", "humoristes", "chorales"],

    why: {
      title: "La promo s’arrête avec le budget.",
      oldLabel: "Une portée que vous louez",
      oldLines: ["Budget → Pubs → Vues", "Vous arrêtez de payer, les vues s’arrêtent."],
      verbs: [
        ["Publier une photo", "Depuis le premier rang"],
        ["Partager une story", "Le nouveau single, le rappel"],
        ["Vous identifier", "Et la ville"],
        ["Inviter un ami", "Au prochain concert"],
      ],
      outcome: "Une portée que vous ne payez pas.",
      note: "Vos fans filment déjà le concert. Vous pouvez maintenant leur proposer de le publier, les récompenser et voir quel concert a le plus fait parler.",
    },

    world: {
      kicker: "FAN/IP pour les artistes et les créateurs",
      title: "Une app de fan club à votre nom.",
      lead:
        "Vos fans filment déjà le concert et reprennent le refrain. FAN/IP leur donne votre propre fan club, avec des missions après chaque date, des points, des niveaux et les récompenses que vous choisissez. Une fidélité des fans que vous voyez en chiffres.",
      cols: [
        {
          h: "Pour qui",
          pHtml:
            "Groupes, chanteurs, DJ, rappeurs, festivals, podcasteurs, youtubeurs et streamers. Lancez-vous seul avec Starter à 99 € par mois, ou faites entrer votre manager grâce aux accès équipe de Club. Les fans participent gratuitement, en anglais, en français, en allemand ou en espagnol : une tournée à l’étranger fonctionne de la même façon.",
        },
        {
          h: "Des missions autour de la tournée",
          list: [
            "Publier la photo de la setlist, en identifiant la ville et l’artiste",
            "Partager le nouveau single en story",
            "Amener un ami au prochain concert",
            "Faire un check-in avec le QR code de la salle",
            "Un quiz sur l’album, un sondage sur le rappel",
            "Un parcours de missions de la première à la dernière date",
          ],
          after: "Un objectif collectif peut débloquer quelque chose pour chaque membre, comme une affiche de tournée dédicacée.",
        },
        {
          h: "Concert par concert",
          pHtml:
            "Créez une mission par concert, et chaque publication y est liée. Votre admin additionne les vues, les j’aime, les commentaires, les partages et la valeur média, mission par mission à partir de Club, et la portée potentielle de tous ceux qui ont publié. La valeur média part de 5 € les 1 000 vues pour la musique ; vous fixez votre propre tarif. Vous voyez où le bouche-à-oreille a été le plus fort avant de préparer la prochaine tournée.",
        },
      ],
      footHtml:
        'Voyez une tournée de six dates avec <a href="../demo/ilsa-morrow/" hreflang="en">Ilsa Morrow</a>, une chanteuse fictive.',
    },

    faqTitle: "Les questions des artistes.",
    faq: [
      {
        q: "Qu’est-ce qu’une app de fan club pour artistes ?",
        aHtml:
          "Un espace à votre nom où les fans s’inscrivent, réalisent des missions, gagnent des points et débloquent des récompenses. Vous écrivez les missions et choisissez les récompenses. Les fans participent gratuitement.",
      },
      {
        q: "Que font les fans après un concert ?",
        aHtml:
          "Ils publient une photo de la setlist ou un extrait sur Instagram ou TikTok, identifient la ville et vous, puis gagnent des points une fois la publication validée par votre équipe. Autres missions : une story pour le nouveau single, des quiz, des sondages, des check-ins par QR code et l’invitation d’un ami.",
      },
      {
        q: "Comment voir de quels concerts on parle le plus ?",
        aHtml:
          'Créez une mission par concert. Votre admin additionne les vues, les j’aime, les commentaires, les partages et la valeur média, mission par mission à partir de Club, et la portée potentielle de tous ceux qui ont publié. La <a href="../demo/ilsa-morrow/" hreflang="en">démo Ilsa Morrow</a> montre une tournée de six dates.',
      },
      {
        q: "En quoi est-ce différent de la promotion payante ?",
        aHtml:
          "La promotion payante s’arrête avec le budget. Ici, la portée vient des fans qui publient pour leurs propres abonnés à propos d’un concert où ils étaient. C’est du bouche-à-oreille, et vous les remerciez avec des récompenses.",
      },
      {
        q: "Combien ça coûte ?",
        aHtml:
          'Starter coûte 99 € par mois avec 7 jours d’essai gratuit, jusqu’à 150 fans actifs, 3 missions et 3 récompenses à la fois, et un classement. Club, à 490 € par mois, convient à une première tournée. Season, à 1 290 €, va jusqu’à 10 000 membres actifs. <a href="pricing.html">Comparer les formules</a>.',
      },
    ],

    product: {
      titleHtml: "Trois étapes.<br>Vos fans publient après le concert.",
      step2: "Les fans publient depuis leurs propres comptes. Chaque publication leur rapporte de l’XP pour leur niveau dès l’envoi, et des points pour la boutique une fois validée.",
      step3: "Chaque publication et ses vues, concert par concert.",
      caption: "Valeurs indicatives. Vous nommez et réglez vos propres missions, niveaux et récompenses, tournée après tournée. ",
    },
    resultTitle: "Ce que vous voyez, concert par concert.",
    resultCaptionHtml:
      'Écrans de la démo Ilsa Morrow : une artiste fictive, des chiffres indicatifs. La valeur média correspond à ce que les mêmes vues coûteraient en publicité, à 5 € les 1 000 vues pour la musique. Vous fixez votre propre tarif. <a href="../reach-calculator.html?for=artist" hreflang="en" data-calc-link>Calculez vos chiffres</a>',
    demosLead:
      "Votre nom, vos couleurs, vos mots. Les fans vous voient, vous, pas nous. Ouvrez la démo Ilsa Morrow et jouez-la comme un fan, puis comme l’équipe en tournée.",
    worldLead: "Cette page s’adresse aux artistes et aux créateurs. Choisissez un autre univers pour voir sa page.",
    pricing: {
      lead:
        "Commencez avec Starter à 99 € par mois pour un premier fan club, ou Club pour une première tournée. Nous comptons les membres actifs : les fans qui ont envoyé une mission ces 90 derniers jours.",
      planFor: [
        "Pour un artiste qui lance son fan club. Inscrivez-vous en ligne et configurez tout vous-même.",
        "Pour une première tournée avec un fan club.",
        "Pour les artistes et les festivals qui ont une vraie base de fans.",
        "Pour les labels, les festivals et les grandes communautés de fans.",
      ],
    },
    tryLead:
      "Saisissez votre nom d’artiste : nous ouvrons votre propre fan club en Starter, gratuit pendant 7 jours, avec un aperçu en direct pendant que vous le configurez. Rien n’est créé tant que vous n’avez pas terminé.",
    tryPlaceholder: "Nom d’artiste ou de groupe",
    closeLead: "Construisez un fan club dont on a envie de faire partie.",
    footSentence: "FAN/IP fait parler des artistes et des créateurs par leurs propres fans.",
  },
};
