// CURRICULUM - Parcours structuré MSA Conversationnel
// Chaque module débloque le suivant. Chaque leçon doit être maîtrisée (80%+) pour avancer.

const CURRICULUM = {
    // Métadonnées
    version: "1.0",
    title: "MSA Conversationnel - Parler avec des amis",
    estimatedMonths: 6,
    
    // Modules (phases)
    modules: [
        // ═══════════════════════════════════════════════════════════════
        // MODULE 1 : LES BASES ABSOLUES
        // ═══════════════════════════════════════════════════════════════
        {
            id: "m1",
            title: "Les bases",
            description: "Saluer, se présenter, les premiers échanges",
            emoji: "🌱",
            requiredMastery: 80, // % pour débloquer le module suivant
            locked: false, // Premier module toujours débloqué
            lessons: [
                {
                    id: "m1-l1",
                    title: "السَّلَام - La salutation",
                    objective: "Savoir saluer et répondre à une salutation",
                    concepts: ["السَّلَامُ عَلَيْكُم", "وَعَلَيْكُمُ السَّلَام"],
                    phrases: [
                        {
                            arabic: "السَّلَامُ عَلَيْكُم",
                            transliteration: "as-salāmu ʿalaykum",
                            translation: "Que la paix soit sur vous",
                            type: "learn", // learn = à apprendre, practice = révision
                            responses: [
                                { arabic: "وَعَلَيْكُمُ السَّلَام", translation: "Et sur vous la paix", correct: true },
                                { arabic: "شُكْراً", translation: "Merci", correct: false },
                                { arabic: "مَعَ السَّلَامَة", translation: "Au revoir", correct: false }
                            ]
                        },
                        {
                            arabic: "صَبَاحُ الخَيْر",
                            transliteration: "ṣabāḥu l-khayr",
                            translation: "Bonjour (matin)",
                            type: "learn",
                            responses: [
                                { arabic: "صَبَاحُ النُّور", translation: "Bonjour (réponse)", correct: true },
                                { arabic: "مَسَاءُ الخَيْر", translation: "Bonsoir", correct: false },
                                { arabic: "أَهْلاً", translation: "Salut", correct: false }
                            ]
                        },
                        {
                            arabic: "مَسَاءُ الخَيْر",
                            transliteration: "masāʾu l-khayr",
                            translation: "Bonsoir",
                            type: "learn",
                            responses: [
                                { arabic: "مَسَاءُ النُّور", translation: "Bonsoir (réponse)", correct: true },
                                { arabic: "صَبَاحُ الخَيْر", translation: "Bonjour", correct: false },
                                { arabic: "شُكْراً", translation: "Merci", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m1-l2",
                    title: "كَيْفَ حَالُك - Comment vas-tu",
                    objective: "Demander et donner des nouvelles",
                    requires: ["m1-l1"], // Prérequis
                    concepts: ["كَيْفَ", "حَال", "بِخَيْر", "الحَمْدُ لِلَّه"],
                    phrases: [
                        {
                            arabic: "كَيْفَ حَالُكَ؟",
                            transliteration: "kayfa ḥāluka?",
                            translation: "Comment vas-tu ? (à un homme)",
                            gender: "masculine",
                            type: "learn",
                            grammar: "كَيْفَ = comment, حَال = état, ـكَ = ton (masc.)",
                            responses: [
                                { arabic: "بِخَيْر، الحَمْدُ لِلَّه", translation: "Bien, grâce à Dieu", correct: true },
                                { arabic: "مَعَ السَّلَامَة", translation: "Au revoir", correct: false },
                                { arabic: "أَهْلاً وَسَهْلاً", translation: "Bienvenue", correct: false }
                            ]
                        },
                        {
                            arabic: "كَيْفَ حَالُكِ؟",
                            transliteration: "kayfa ḥāluki?",
                            translation: "Comment vas-tu ? (à une femme)",
                            gender: "feminine",
                            type: "learn",
                            grammar: "ـكِ = ton (fém.) - La seule différence !",
                            responses: [
                                { arabic: "بِخَيْر، وَأَنْتَ؟", translation: "Bien, et toi ?", correct: true },
                                { arabic: "نَعَم", translation: "Oui", correct: false },
                                { arabic: "لَا", translation: "Non", correct: false }
                            ]
                        },
                        {
                            arabic: "الحَمْدُ لِلَّه، وَأَنْتَ؟",
                            transliteration: "al-ḥamdu li-llāh, wa-anta?",
                            translation: "Grâce à Dieu, et toi ?",
                            type: "learn",
                            grammar: "وَ = et, أَنْتَ = toi (masc.)",
                            responses: [
                                { arabic: "بِخَيْر أَيْضاً", translation: "Bien aussi", correct: true },
                                { arabic: "مَاذَا؟", translation: "Quoi ?", correct: false },
                                { arabic: "أَيْنَ؟", translation: "Où ?", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m1-l3",
                    title: "التَّعَارُف - Se présenter",
                    objective: "Dire son nom et demander celui de l'autre",
                    requires: ["m1-l2"],
                    concepts: ["اِسْم", "أَنَا", "مِن"],
                    phrases: [
                        {
                            arabic: "مَا اسْمُكَ؟",
                            transliteration: "mā ismuka?",
                            translation: "Comment t'appelles-tu ?",
                            type: "learn",
                            grammar: "مَا = quoi, اِسْم = nom",
                            responses: [
                                { arabic: "اِسْمِي سَاشَا", translation: "Je m'appelle Sacha", correct: true },
                                { arabic: "أَنَا مِن فَرَنْسَا", translation: "Je suis de France", correct: false },
                                { arabic: "عُمْرِي ٢٠ سَنَة", translation: "J'ai 20 ans", correct: false }
                            ]
                        },
                        {
                            arabic: "أَنَا اسْمِي أَحْمَد",
                            transliteration: "anā ismī aḥmad",
                            translation: "Moi je m'appelle Ahmed",
                            type: "learn",
                            grammar: "أَنَا = moi/je, اسْمِي = mon nom",
                            responses: [
                                { arabic: "تَشَرَّفْنَا يَا أَحْمَد", translation: "Enchanté Ahmed", correct: true },
                                { arabic: "لَا أَعْرِف", translation: "Je ne sais pas", correct: false },
                                { arabic: "مَتَى؟", translation: "Quand ?", correct: false }
                            ]
                        },
                        {
                            arabic: "تَشَرَّفْنَا",
                            transliteration: "tasharrafnā",
                            translation: "Enchanté (nous sommes honorés)",
                            type: "learn",
                            responses: [
                                { arabic: "الشَّرَفُ لِي", translation: "L'honneur est pour moi", correct: true },
                                { arabic: "شُكْراً جَزِيلاً", translation: "Merci beaucoup", correct: false },
                                { arabic: "إِلَى اللِّقَاء", translation: "À bientôt", correct: false }
                            ]
                        },
                        {
                            arabic: "مِن أَيْنَ أَنْتَ؟",
                            transliteration: "min ayna anta?",
                            translation: "D'où viens-tu ?",
                            type: "learn",
                            grammar: "مِن = de, أَيْنَ = où",
                            responses: [
                                { arabic: "أَنَا مِن فَرَنْسَا", translation: "Je suis de France", correct: true },
                                { arabic: "اِسْمِي سَاشَا", translation: "Je m'appelle Sacha", correct: false },
                                { arabic: "نَعَم، صَحِيح", translation: "Oui, c'est vrai", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m1-l4",
                    title: "الوَدَاع - Se dire au revoir",
                    objective: "Terminer une conversation poliment",
                    requires: ["m1-l3"],
                    concepts: ["مَعَ السَّلَامَة", "إِلَى اللِّقَاء"],
                    phrases: [
                        {
                            arabic: "مَعَ السَّلَامَة",
                            transliteration: "maʿa s-salāma",
                            translation: "Au revoir (avec la paix)",
                            type: "learn",
                            responses: [
                                { arabic: "اللَّه يَسَلِّمَك", translation: "Qu'Allah te protège", correct: true },
                                { arabic: "صَبَاحُ الخَيْر", translation: "Bonjour", correct: false },
                                { arabic: "كَيْفَ حَالُكَ؟", translation: "Comment vas-tu ?", correct: false }
                            ]
                        },
                        {
                            arabic: "إِلَى اللِّقَاء",
                            transliteration: "ilā l-liqāʾ",
                            translation: "À bientôt",
                            type: "learn",
                            responses: [
                                { arabic: "إِنْ شَاءَ اللَّه", translation: "Si Dieu le veut", correct: true },
                                { arabic: "مَاذَا؟", translation: "Quoi ?", correct: false },
                                { arabic: "لِمَاذَا؟", translation: "Pourquoi ?", correct: false }
                            ]
                        },
                        {
                            arabic: "أَرَاكَ لَاحِقاً",
                            transliteration: "arāka lāḥiqan",
                            translation: "Je te vois plus tard",
                            type: "learn",
                            responses: [
                                { arabic: "إِنْ شَاءَ اللَّه، يَلَّا", translation: "Si Dieu veut, allez", correct: true },
                                { arabic: "مَرْحَباً", translation: "Bienvenue", correct: false },
                                { arabic: "أَهْلاً", translation: "Salut", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m1-review",
                    title: "🔄 Révision Module 1",
                    objective: "Réviser tout ce que tu as appris",
                    requires: ["m1-l4"],
                    isReview: true,
                    // Les phrases de révision sont générées dynamiquement
                    // à partir des leçons précédentes du module
                }
            ]
        },
        
        // ═══════════════════════════════════════════════════════════════
        // MODULE 2 : LES PRONOMS & QUESTIONS
        // ═══════════════════════════════════════════════════════════════
        {
            id: "m2",
            title: "Qui, quoi, où ?",
            description: "Les pronoms personnels et les questions de base",
            emoji: "❓",
            requiredMastery: 80,
            locked: true,
            requires: ["m1"], // Nécessite module 1 complété
            lessons: [
                {
                    id: "m2-l1",
                    title: "الضَّمَائِر - Les pronoms",
                    objective: "Dire je, tu, il, elle...",
                    concepts: ["أَنَا", "أَنْتَ", "أَنْتِ", "هُوَ", "هِيَ"],
                    phrases: [
                        {
                            arabic: "أَنَا طَالِب",
                            transliteration: "anā ṭālib",
                            translation: "Je suis étudiant",
                            type: "learn",
                            grammar: "أَنَا = je/moi. Pas de verbe 'être' au présent !",
                            responses: [
                                { arabic: "وَأَنَا أَيْضاً", translation: "Moi aussi", correct: true },
                                { arabic: "هُوَ طَالِب", translation: "Il est étudiant", correct: false },
                                { arabic: "مَتَى؟", translation: "Quand ?", correct: false }
                            ]
                        },
                        {
                            arabic: "هُوَ صَدِيقِي",
                            transliteration: "huwa ṣadīqī",
                            translation: "C'est mon ami / Il est mon ami",
                            type: "learn",
                            grammar: "هُوَ = il/lui, صَدِيق = ami, ـي = mon",
                            responses: [
                                { arabic: "تَشَرَّفْنَا", translation: "Enchanté", correct: true },
                                { arabic: "أَنَا جَائِع", translation: "J'ai faim", correct: false },
                                { arabic: "لَا أُحِبّ", translation: "Je n'aime pas", correct: false }
                            ]
                        },
                        {
                            arabic: "هِيَ أُخْتِي",
                            transliteration: "hiya ukhtī",
                            translation: "Elle est ma sœur",
                            type: "learn",
                            grammar: "هِيَ = elle, أُخْت = sœur",
                            responses: [
                                { arabic: "مَا شَاءَ اللَّه", translation: "Mashallah", correct: true },
                                { arabic: "أَيْنَ؟", translation: "Où ?", correct: false },
                                { arabic: "كَمْ؟", translation: "Combien ?", correct: false }
                            ]
                        },
                        {
                            arabic: "نَحْنُ أَصْدِقَاء",
                            transliteration: "naḥnu aṣdiqāʾ",
                            translation: "Nous sommes amis",
                            type: "learn",
                            grammar: "نَحْنُ = nous, أَصْدِقَاء = amis (pluriel)",
                            responses: [
                                { arabic: "الحَمْدُ لِلَّه", translation: "Grâce à Dieu", correct: true },
                                { arabic: "هُوَ مَشْغُول", translation: "Il est occupé", correct: false },
                                { arabic: "لِمَاذَا؟", translation: "Pourquoi ?", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m2-l2",
                    title: "أَسْئِلَة بَسِيطَة - Questions simples",
                    objective: "Poser les questions de base",
                    requires: ["m2-l1"],
                    concepts: ["مَاذَا", "أَيْنَ", "مَتَى", "لِمَاذَا", "كَيْفَ"],
                    phrases: [
                        {
                            arabic: "مَاذَا تَفْعَل؟",
                            transliteration: "mādhā tafʿal?",
                            translation: "Qu'est-ce que tu fais ?",
                            type: "learn",
                            grammar: "مَاذَا = quoi, تَفْعَل = tu fais",
                            responses: [
                                { arabic: "أَعْمَل", translation: "Je travaille", correct: true },
                                { arabic: "أَنَا مِن مِصْر", translation: "Je suis d'Égypte", correct: false },
                                { arabic: "اِسْمِي عَلِي", translation: "Je m'appelle Ali", correct: false }
                            ]
                        },
                        {
                            arabic: "أَيْنَ أَنْتَ الآن؟",
                            transliteration: "ayna anta al-ān?",
                            translation: "Où es-tu maintenant ?",
                            type: "learn",
                            grammar: "أَيْنَ = où, الآن = maintenant",
                            responses: [
                                { arabic: "أَنَا فِي البَيْت", translation: "Je suis à la maison", correct: true },
                                { arabic: "أَنَا بِخَيْر", translation: "Je vais bien", correct: false },
                                { arabic: "غَداً", translation: "Demain", correct: false }
                            ]
                        },
                        {
                            arabic: "مَتَى تَرْجِع؟",
                            transliteration: "matā tarjiʿ?",
                            translation: "Quand tu reviens ?",
                            type: "learn",
                            grammar: "مَتَى = quand, تَرْجِع = tu reviens",
                            responses: [
                                { arabic: "بَعْدَ سَاعَة إِنْ شَاءَ اللَّه", translation: "Dans une heure si Dieu veut", correct: true },
                                { arabic: "فِي المَدْرَسَة", translation: "À l'école", correct: false },
                                { arabic: "نَعَم", translation: "Oui", correct: false }
                            ]
                        },
                        {
                            arabic: "لِمَاذَا؟",
                            transliteration: "limādhā?",
                            translation: "Pourquoi ?",
                            type: "learn",
                            responses: [
                                { arabic: "لِأَنَّنِي مَشْغُول", translation: "Parce que je suis occupé", correct: true },
                                { arabic: "هُنَا", translation: "Ici", correct: false },
                                { arabic: "الآن", translation: "Maintenant", correct: false }
                            ]
                        }
                    ]
                }
            ]
        },
        
        // ═══════════════════════════════════════════════════════════════
        // MODULE 3 : PARLER DE SOI
        // ═══════════════════════════════════════════════════════════════
        {
            id: "m3",
            title: "Parler de soi",
            description: "Exprimer ses émotions, son état, ses goûts",
            emoji: "💭",
            requiredMastery: 80,
            locked: true,
            requires: ["m2"],
            lessons: [
                {
                    id: "m3-l1",
                    title: "كَيْفَ أَنْتَ - États et émotions",
                    objective: "Dire comment tu te sens",
                    concepts: ["تَعْبَان", "سَعِيد", "جَائِع", "مَشْغُول"],
                    phrases: [
                        {
                            arabic: "أَنَا تَعْبَان",
                            transliteration: "anā taʿbān",
                            translation: "Je suis fatigué",
                            type: "learn",
                            responses: [
                                { arabic: "اِرْتَاح شْوَيّ", translation: "Repose-toi un peu", correct: true },
                                { arabic: "أَيْنَ أَنْتَ؟", translation: "Où es-tu ?", correct: false },
                                { arabic: "كَمْ السَّاعَة؟", translation: "Quelle heure ?", correct: false }
                            ]
                        },
                        {
                            arabic: "أَنَا جَائِع جِدّاً",
                            transliteration: "anā jāʾiʿ jiddan",
                            translation: "J'ai très faim",
                            type: "learn",
                            grammar: "جِدّاً = très/beaucoup",
                            responses: [
                                { arabic: "يَلَّا نَأْكُل", translation: "Allez on mange", correct: true },
                                { arabic: "مَعَ السَّلَامَة", translation: "Au revoir", correct: false },
                                { arabic: "صَبَاحُ الخَيْر", translation: "Bonjour", correct: false }
                            ]
                        },
                        {
                            arabic: "وَاللَّه أَنَا مَبْسُوط",
                            transliteration: "wallāh anā mabsūṭ",
                            translation: "Wallah je suis content",
                            type: "learn",
                            responses: [
                                { arabic: "الحَمْدُ لِلَّه! لَيْش؟", translation: "Hamdoulilah ! Pourquoi ?", correct: true },
                                { arabic: "أَنَا تَعْبَان", translation: "Je suis fatigué", correct: false },
                                { arabic: "مَتَى؟", translation: "Quand ?", correct: false }
                            ]
                        }
                    ]
                },
                {
                    id: "m3-l2",
                    title: "أُحِبّ / لَا أُحِبّ - J'aime / J'aime pas",
                    objective: "Exprimer ses goûts",
                    requires: ["m3-l1"],
                    concepts: ["أُحِبّ", "لَا أُحِبّ", "أُفَضِّل"],
                    phrases: [
                        {
                            arabic: "أُحِبُّ القَهْوَة",
                            transliteration: "uḥibbu l-qahwa",
                            translation: "J'aime le café",
                            type: "learn",
                            grammar: "أُحِبّ = j'aime, القَهْوَة = le café",
                            responses: [
                                { arabic: "وَأَنَا أَيْضاً!", translation: "Moi aussi !", correct: true },
                                { arabic: "مَاذَا؟", translation: "Quoi ?", correct: false },
                                { arabic: "أَيْنَ؟", translation: "Où ?", correct: false }
                            ]
                        },
                        {
                            arabic: "لَا أُحِبُّ البَرْد",
                            transliteration: "lā uḥibbu l-bard",
                            translation: "Je n'aime pas le froid",
                            type: "learn",
                            grammar: "لَا = ne pas (négation simple)",
                            responses: [
                                { arabic: "أَنَا أَيْضاً، أُفَضِّلُ الحَرّ", translation: "Moi aussi, je préfère la chaleur", correct: true },
                                { arabic: "شُكْراً", translation: "Merci", correct: false },
                                { arabic: "تَشَرَّفْنَا", translation: "Enchanté", correct: false }
                            ]
                        },
                        {
                            arabic: "مَا هِوَايَاتُكَ؟",
                            transliteration: "mā hiwāyātuka?",
                            translation: "C'est quoi tes hobbies ?",
                            type: "learn",
                            responses: [
                                { arabic: "أُحِبُّ القِرَاءَة وَالرِّيَاضَة", translation: "J'aime la lecture et le sport", correct: true },
                                { arabic: "أَنَا مِن فَرَنْسَا", translation: "Je suis de France", correct: false },
                                { arabic: "اِسْمِي سَاشَا", translation: "Je m'appelle Sacha", correct: false }
                            ]
                        }
                    ]
                }
            ]
        }
        
        // Modules 4-6 à ajouter : Verbes, Temps, Conversations avancées
    ]
};

// Système de progression
const PROGRESS_SYSTEM = {
    // Pour maîtriser une phrase
    phraseStates: {
        NEW: 0,        // Jamais vue
        LEARNING: 1,   // Vue 1-2 fois
        FAMILIAR: 2,   // Vue 3-4 fois, >50% correct
        MASTERED: 3    // Vue 5+ fois, >80% correct
    },
    
    // Calcul du score de maîtrise
    calculateMastery: (correctCount, totalAttempts) => {
        if (totalAttempts === 0) return 0;
        return Math.round((correctCount / totalAttempts) * 100);
    },
    
    // Répétition espacée (intervalles en heures)
    spacedRepetition: {
        NEW: 0,        // Immédiat
        LEARNING: 4,   // 4 heures
        FAMILIAR: 24,  // 1 jour
        MASTERED: 72   // 3 jours
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CURRICULUM, PROGRESS_SYSTEM };
}
