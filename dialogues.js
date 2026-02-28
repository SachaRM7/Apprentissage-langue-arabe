// Dialogues - MSA Conversationnel entre amis
// Niveau A1 - Bases

const LESSONS = [
    {
        id: 1,
        title: "Salutations",
        emoji: "👋",
        level: "A1",
        phrases: [
            {
                arabic: "السَّلَامُ عَلَيْكُم",
                transliteration: "as-salāmu ʿalaykum",
                translation: "Que la paix soit sur vous",
                audio: null,
                responses: [
                    { arabic: "وَعَلَيْكُمُ السَّلَام", translation: "Et sur vous la paix", correct: true },
                    { arabic: "شُكْراً", translation: "Merci", correct: false },
                    { arabic: "مَعَ السَّلَامَة", translation: "Au revoir", correct: false }
                ]
            },
            {
                arabic: "كَيْفَ حَالُكَ؟",
                transliteration: "kayfa ḥāluka?",
                translation: "Comment vas-tu ? (à un homme)",
                responses: [
                    { arabic: "بِخَيْر، الحَمْدُ لِلَّه", translation: "Bien, grâce à Dieu", correct: true },
                    { arabic: "أَهْلاً وَسَهْلاً", translation: "Bienvenue", correct: false },
                    { arabic: "إِلَى اللِّقَاء", translation: "À bientôt", correct: false }
                ]
            },
            {
                arabic: "كَيْفَ حَالُكِ؟",
                transliteration: "kayfa ḥāluki?",
                translation: "Comment vas-tu ? (à une femme)",
                responses: [
                    { arabic: "بِخَيْر، وَأَنْتَ؟", translation: "Bien, et toi ?", correct: true },
                    { arabic: "نَعَم", translation: "Oui", correct: false },
                    { arabic: "لَا", translation: "Non", correct: false }
                ]
            },
            {
                arabic: "مَا اسْمُكَ؟",
                transliteration: "mā ismuka?",
                translation: "Comment t'appelles-tu ?",
                responses: [
                    { arabic: "اِسْمِي أَحْمَد", translation: "Je m'appelle Ahmed", correct: true },
                    { arabic: "أَنَا مِنْ فَرَنْسَا", translation: "Je suis de France", correct: false },
                    { arabic: "عُمْرِي عِشْرُون سَنَة", translation: "J'ai 20 ans", correct: false }
                ]
            },
            {
                arabic: "تَشَرَّفْنَا",
                transliteration: "tasharrafnā",
                translation: "Enchanté (nous sommes honorés)",
                responses: [
                    { arabic: "الشَّرَفُ لِي", translation: "L'honneur est pour moi", correct: true },
                    { arabic: "شُكْراً جَزِيلاً", translation: "Merci beaucoup", correct: false },
                    { arabic: "مَعَ السَّلَامَة", translation: "Au revoir", correct: false }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Prendre des nouvelles",
        emoji: "💬",
        level: "A1",
        phrases: [
            {
                arabic: "كَيْفَ كَانَ يَوْمُكَ؟",
                transliteration: "kayfa kāna yawmuka?",
                translation: "Comment était ta journée ?",
                responses: [
                    { arabic: "كَانَ يَوْماً طَوِيلاً", translation: "C'était une longue journée", correct: true },
                    { arabic: "أَنَا جَائِع", translation: "J'ai faim", correct: false },
                    { arabic: "أَيْنَ أَنْتَ؟", translation: "Où es-tu ?", correct: false }
                ]
            },
            {
                arabic: "مَاذَا فَعَلْتَ اليَوْم؟",
                transliteration: "mādhā faʿalta al-yawm?",
                translation: "Qu'as-tu fait aujourd'hui ?",
                responses: [
                    { arabic: "عَمِلْتُ ثُمَّ اسْتَرَحْتُ", translation: "J'ai travaillé puis je me suis reposé", correct: true },
                    { arabic: "نَعَم، أُحِبُّ ذَلِكَ", translation: "Oui, j'aime ça", correct: false },
                    { arabic: "هَذَا صَدِيقِي", translation: "C'est mon ami", correct: false }
                ]
            },
            {
                arabic: "هَلْ أَنْتَ تَعْبَان؟",
                transliteration: "hal anta taʿbān?",
                translation: "Tu es fatigué ?",
                responses: [
                    { arabic: "نَعَم، قَلِيلاً", translation: "Oui, un peu", correct: true },
                    { arabic: "أَنَا سَعِيد", translation: "Je suis content", correct: false },
                    { arabic: "مَتَى؟", translation: "Quand ?", correct: false }
                ]
            },
            {
                arabic: "وَاللَّه، أَنَا مَشْغُول جِدّاً",
                transliteration: "wallāh, anā mashghūl jiddan",
                translation: "Wallah, je suis très occupé",
                responses: [
                    { arabic: "اللَّه يُعِينُكَ", translation: "Qu'Allah t'aide", correct: true },
                    { arabic: "مَاذَا تُرِيد؟", translation: "Que veux-tu ?", correct: false },
                    { arabic: "أَيْنَ تَذْهَب؟", translation: "Où vas-tu ?", correct: false }
                ]
            },
            {
                arabic: "كُلُّ شَيْء تَمَام؟",
                transliteration: "kullu shayʾ tamām?",
                translation: "Tout va bien ?",
                responses: [
                    { arabic: "الحَمْدُ لِلَّه، تَمَام", translation: "Grâce à Dieu, tout va bien", correct: true },
                    { arabic: "أُرِيدُ أَنْ أَنَام", translation: "Je veux dormir", correct: false },
                    { arabic: "لَا أَعْرِف", translation: "Je ne sais pas", correct: false }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Opinions & Avis",
        emoji: "🤔",
        level: "A1",
        phrases: [
            {
                arabic: "مَا رَأْيُكَ؟",
                transliteration: "mā raʾyuka?",
                translation: "Qu'en penses-tu ?",
                responses: [
                    { arabic: "أَظُنُّ أَنَّهُ جَيِّد", translation: "Je pense que c'est bien", correct: true },
                    { arabic: "أَنَا هُنَا", translation: "Je suis ici", correct: false },
                    { arabic: "كَمْ السَّاعَة؟", translation: "Quelle heure est-il ?", correct: false }
                ]
            },
            {
                arabic: "هَلْ أَعْجَبَكَ؟",
                transliteration: "hal aʿjabaka?",
                translation: "Ça t'a plu ?",
                responses: [
                    { arabic: "نَعَم، كَثِيراً!", translation: "Oui, beaucoup !", correct: true },
                    { arabic: "أَنَا جَائِع", translation: "J'ai faim", correct: false },
                    { arabic: "غَداً إِنْ شَاءَ اللَّه", translation: "Demain si Dieu veut", correct: false }
                ]
            },
            {
                arabic: "أَنَا مُوَافِق",
                transliteration: "anā muwāfiq",
                translation: "Je suis d'accord",
                responses: [
                    { arabic: "أَنَا أَيْضاً", translation: "Moi aussi", correct: true },
                    { arabic: "مَاذَا؟", translation: "Quoi ?", correct: false },
                    { arabic: "إِلَى أَيْنَ؟", translation: "Où ça ?", correct: false }
                ]
            },
            {
                arabic: "لَا أَظُنُّ ذَلِكَ",
                transliteration: "lā aẓunnu dhālika",
                translation: "Je ne pense pas",
                responses: [
                    { arabic: "لِمَاذَا؟", translation: "Pourquoi ?", correct: true },
                    { arabic: "شُكْراً", translation: "Merci", correct: false },
                    { arabic: "تَمَام", translation: "D'accord", correct: false }
                ]
            },
            {
                arabic: "صَرَاحَةً، مَا أَدْرِي",
                transliteration: "ṣarāḥatan, mā adrī",
                translation: "Franchement, je sais pas",
                responses: [
                    { arabic: "عَادِي، لَا مُشْكِلَة", translation: "Normal, pas de souci", correct: true },
                    { arabic: "مَرْحَباً", translation: "Bienvenue", correct: false },
                    { arabic: "كَيْفَ؟", translation: "Comment ?", correct: false }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Faire des plans",
        emoji: "📅",
        level: "A1",
        phrases: [
            {
                arabic: "مَاذَا سَتَفْعَلُ غَداً؟",
                transliteration: "mādhā sataƒʿalu ghadan?",
                translation: "Qu'est-ce que tu feras demain ?",
                responses: [
                    { arabic: "سَأَذْهَبُ إِلَى العَمَل", translation: "J'irai au travail", correct: true },
                    { arabic: "كُنْتُ فِي البَيْت", translation: "J'étais à la maison", correct: false },
                    { arabic: "هَذَا لَذِيذ", translation: "C'est délicieux", correct: false }
                ]
            },
            {
                arabic: "هَلْ أَنْتَ فَاضِي السَّبْت؟",
                transliteration: "hal anta fāḍī as-sabt?",
                translation: "T'es libre samedi ?",
                responses: [
                    { arabic: "إِنْ شَاءَ اللَّه، نَعَم", translation: "Si Dieu veut, oui", correct: true },
                    { arabic: "كَانَ أَمْس", translation: "C'était hier", correct: false },
                    { arabic: "أَنَا تَعْبَان", translation: "Je suis fatigué", correct: false }
                ]
            },
            {
                arabic: "نَتْقَابَل السَّاعَة كَم؟",
                transliteration: "natqābal as-sāʿa kam?",
                translation: "On se retrouve à quelle heure ?",
                responses: [
                    { arabic: "السَّاعَة خَمْسَة، مَا رَأْيُكَ؟", translation: "À 5h, qu'en dis-tu ?", correct: true },
                    { arabic: "أَنَا مِنْ المَغْرِب", translation: "Je suis du Maroc", correct: false },
                    { arabic: "نَعَم، صَحِيح", translation: "Oui, c'est vrai", correct: false }
                ]
            },
            {
                arabic: "أَيْنَ نَلْتَقِي؟",
                transliteration: "ayna naltaqī?",
                translation: "Où on se retrouve ?",
                responses: [
                    { arabic: "عِنْدَ المَقْهَى", translation: "Au café", correct: true },
                    { arabic: "أَمْس", translation: "Hier", correct: false },
                    { arabic: "لِأَنَّنِي مَشْغُول", translation: "Parce que je suis occupé", correct: false }
                ]
            },
            {
                arabic: "يَلَّا، مُتَّفِقِين!",
                transliteration: "yallā, muttafiqīn!",
                translation: "Allez, c'est convenu !",
                responses: [
                    { arabic: "تَمَام، أَرَاكَ هُنَاك", translation: "OK, je te vois là-bas", correct: true },
                    { arabic: "لَا أُحِبّ", translation: "Je n'aime pas", correct: false },
                    { arabic: "مَنْ هَذَا؟", translation: "C'est qui ?", correct: false }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Émotions & Réactions",
        emoji: "😊",
        level: "A1",
        phrases: [
            {
                arabic: "أَنَا سَعِيد جِدّاً!",
                transliteration: "anā saʿīd jiddan!",
                translation: "Je suis très content !",
                responses: [
                    { arabic: "مَا شَاءَ اللَّه! لِمَاذَا؟", translation: "Mashallah ! Pourquoi ?", correct: true },
                    { arabic: "أَنَا نَائِم", translation: "Je dors", correct: false },
                    { arabic: "كَمْ؟", translation: "Combien ?", correct: false }
                ]
            },
            {
                arabic: "وَاللَّه زَهَقْت",
                transliteration: "wallāh zahaqt",
                translation: "Wallah j'en ai marre",
                responses: [
                    { arabic: "لَيْش؟ مَا الَّذِي حَدَث؟", translation: "Pourquoi ? Qu'est-ce qui s'est passé ?", correct: true },
                    { arabic: "مَسَاء الخَيْر", translation: "Bonsoir", correct: false },
                    { arabic: "هَذَا كِتَابِي", translation: "C'est mon livre", correct: false }
                ]
            },
            {
                arabic: "لَا تَقْلَق",
                transliteration: "lā taqlaq",
                translation: "T'inquiète pas",
                responses: [
                    { arabic: "شُكْراً، أَنْتَ صَدِيق حَقِيقِي", translation: "Merci, t'es un vrai ami", correct: true },
                    { arabic: "أَيْنَ المَطَار؟", translation: "Où est l'aéroport ?", correct: false },
                    { arabic: "هَلْ تُحِبّ القَهْوَة؟", translation: "Tu aimes le café ?", correct: false }
                ]
            },
            {
                arabic: "مَبْرُوك!",
                transliteration: "mabrūk!",
                translation: "Félicitations !",
                responses: [
                    { arabic: "اللَّه يُبَارِك فِيك", translation: "Qu'Allah te bénisse", correct: true },
                    { arabic: "أَنَا مَرِيض", translation: "Je suis malade", correct: false },
                    { arabic: "مَتَى وَصَلْت؟", translation: "Quand es-tu arrivé ?", correct: false }
                ]
            },
            {
                arabic: "سَامِحْنِي، كُنْتُ مُخْطِئاً",
                transliteration: "sāmiḥnī, kuntu mukhṭiʾan",
                translation: "Pardonne-moi, j'avais tort",
                responses: [
                    { arabic: "عَادِي، كُلُّنَا نُخْطِئ", translation: "Normal, on fait tous des erreurs", correct: true },
                    { arabic: "صَبَاح الخَيْر", translation: "Bonjour", correct: false },
                    { arabic: "هَذَا غَالِي", translation: "C'est cher", correct: false }
                ]
            }
        ]
    }
];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LESSONS;
}
