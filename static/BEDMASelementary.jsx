import React, { useState, useEffect } from 'react';
import { RefreshCw, Undo2, Lightbulb, ChevronRight, Globe, BookOpen, Compass, Tent, Sparkles, MoveRight, Layers, CircleDot, CheckCircle, Map, Star, Award, Trash2 } from 'lucide-react';

// --- TRANSLATIONS ---
const i18n = {
  en: {
    TITLE: "BEDMAS: Patterns & Balance",
    TAB_LEARN: "The Teachings",
    TAB_PLAY: "Find Balance",
    TAB_MISSING: "Read the Path",
    TAB_BUILD: "Beadwork Builder",
    TAB_JOURNEY: "The Journey",
    GOAL: "Target Balance",
    HINT: "Guide",
    UNDO: "Step Back",
    RESET: "Start Over",
    SUCCESS: "Harmony Reached! 🌟",
    NEXT: "Next Path",
    FINISH: "You walk with Wisdom! 🏆",
    STAGE: "Level",
    ERROR: "Oops! 🙈 Check the natural order, or follow Left-to-Right!",
    RATING: "Harmony Level:",
    GOLD: "⭐⭐⭐ Perfect Balance!",
    SILVER: "⭐⭐ Strong Path!",
    BRONZE: "⭐ Growing Wisdom!",
    
    RULE_TITLE: "The Natural Order of Math",
    RULE_1_TITLE: "1. The Foundation Poles ( )",
    RULE_1_DESC: "Like raising a Tipi, the tripod poles go first! Always solve what is inside the brackets before anything else.",
    RULE_2_TITLE: "2. The Support Poles × ÷",
    RULE_2_DESC: "These add strength to the structure. Do these next, reading from Left-to-Right like tracking footprints in the snow.",
    RULE_3_TITLE: "3. The Canvas Cover + -",
    RULE_3_DESC: "The final layer that completes the lodge. Do these last, flowing from Left-to-Right.",
    
    EXAMPLE_TITLE: "Following the Order:",
    EXAMPLE_START: "Start: 5 + (2 × 3)",
    EXAMPLE_S1: "Step 1: The Foundation! (2 × 3 = 6)",
    EXAMPLE_S2: "Step 2: The Cover! 5 + 6",
    EXAMPLE_END: "Final Balance: 11",
    EXAMPLE2_START: "Start: 10 - 4 ÷ 2",
    EXAMPLE2_S1: "Step 1: The Supports! (4 ÷ 2 = 2)",
    EXAMPLE2_S2: "Step 2: The Cover! 10 - 2",
    EXAMPLE2_END: "Final Balance: 8",
    
    ACKNOWLEDGEMENT: "Inspired by the mathematical brilliance of Prairie Indigenous traditions—from the structural engineering of the Tipi to the algorithmic beauty of Métis and Cree beadwork.",

    PLAY_HOWTO_TITLE: "Find Balance: Collapse the Equation",
    PLAY_HOWTO_DESC: "Click the math symbols in the correct natural order to balance the numbers and reach the target!",
    MISSING_HOWTO_TITLE: "Read the Path: Find the Connections",
    MISSING_HOWTO_DESC: "The footprints (numbers) are here, but the connections are hidden. Drag the right symbols to complete the journey.",
    BUILD_HOWTO_TITLE: "Beadwork Builder: Weave the Pattern",
    BUILD_HOWTO_DESC: "Like a beadwork artist, you are the creator! Drag ALL your beads (numbers) and thread (symbols) to weave the perfect pattern.",
    
    LEVEL_SELECT: "Choose Your Path",
    LEVEL: "Level",
    QUESTION: "Pattern",
    LEVEL_COMPLETE: "Path Completed! 🎉",
    BACK_TO_LEVELS: "Back to Paths",
    MISSING_RULES: "Tracking: Drag and drop (or click) the missing connections to reach the destination.",
    BUILD_RULES: "Weaving: Drag and drop ALL beads from your pouch to build a balanced pattern!",
    TEST_MAGIC: "Check Pattern ✨",
    CLEAR: "Clear Loom",
    INVALID_MATH: "Oops! That pattern doesn't flow correctly. Check your thread (symbols)!",
    NOT_ALL_NUMS: "You must use ALL the beads in your pouch!",
    
    TARGET_LABEL: "Target:",
    POUCH_LABEL: "Pouch:",
    WEAVE_LABEL: "Weave:",
    EX_LABEL: "Ex:",
    DROP_HERE: "Drop items here...",
    WEAVE_HERE: "Weave items here...",

    JOURNEY_TITLE: "Your Complete Journey",
    JOURNEY_DESC: "See the paths you have walked and the wisdom you have gathered.",
    RESET_ALL: "Reset All Progress",
    STARS_COLLECTED: "Stars Gathered",
    TOTAL_MASTERY: "Total Mastery"
  },
  fr: {
    TITLE: "PEDMAS : Motifs et Équilibre",
    TAB_LEARN: "Les Enseignements",
    TAB_PLAY: "Trouver l'Équilibre",
    TAB_MISSING: "Lire le Chemin",
    TAB_BUILD: "Perlage",
    TAB_JOURNEY: "Le Parcours",
    GOAL: "Équilibre Cible",
    HINT: "Guide",
    UNDO: "Reculer",
    RESET: "Recommencer",
    SUCCESS: "Harmonie Atteinte ! 🌟",
    NEXT: "Prochain Chemin",
    FINISH: "Tu marches avec Sagesse ! 🏆",
    STAGE: "Niveau",
    ERROR: "Oups ! 🙈 Vérifie l'ordre naturel, ou va de gauche à droite !",
    RATING: "Niveau d'Harmonie :",
    GOLD: "⭐⭐⭐ Équilibre Parfait !",
    SILVER: "⭐⭐ Chemin Solide !",
    BRONZE: "⭐ Sagesse Grandissante !",
    
    RULE_TITLE: "L'Ordre Naturel des Maths",
    RULE_1_TITLE: "1. Les Perches de Fondation ( )",
    RULE_1_DESC: "Comme pour monter un Tipi, le trépied passe en premier ! Résous TOUJOURS les parenthèses en premier.",
    RULE_2_TITLE: "2. Les Perches de Soutien × ÷",
    RULE_2_DESC: "Elles ajoutent de la force. Fais-les ensuite, de gauche à droite, comme suivre des empreintes dans la neige.",
    RULE_3_TITLE: "3. La Toile de Couverture + -",
    RULE_3_DESC: "La couche finale. Fais-les en dernier, en coulant de gauche à droite.",
    
    EXAMPLE_TITLE: "Suivre l'Ordre :",
    EXAMPLE_START: "Départ : 5 + (2 × 3)",
    EXAMPLE_S1: "Étape 1 : La Fondation ! (2 × 3 = 6)",
    EXAMPLE_S2: "Étape 2 : La Couverture ! 5 + 6",
    EXAMPLE_END: "Équilibre Final : 11",
    EXAMPLE2_START: "Départ : 10 - 4 ÷ 2",
    EXAMPLE2_S1: "Étape 1 : Les Soutiens ! (4 ÷ 2 = 2)",
    EXAMPLE2_S2: "Étape 2 : La Couverture ! 10 - 2",
    EXAMPLE2_END: "Équilibre Final : 8",
    
    ACKNOWLEDGEMENT: "Inspiré par le génie mathématique des traditions autochtones des Prairies—de l'ingénierie structurelle du Tipi à la beauté algorithmique du perlage Métis et Cri.",

    PLAY_HOWTO_TITLE: "Trouver l'Équilibre : Fusionne",
    PLAY_HOWTO_DESC: "Clique sur les symboles dans le bon ordre naturel pour équilibrer les nombres et atteindre la cible !",
    MISSING_HOWTO_TITLE: "Lire le Chemin : Trouve les Liens",
    MISSING_HOWTO_DESC: "Les empreintes (nombres) sont là, mais les liens manquent. Glisse les bons symboles pour terminer le voyage.",
    BUILD_HOWTO_TITLE: "Perlage : Tisse le Motif",
    BUILD_HOWTO_DESC: "Comme un artisan du perlage, tu es le créateur ! Utilise TOUTES tes perles (nombres) pour tisser le motif parfait.",
    
    LEVEL_SELECT: "Choisis ton Chemin",
    LEVEL: "Niveau",
    QUESTION: "Motif",
    LEVEL_COMPLETE: "Chemin Terminé ! 🎉",
    BACK_TO_LEVELS: "Retour aux Chemins",
    MISSING_RULES: "Pistage : Glisse et dépose les liens manquants pour atteindre la destination.",
    BUILD_RULES: "Tissage : Glisse et dépose TOUTES les perles de ton sac pour construire un motif équilibré !",
    TEST_MAGIC: "Vérifier le Motif ✨",
    CLEAR: "Vider le Métier",
    INVALID_MATH: "Oups ! Ce motif ne coule pas bien. Vérifie ton fil (symboles) !",
    NOT_ALL_NUMS: "Tu dois utiliser TOUTES les perles de ton sac !",
    
    TARGET_LABEL: "Cible :",
    POUCH_LABEL: "Sac :",
    WEAVE_LABEL: "Tisse :",
    EX_LABEL: "Ex :",
    DROP_HERE: "Dépose les objets ici...",
    WEAVE_HERE: "Tisse les perles ici...",

    JOURNEY_TITLE: "Ton Parcours Global",
    JOURNEY_DESC: "Regarde les chemins que tu as parcourus et la sagesse acquise.",
    RESET_ALL: "Tout Réinitialiser",
    STARS_COLLECTED: "Étoiles Obtenues",
    TOTAL_MASTERY: "Maîtrise Totale"
  },
  oj: {
    TITLE: "BEDMAS: Gwayako-Bimaadiziwin",
    TAB_LEARN: "Kikinoomaagewin",
    TAB_PLAY: "Odaminowin",
    TAB_MISSING: "Mikan",
    TAB_BUILD: "Ozhitoon",
    TAB_JOURNEY: "Bimaadiziwin",
    GOAL: "Inaakonigewin",
    HINT: "Waabanda'iwewin",
    UNDO: "Azhegiiwe",
    RESET: "Maajitaan Minawaa",
    SUCCESS: "Minose! 🌟",
    NEXT: "Niigaan",
    FINISH: "Gichi-Nitaawigiwin! 🏆",
    STAGE: "Ishkwaandem",
    ERROR: "Waniikwe! 🙈 Gwayakochigen, gemaa namanjinikaang onji maajitaan!",
    RATING: "Ezhi-minoseg:",
    GOLD: "⭐⭐⭐ Gwayakose!",
    SILVER: "⭐⭐ Mashkawikaa miikana!",
    BRONZE: "⭐ Nitaawigi nibwaakaawin!",
    RULE_TITLE: "Gwayako-inaakonigewin",
    RULE_1_TITLE: "1. Apabishimowin ( )",
    RULE_1_DESC: "Wii-ozhitooyin wikiwam, niigaan mitigook apabishimowin! Nitam ozhitoon aawan ( ) biinjina.",
    RULE_2_TITLE: "2. Naabishimowin × ÷",
    RULE_2_DESC: "O'ow mashkawiziwin. Ozhitoon namanjinikaang onji, bimi-wabandamowin.",
    RULE_3_TITLE: "3. Apishimon + -",
    RULE_3_DESC: "Ishkwaaj apishimon. Ishkwaatch ozhitoon, namanjinikaang onji.",
    EXAMPLE_TITLE: "Mitaawendamowin:",
    EXAMPLE_START: "Maajitaan: 5 + (2 × 3)",
    EXAMPLE_S1: "Nitam: Apabishimowin! (2 × 3 = 6)",
    EXAMPLE_S2: "Eko-niizh: Apishimon! 5 + 6",
    EXAMPLE_END: "Ishkwaaj Minose: 11",
    EXAMPLE2_START: "Maajitaan: 10 - 4 ÷ 2",
    EXAMPLE2_S1: "Nitam: Naabishimowin! (4 ÷ 2 = 2)",
    EXAMPLE2_S2: "Eko-niizh: Apishimon! 10 - 2",
    EXAMPLE2_END: "Ishkwaaj Minose: 8",
    ACKNOWLEDGEMENT: "Mashkawendamowin onji Anishinaabe miinawaa Nêhiyaw gikendaasowin—wikiwam miinawaa manidoominensikewin.",
    PLAY_HOWTO_TITLE: "Mikan Gwayakosiwin: Ozhitoon inaakonigewin",
    PLAY_HOWTO_DESC: "Tangishkibidan inaakonigewin wii-gwayakoseg!",
    MISSING_HOWTO_TITLE: "Agindan Miikana: Mikan bimaadiziwin",
    MISSING_HOWTO_DESC: "Agindasowinan omaa ayaa, dash inaakonigewin kaawiin. Bimiwidoon inaakonigewin wii-minoseg.",
    BUILD_HOWTO_TITLE: "Manidoominensikewin: Ozhitoon ezhi-nitaawigig",
    BUILD_HOWTO_DESC: "Aabajitoon KAKINA gimanidoominensiman miinawaa inaakonigewin wii-ozhitooyin ezhi-minoseg!",
    LEVEL_SELECT: "Onaabandan Gimiikana",
    LEVEL: "Ishkwaandem",
    QUESTION: "Ezhi-nitaawigig",
    LEVEL_COMPLETE: "Miikana Giizhiitaa! 🎉",
    BACK_TO_LEVELS: "Azhegiiwe Miikanan",
    MISSING_RULES: "Nanda-wabandamowin: Bimiwidoon inaakonigewinan wii-gwayakoseg.",
    BUILD_RULES: "Manidoominensikewin: Bimiwidoon KAKINA gimanidoominensiman!",
    TEST_MAGIC: "Nanda-gikendan ✨",
    CLEAR: "Biinichigen",
    INVALID_MATH: "Waniikwe! Kaawiin minosesinoon. Naanaagadaawendan ginaakonigewin!",
    NOT_ALL_NUMS: "Aabajitoon KAKINA gimanidoominensiman!",
    
    TARGET_LABEL: "Inaakonigewin:",
    POUCH_LABEL: "Mashkimod:",
    WEAVE_LABEL: "Ozhitoon:",
    EX_LABEL: "Ex:",
    DROP_HERE: "Omaa binaan...",
    WEAVE_HERE: "Omaa ozhitoon...",

    JOURNEY_TITLE: "Kakina Minoseg",
    JOURNEY_DESC: "Waabam miikanan gaa-bimaadiziyan miinawaa nibwaakaawin.",
    RESET_ALL: "Biinichigen Kakina",
    STARS_COLLECTED: "Anangook",
    TOTAL_MASTERY: "Gichi-Nitaawigiwin"
  },
  cr: {
    TITLE: "BEDMAS: Kiskinohamâkêwina",
    TAB_LEARN: "Kiskinohamâkêwin",
    TAB_PLAY: "Mêtawêwin",
    TAB_MISSING: "Miskaw",
    TAB_BUILD: "Osihta",
    TAB_JOURNEY: "Pimâcihowin",
    GOAL: "Ispîhcâwin",
    HINT: "Nisitohtamowin",
    UNDO: "Kîwê",
    RESET: "Môskî",
    SUCCESS: "Miyosin! 🌟",
    NEXT: "Nîkân",
    FINISH: "Kistêyihtamowin! 🏆",
    STAGE: "Capasîs",
    ERROR: "Pâstâhowin! 🙈 Nanahi namahcîsk nite!",
    RATING: "Tapasînakosowin:",
    GOLD: "⭐⭐⭐ Kwayask!",
    SILVER: "⭐⭐ Maskawisîwin!",
    BRONZE: "⭐ Iyiniwiwin!",
    RULE_TITLE: "Tâpiskôc Iyiniwiwin",
    RULE_1_TITLE: "1. Asitastêyaskwêwin ( )",
    RULE_1_DESC: "Tâpiskôc mîkîwâhp, nîkân asitastêyaskwêwin! Osihta pîhcâyihk ( ) nîkân.",
    RULE_2_TITLE: "2. Sâkâhikan × ÷",
    RULE_2_DESC: "Ôma maskawisîwin. Osihta namahcîsk nite, mita mêskanaw.",
    RULE_3_TITLE: "3. Wêkêw + -",
    RULE_3_DESC: "Iskwêyâc wêkêw. Osihta iskwêyâc, namahcîsk nite.",
    EXAMPLE_TITLE: "Mita Mêskanaw:",
    EXAMPLE_START: "Môskî: 5 + (2 × 3)",
    EXAMPLE_S1: "Nîkân: Asitastêyaskwêwin! (2 × 3 = 6)",
    EXAMPLE_S2: "Nîso: Wêkêw! 5 + 6",
    EXAMPLE_END: "Iskwêyâc: 11",
    EXAMPLE2_START: "Môskî: 10 - 4 ÷ 2",
    EXAMPLE2_S1: "Nîkân: Sâkâhikan! (4 ÷ 2 = 2)",
    EXAMPLE2_S2: "Nîso: Wêkêw! 10 - 2",
    EXAMPLE2_END: "Iskwêyâc: 8",
    ACKNOWLEDGEMENT: "Mâmiskôtôwin ohci Nêhiyaw êkwa Anishinaabe iyiniwiwin—mîkîwâhp êkwa mîkisa.",
    PLAY_HOWTO_TITLE: "Miskaw: Osihta Wiyasiwêwina",
    PLAY_HOWTO_DESC: "Pâhpihkata wiyasiwêwina kita-kwayask!",
    MISSING_HOWTO_TITLE: "Ayamihcikê Mêskanaw: Miskaw",
    MISSING_HOWTO_DESC: "Akihcikan astêwa, mâka wiyasiwêwina kâwiya. Tâpiskwam wiyasiwêwina.",
    BUILD_HOWTO_TITLE: "Mîkisikêwin: Osihta Wiyasiwêwina",
    BUILD_HOWTO_DESC: "Âpacihtâ KAHKIYAW mîkisa êkwa wiyasiwêwina kita-osihta kwayask!",
    LEVEL_SELECT: "Nawasôn Mêskanaw",
    LEVEL: "Capasîs",
    QUESTION: "Wiyasiwêwina",
    LEVEL_COMPLETE: "Mêskanaw Kîsihtâw! 🎉",
    BACK_TO_LEVELS: "Kîwê Mêskanaw",
    MISSING_RULES: "Nisitohtamowin: Tâpiskwam wiyasiwêwina kita-kwayask.",
    BUILD_RULES: "Mîkisikêwin: Tâpiskwam KAHKIYAW mîkisa!",
    TEST_MAGIC: "Nisitohta ✨",
    CLEAR: "Pêkisi",
    INVALID_MATH: "Pâstâhowin! Namôya kwayask. Pêyahtik wiyasiwêwina!",
    NOT_ALL_NUMS: "Âpacihtâ KAHKIYAW mîkisa!",
    
    TARGET_LABEL: "Ispîhcâwin:",
    POUCH_LABEL: "Maskimocis:",
    WEAVE_LABEL: "Osihta:",
    EX_LABEL: "Ex:",
    DROP_HERE: "Ota pakitin...",
    WEAVE_HERE: "Ota osihta...",

    JOURNEY_TITLE: "Kâh-kiyaw Kwayask",
    JOURNEY_DESC: "Wâpahta kî-mêskanawa êkwa iyiniwiwin kâ-miskaman.",
    RESET_ALL: "Pêkisi Kâh-kiyaw",
    STARS_COLLECTED: "Acâhkosak",
    TOTAL_MASTERY: "Iyiniwiwin"
  }
};

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ current, total, colorClass }) => (
  <div className="w-full max-w-xl mx-auto bg-white/50 h-3 rounded-full mb-4 overflow-hidden border border-white/60 shadow-inner">
    <div 
      className={`h-full ${colorClass} transition-all duration-500 ease-out`}
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

// --- SAFE MATH EVALUATOR ---
const evaluateExpression = (tokens) => {
  try {
    let str = tokens.map(t => {
      if (t === '×') return '*';
      if (t === '÷') return '/';
      return t;
    }).join('');
    
    if (/[+\-*/]{2,}/.test(str)) return null; 
    if (/^[+*/]/.test(str) || /[+\-*/]$/.test(str)) return null;
    if (/\(\)/.test(str)) return null;

    // eslint-disable-next-line no-new-func
    const result = new Function('return ' + str)();
    return Number.isFinite(result) ? result : null;
  } catch (e) {
    return null;
  }
};

// ==========================================
// SUB-COMPONENT: GAME 2 - MISSING LINK (Tracking)
// ==========================================
const MISSING_LEVELS = [
  {
    id: 1, titleEn: "Path 1: The Plains", titleFr: "Chemin 1 : Les Plaines", titleOj: "Miikana 1: Mashkode", titleCr: "Mêskanaw 1: Paskwâw", descEn: "Basic + and -", descFr: "+ et - de base", descOj: "Eta + miinawa -", descCr: "Piko + êkwa -",
    questions: [
      { id: 'm1-1', target: 6, eq: ['4', '?', '2'] }, { id: 'm1-2', target: 5, eq: ['8', '?', '3'] }, { id: 'm1-3', target: 8, eq: ['5', '?', '4', '?', '1'] },
      { id: 'm1-4', target: 7, eq: ['10', '?', '5', '?', '2'] }, { id: 'm1-5', target: 3, eq: ['9', '?', '3', '?', '3'] }, { id: 'm1-6', target: 10, eq: ['7', '?', '2', '?', '1'] },
      { id: 'm1-7', target: 6, eq: ['12', '?', '4', '?', '2'] }, { id: 'm1-8', target: 7, eq: ['6', '?', '5', '?', '4'] }, { id: 'm1-9', target: 10, eq: ['15', '?', '10', '?', '5'] },
      { id: 'm1-10', target: 14, eq: ['8', '?', '8', '?', '2'] }
    ]
  },
  {
    id: 2, titleEn: "Path 2: The Foothills", titleFr: "Chemin 2 : Les Collines", titleOj: "Miikana 2: Bijiw", titleCr: "Mêskanaw 2: Wacîs", descEn: "Include × and ÷", descFr: "Inclus × et ÷", descOj: "Dagon × miinawa ÷", descCr: "Asici × êkwa ÷",
    questions: [
      { id: 'm2-1', target: 12, eq: ['3', '?', '4'] }, { id: 'm2-2', target: 5, eq: ['15', '?', '3'] }, { id: 'm2-3', target: 10, eq: ['2', '?', '3', '?', '4'] },
      { id: 'm2-4', target: 4, eq: ['10', '?', '5', '?', '2'] }, { id: 'm2-5', target: 13, eq: ['8', '?', '2', '?', '3'] }, { id: 'm2-6', target: 3, eq: ['20', '?', '4', '?', '2'] },
      { id: 'm2-7', target: 17, eq: ['6', '?', '2', '?', '5'] }, { id: 'm2-8', target: 6, eq: ['14', '?', '7', '?', '3'] }, { id: 'm2-9', target: 7, eq: ['5', '?', '2', '?', '3'] },
      { id: 'm2-10', target: 6, eq: ['12', '?', '3', '?', '2'] }
    ]
  },
  {
    id: 3, titleEn: "Path 3: The Mountains", titleFr: "Chemin 3 : Les Montagnes", titleOj: "Miikana 3: Wajiw", titleCr: "Mêskanaw 3: Waciy", descEn: "The VIP Brackets", descFr: "Les Parenthèses", descOj: "Inaakonigewin ( )", descCr: "Kistêyihtamowin ( )",
    questions: [
      { id: 'm3-1', target: 18, eq: ['(', '4', '?', '2', ')', '?', '3'] }, { id: 'm3-2', target: 5, eq: ['20', '?', '(', '5', '?', '1', ')'] }, { id: 'm3-3', target: 2, eq: ['(', '8', '?', '4', ')', '?', '2'] },
      { id: 'm3-4', target: 18, eq: ['3', '?', '(', '4', '?', '2', ')'] }, { id: 'm3-5', target: 15, eq: ['(', '10', '?', '5', ')', '?', '3'] }, { id: 'm3-6', target: 3, eq: ['18', '?', '(', '2', '?', '3', ')'] },
      { id: 'm3-7', target: 4, eq: ['(', '12', '?', '4', ')', '?', '2'] }, { id: 'm3-8', target: 15, eq: ['5', '?', '(', '6', '?', '2', ')'] }, { id: 'm3-9', target: 16, eq: ['(', '9', '?', '3', ')', '?', '4'] },
      { id: 'm3-10', target: 3, eq: ['24', '?', '(', '4', '?', '4', ')'] }
    ]
  }
];

const MissingLinkGame = ({ t, lang, recordScore }) => {
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  const levelObj = MISSING_LEVELS.find(l => l.id === currentLevelId);
  const levelData = levelObj ? levelObj.questions[currentQuestionIdx] : null;

  const [equation, setEquation] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [lastChecked, setLastChecked] = useState('');
  
  const toggleOperators = ['?', '+', '-', '×', '÷'];
  const dragOperators = ['+', '-', '×', '÷'];

  useEffect(() => {
    if (levelData) {
      setEquation(levelData.eq.map((val, i) => ({ id: i, value: val, isBlank: val === '?' })));
      setIsWin(false);
      setErrorCount(0);
      setLastChecked('');
    }
  }, [currentLevelId, currentQuestionIdx, levelData]);

  const toggleOperator = (idx) => {
    if (isWin) return;
    setEquation(prev => {
      const newEq = [...prev];
      const currentOp = newEq[idx].value;
      const nextOpIdx = (toggleOperators.indexOf(currentOp) + 1) % toggleOperators.length;
      newEq[idx].value = toggleOperators[nextOpIdx];
      newEq[idx].isBlank = toggleOperators[nextOpIdx] === '?';
      return newEq;
    });
  };

  const handleDragStart = (e, op) => e.dataTransfer.setData('text/plain', op);

  const handleDrop = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(null);
    if (isWin) return;
    const op = e.dataTransfer.getData('text/plain');
    if (dragOperators.includes(op)) {
      setEquation(prev => {
        const newEq = [...prev];
        newEq[idx].value = op;
        newEq[idx].isBlank = false;
        return newEq;
      });
    }
  };

  useEffect(() => {
    if (!equation.length || !levelData || isWin) return;
    const hasBlanks = equation.some(item => item.value === '?');
    if (!hasBlanks) {
      const eqStr = equation.map(item => item.value).join('');
      if (eqStr !== lastChecked) {
        setLastChecked(eqStr);
        const values = equation.map(item => item.value);
        const result = evaluateExpression(values);
        if (result === levelData.target) {
          setIsWin(true);
          let stars = 3;
          if (errorCount === 1) stars = 2;
          if (errorCount >= 2) stars = 1;
          recordScore('missing', levelData.id, stars);
        } else {
          setErrorCount(prev => prev + 1);
        }
      }
    }
  }, [equation, levelData, lastChecked, errorCount, recordScore, isWin]);

  if (currentLevelId === null) {
    return (
      <div className="w-full flex flex-col items-center animate-in fade-in duration-500 h-full">
        {/* HOW TO PLAY BANNER */}
        <div className="bg-purple-50 border-4 border-purple-200 rounded-3xl p-4 md:p-5 mb-4 md:mb-6 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl shadow-sm shrink-0">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-black text-purple-600 mb-1">{t.MISSING_HOWTO_TITLE}</h3>
            <p className="text-xs md:text-sm font-bold text-slate-600 leading-snug">{t.MISSING_HOWTO_DESC}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-purple-100 flex items-center gap-2 shadow-inner shrink-0">
            <div className="px-2 md:px-3 py-1 bg-white border-b-4 border-slate-200 rounded-lg font-black text-lg md:text-xl text-slate-700">5</div>
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-purple-200 text-purple-600 border-2 border-dashed border-purple-400 rounded-xl font-black text-lg">?</div>
            <div className="px-2 md:px-3 py-1 bg-white border-b-4 border-slate-200 rounded-lg font-black text-lg md:text-xl text-slate-700">3</div>
            <div className="font-black text-slate-400 mx-1">= 15</div>
            <div className="flex items-center gap-1 bg-pink-100 px-2 py-1 rounded-full text-xs font-bold text-pink-600 ml-2 animate-bounce">
              <MoveRight className="w-4 h-4" /> <span className="inline-block w-5 h-5 bg-pink-400 text-white rounded-full text-center leading-5 mx-1">×</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-black text-purple-600 mb-4">{t.LEVEL_SELECT}</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl px-4 overflow-y-auto pb-6">
          {MISSING_LEVELS.map((lvl) => (
            <button key={lvl.id} onClick={() => { setCurrentLevelId(lvl.id); setCurrentQuestionIdx(0); }} className="bg-white hover:bg-purple-50 p-4 rounded-3xl border-b-[6px] border-purple-300 active:border-b-0 active:translate-y-[6px] transition-all flex flex-col items-center shadow-sm border-2">
              <div className="text-3xl mb-2 text-purple-400"><Compass strokeWidth={2.5} size={36} /></div>
              <h3 className="text-lg font-black text-slate-700 mb-1 text-center">{lvl['title' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.titleEn}</h3>
              <p className="font-bold text-purple-500 text-sm">{lvl['desc' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.descEn}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
      <div className="flex w-full max-w-2xl justify-between items-center mb-2 px-4">
        <button onClick={() => setCurrentLevelId(null)} className="text-purple-600 font-bold text-sm bg-purple-200/50 hover:bg-purple-200 px-4 py-1.5 rounded-full">{t.LEVEL_SELECT}</button>
        <div className="text-slate-500 font-bold text-sm bg-white/50 px-4 py-1.5 rounded-full">{t.QUESTION} {currentQuestionIdx + 1} / {levelObj.questions.length}</div>
      </div>
      
      <ProgressBar current={currentQuestionIdx} total={levelObj.questions.length} colorClass="bg-purple-500" />

      <div className="bg-purple-50 border-4 border-purple-200 px-4 py-2 rounded-2xl mb-4 text-center max-w-xl shadow-sm text-sm font-bold text-purple-700">
        {t.MISSING_RULES}
      </div>

      <div className="bg-white px-6 py-3 rounded-full border-4 border-purple-200 shadow-md flex items-center gap-4 mb-6">
        <span className="text-lg font-bold text-slate-400 uppercase">{t.GOAL}</span>
        <span className="text-4xl font-black text-purple-500">{levelData?.target}</span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
        {equation.map((item, idx) => {
          if (item.value === '(' || item.value === ')') {
            return <span key={item.id} className="text-5xl md:text-6xl font-bold text-purple-300 px-1">{item.value}</span>;
          }
          if (item.isBlank || toggleOperators.includes(item.value)) {
            const isTargeted = dragOverIdx === idx;
            return (
              <button
                key={item.id}
                onClick={() => toggleOperator(idx)}
                onDragOver={(e) => { e.preventDefault(); setDragOverIdx(idx); }}
                onDragLeave={() => setDragOverIdx(null)}
                onDrop={(e) => handleDrop(e, idx)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl font-black text-3xl shadow-md border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all duration-150 flex items-center justify-center 
                  ${isTargeted ? 'bg-purple-300 border-purple-500 scale-110 shadow-purple-300' : 
                    item.isBlank ? 'bg-slate-200 text-slate-400 border-slate-300 border-dashed border-4' : 'bg-pink-400 text-white border-pink-600 animate-in zoom-in'}`}
              >
                {item.value}
              </button>
            );
          }
          return (
            <div key={item.id} className="min-w-[3rem] px-4 py-2 bg-white border-b-[6px] border-slate-200 rounded-2xl shadow-sm flex justify-center">
              <span className="text-3xl font-black text-slate-700">{item.value}</span>
            </div>
          );
        })}
      </div>

      {!isWin && (
        <div className="mt-8 flex gap-3 animate-in slide-in-from-bottom-4">
          {dragOperators.map((op, i) => (
            <div key={i} draggable onDragStart={(e) => handleDragStart(e, op)} className="w-12 h-12 md:w-14 md:h-14 bg-pink-400 text-white rounded-full font-black text-3xl shadow-md border-b-[4px] border-pink-600 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-pink-300 transition-all hover:scale-105">
              {op}
            </div>
          ))}
        </div>
      )}

      {isWin && (
        <div className="mt-6 bg-white border-4 border-emerald-400 p-6 rounded-3xl flex flex-col items-center shadow-xl animate-in zoom-in">
          <h2 className="text-2xl font-black text-emerald-500 mb-4 flex items-center gap-2">{t.SUCCESS}</h2>
          {currentQuestionIdx < levelObj.questions.length - 1 ? (
            <button onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-black text-xl border-b-[6px] border-emerald-700 active:border-b-0 active:translate-y-[6px] transition-all">
              {t.NEXT} <ChevronRight className="w-6 h-6" />
            </button>
          ) : (
            <button onClick={() => setCurrentLevelId(null)} className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-white rounded-full font-black text-xl border-b-[6px] border-amber-600 active:border-b-0 active:translate-y-[6px] transition-all">{t.LEVEL_COMPLETE} - {t.BACK_TO_LEVELS}</button>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: GAME 3 - THE BUILDER (Beadwork)
// ==========================================
const BUILDER_LEVELS = [
  {
    id: 1, titleEn: "Pattern 1: Simple String", titleFr: "Motif 1 : Corde Simple", titleOj: "Ezhi-Nitaawigig 1", titleCr: "Wiyasiwêwina 1", descEn: "3 beads, + & -", descFr: "3 perles, + & -", descOj: "3 manidoomin, + & -", descCr: "3 mîkisa, + & -",
    questions: [
      { id: 'b1-1', target: 9, nums: [2, 3, 4] }, { id: 'b1-2', target: 10, nums: [1, 4, 5] }, { id: 'b1-3', target: 15, nums: [5, 5, 5] },
      { id: 'b1-4', target: 5, nums: [10, 2, 3] }, { id: 'b1-5', target: 2, nums: [8, 4, 2] }, { id: 'b1-6', target: 2, nums: [6, 3, 1] },
      { id: 'b1-7', target: 10, nums: [7, 2, 1] }, { id: 'b1-8', target: 4, nums: [9, 3, 2] }, { id: 'b1-9', target: 10, nums: [4, 4, 2] },
      { id: 'b1-10', target: 5, nums: [12, 6, 1] }
    ]
  },
  {
    id: 2, titleEn: "Pattern 2: The Rosette", titleFr: "Motif 2 : La Rosette", titleOj: "Ezhi-Nitaawigig 2", titleCr: "Wiyasiwêwina 2", descEn: "3-4 beads, mix", descFr: "3-4 perles, mix", descOj: "3-4 manidoomin", descCr: "3-4 mîkisa",
    questions: [
      { id: 'b2-1', target: 14, nums: [2, 3, 4] }, { id: 'b2-2', target: 20, nums: [5, 2, 10] }, { id: 'b2-3', target: 8, nums: [8, 2, 4] },
      { id: 'b2-4', target: 17, nums: [3, 4, 5] }, { id: 'b2-5', target: 4, nums: [10, 5, 2] }, { id: 'b2-6', target: 8, nums: [2, 2, 2, 2] },
      { id: 'b2-7', target: 18, nums: [3, 3, 3, 3] }, { id: 'b2-8', target: 12, nums: [4, 2, 1, 5] }, { id: 'b2-9', target: 13, nums: [10, 2, 3, 4] },
      { id: 'b2-10', target: 21, nums: [5, 4, 2, 1] }
    ]
  },
  {
    id: 3, titleEn: "Pattern 3: The Loom", titleFr: "Motif 3 : Le Métier", titleOj: "Ezhi-Nitaawigig 3", titleCr: "Wiyasiwêwina 3", descEn: "Use brackets ( )", descFr: "Utilise des ( )", descOj: "Inaakonigewin ( )", descCr: "Kistêyihtamowin ( )",
    questions: [
      { id: 'b3-1', target: 20, nums: [2, 3, 4] }, { id: 'b3-2', target: 18, nums: [5, 1, 3] }, { id: 'b3-3', target: 2, nums: [10, 2, 4] },
      { id: 'b3-4', target: 24, nums: [8, 2, 4] }, { id: 'b3-5', target: 20, nums: [6, 4, 2] }, { id: 'b3-6', target: 2, nums: [12, 4, 2] },
      { id: 'b3-7', target: 0, nums: [5, 5, 5, 5] }, { id: 'b3-8', target: 26, nums: [2, 3, 4, 5] }, { id: 'b3-9', target: 1, nums: [4, 4, 4, 4] },
      { id: 'b3-10', target: 14, nums: [3, 4, 2, 1] }
    ]
  }
];

const BuilderGame = ({ t, lang, recordScore }) => {
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  const levelObj = BUILDER_LEVELS.find(l => l.id === currentLevelId);
  const levelData = levelObj ? levelObj.questions[currentQuestionIdx] : null;

  const [workspace, setWorkspace] = useState([]);
  const [usedNumIds, setUsedNumIds] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [isDragOverWorkspace, setIsDragOverWorkspace] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const operators = ['+', '-', '×', '÷', '(', ')'];

  useEffect(() => {
    setWorkspace([]);
    setUsedNumIds([]);
    setErrorMsg('');
    setIsWin(false);
    setErrorCount(0);
  }, [currentLevelId, currentQuestionIdx]);

  const addNumber = (num, id) => {
    if (usedNumIds.includes(id)) return;
    setWorkspace([...workspace, { type: 'num', value: num, numId: id }]);
    setUsedNumIds([...usedNumIds, id]);
    setErrorMsg('');
  };

  const addOperator = (op) => {
    setWorkspace([...workspace, { type: 'op', value: op, id: Math.random() }]);
    setErrorMsg('');
  };

  const handleDragStartNum = (e, num, id) => e.dataTransfer.setData('application/json', JSON.stringify({ type: 'num', value: num, id }));
  const handleDragStartOp = (e, op) => e.dataTransfer.setData('application/json', JSON.stringify({ type: 'op', value: op }));

  const handleDropWorkspace = (e) => {
    e.preventDefault();
    setIsDragOverWorkspace(false);
    if (isWin) return;
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'num') addNumber(data.value, data.id);
      if (data.type === 'op') addOperator(data.value);
    } catch (err) {}
  };

  const removeFromWorkspace = (index) => {
    const item = workspace[index];
    if (item.type === 'num') setUsedNumIds(usedNumIds.filter(id => id !== item.numId));
    setWorkspace(workspace.filter((_, i) => i !== index));
    setErrorMsg('');
  };

  const checkAnswer = () => {
    if (usedNumIds.length < levelData.nums.length) { setErrorMsg(t.NOT_ALL_NUMS); return; }
    const values = workspace.map(w => w.value);
    const result = evaluateExpression(values);
    
    if (result === null) {
      setErrorMsg(t.INVALID_MATH);
      setErrorCount(prev => prev + 1);
    }
    else if (result === levelData.target) { 
      setIsWin(true); 
      setErrorMsg(''); 
      let stars = 3;
      if (errorCount === 1) stars = 2;
      if (errorCount >= 2) stars = 1;
      recordScore('build', levelData.id, stars);
    } 
    else {
      setErrorMsg(`= ${result}. Try again!`);
      setErrorCount(prev => prev + 1);
    }
  };

  if (currentLevelId === null) {
    return (
      <div className="w-full flex flex-col items-center animate-in fade-in duration-500 h-full">
        {/* HOW TO PLAY BANNER */}
        <div className="bg-orange-50 border-4 border-orange-200 rounded-3xl p-4 md:p-5 mb-4 md:mb-6 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl shadow-sm shrink-0">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-black text-orange-600 mb-1">{t.BUILD_HOWTO_TITLE}</h3>
            <p className="text-xs md:text-sm font-bold text-slate-600 leading-snug">{t.BUILD_HOWTO_DESC}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-orange-100 flex flex-col items-center shadow-inner shrink-0 gap-2">
             <div className="flex justify-center items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase">{t.TARGET_LABEL}</span>
                <span className="text-xl font-black text-orange-500">10</span>
                <span className="text-xs font-black text-slate-400 uppercase ml-2">{t.POUCH_LABEL}</span>
                <div className="w-6 h-6 bg-sky-400 text-white rounded-full font-black text-sm flex items-center justify-center shadow-inner">2</div>
                <div className="w-6 h-6 bg-sky-400 text-white rounded-full font-black text-sm flex items-center justify-center shadow-inner">5</div>
             </div>
             <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
               {t.WEAVE_LABEL} <span className="inline-block px-2 py-0.5 bg-sky-100 text-sky-700 border border-sky-300 rounded-full ml-1">2</span>
               <span className="inline-block w-4 h-4 bg-pink-400 text-white rounded-full text-center leading-4 text-[10px]">×</span>
               <span className="inline-block px-2 py-0.5 bg-sky-100 text-sky-700 border border-sky-300 rounded-full">5</span>
             </div>
          </div>
        </div>

        <h2 className="text-2xl font-black text-orange-600 mb-4">{t.LEVEL_SELECT}</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl px-4 overflow-y-auto pb-6">
          {BUILDER_LEVELS.map((lvl) => (
            <button key={lvl.id} onClick={() => { setCurrentLevelId(lvl.id); setCurrentQuestionIdx(0); }} className="bg-white hover:bg-orange-50 p-4 rounded-3xl border-b-[6px] border-orange-300 active:border-b-0 active:translate-y-[6px] transition-all flex flex-col items-center shadow-sm border-2">
              <div className="text-3xl mb-2 text-orange-400"><CircleDot strokeWidth={2.5} size={36} /></div>
              <h3 className="text-lg font-black text-slate-700 mb-1 text-center">{lvl['title' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.titleEn}</h3>
              <p className="font-bold text-orange-500 text-sm">{lvl['desc' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.descEn}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-500 h-full overflow-y-auto px-2">
      <div className="flex w-full max-w-2xl justify-between items-center mb-2 px-2">
        <button onClick={() => setCurrentLevelId(null)} className="text-orange-600 font-bold text-sm bg-orange-200/50 hover:bg-orange-200 px-4 py-1.5 rounded-full">{t.LEVEL_SELECT}</button>
        <div className="text-slate-500 font-bold text-sm bg-white/50 px-4 py-1.5 rounded-full">{t.QUESTION} {currentQuestionIdx + 1} / {levelObj.questions.length}</div>
      </div>

      <ProgressBar current={currentQuestionIdx} total={levelObj.questions.length} colorClass="bg-orange-500" />

      <div className="bg-white px-6 py-2 rounded-full border-4 border-orange-200 shadow-md flex items-center gap-4 mb-4">
        <span className="text-sm font-bold text-slate-400 uppercase">{t.GOAL}</span>
        <span className="text-3xl font-black text-orange-500">{levelData?.target}</span>
      </div>

      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-4">
        {/* Number Bank (Bead Pouch) */}
        <div className="bg-white p-4 rounded-3xl border-[3px] border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="text-slate-400 font-bold mb-2 text-xs uppercase tracking-wider">{t.POUCH_LABEL}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {levelData.nums.map((num, i) => {
              const isUsed = usedNumIds.includes(i);
              return (
                <button
                  key={i} draggable={!isUsed} onDragStart={(e) => handleDragStartNum(e, num, i)} onClick={() => addNumber(num, i)} disabled={isUsed}
                  className={`w-12 h-12 rounded-full font-black text-2xl shadow-md border-b-[4px] transition-all flex items-center justify-center ${isUsed ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50 shadow-inner' : 'bg-sky-400 text-white border-sky-600 hover:bg-sky-300 active:border-b-0 active:translate-y-[4px] cursor-grab active:cursor-grabbing hover:scale-105'}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace (Loom) */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragOverWorkspace(true); }} onDragLeave={() => setIsDragOverWorkspace(false)} onDrop={handleDropWorkspace}
          className={`flex-1 min-h-[100px] border-4 border-dashed rounded-[2rem] p-4 flex flex-wrap justify-center items-center gap-2 transition-colors duration-300 ${isDragOverWorkspace ? 'bg-orange-50 border-orange-500 scale-[1.02]' : 'bg-white border-orange-300'}`}
        >
          {workspace.length === 0 && <span className={`font-bold text-sm text-center ${isDragOverWorkspace ? 'text-orange-500' : 'text-orange-300'}`}>{t.WEAVE_HERE}</span>}
          {workspace.map((item, idx) => (
            <button key={item.id || item.numId} onClick={() => removeFromWorkspace(idx)} className={`px-3 py-1.5 font-black text-2xl shadow-sm hover:scale-105 transition-transform ${item.type === 'num' ? 'bg-sky-100 text-sky-700 border-2 border-sky-300 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-600 rounded-full' : 'bg-pink-100 text-pink-700 border-2 border-pink-300 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-600 rounded-lg'}`}>
              {item.value}
            </button>
          ))}
        </div>
      </div>

      {/* Operator Toolbox (Thread) */}
      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {operators.map((op, i) => (
          <button key={i} draggable onDragStart={(e) => handleDragStartOp(e, op)} onClick={() => addOperator(op)} className="w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-lg font-black text-2xl shadow-sm border-b-[3px] border-pink-600 active:border-b-0 active:translate-y-[3px] hover:bg-pink-300 transition-all flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105">
            {op}
          </button>
        ))}
      </div>

      {errorMsg && <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-sm mb-4 animate-shake border-2 border-red-300">{errorMsg}</div>}

      {!isWin && workspace.length > 0 && (
        <div className="flex gap-3 mt-2">
          <button onClick={() => { setWorkspace([]); setUsedNumIds([]); setErrorMsg(''); }} className="px-4 py-2 bg-slate-200 text-slate-600 rounded-full font-bold text-sm hover:bg-slate-300 transition-colors">{t.CLEAR}</button>
          <button onClick={checkAnswer} className="px-6 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-black text-lg border-b-[4px] border-orange-700 active:border-b-0 active:translate-y-[4px] transition-all shadow-md flex items-center gap-2"><CheckCircle className="w-5 h-5" /> {t.TEST_MAGIC}</button>
        </div>
      )}

      {isWin && (
        <div className="bg-white border-4 border-emerald-400 p-6 rounded-3xl flex flex-col items-center shadow-xl animate-in zoom-in mt-2">
          <h2 className="text-xl font-black text-emerald-500 mb-4 flex items-center gap-2">{t.SUCCESS}</h2>
          {currentQuestionIdx < levelObj.questions.length - 1 ? (
            <button onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-black text-xl border-b-[4px] border-emerald-700 active:border-b-0 active:translate-y-[4px] transition-all">
              {t.NEXT} <ChevronRight className="w-6 h-6" />
            </button>
          ) : (
            <button onClick={() => setCurrentLevelId(null)} className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-white rounded-full font-black text-lg border-b-[4px] border-amber-600 active:border-b-0 active:translate-y-[4px] transition-all">{t.LEVEL_COMPLETE} - {t.BACK_TO_LEVELS}</button>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: JOURNEY TAB (Complete Progress)
// ==========================================
const JourneyTab = ({ progress, setProgress, t }) => {
  const getGameScore = (gameStr) => Object.values(progress[gameStr] || {}).reduce((a, b) => a + b, 0);
  const getCompletedCount = (gameStr) => Object.keys(progress[gameStr] || {}).length;

  const scores = {
    play: getGameScore('play'),
    missing: getGameScore('missing'),
    build: getGameScore('build')
  };

  const completed = {
    play: getCompletedCount('play'),
    missing: getCompletedCount('missing'),
    build: getCompletedCount('build')
  };

  const totalScore = scores.play + scores.missing + scores.build;
  const maxScore = 270; // 3 games * 3 levels * 10 qs * 3 stars

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all your progress and start over?")) {
      setProgress({ play: {}, missing: {}, build: {} });
    }
  };

  const renderGameCard = (title, icon, score, completedCount, maxQs, color) => (
    <div className={`bg-white border-[4px] ${color} p-5 rounded-3xl shadow-sm flex flex-col items-center gap-2 w-full max-w-sm`}>
      <div className="flex items-center gap-3 w-full justify-center border-b-2 border-slate-100 pb-3 mb-2">
        {icon}
        <h3 className="font-black text-lg text-slate-700">{title}</h3>
      </div>
      <div className="flex justify-between w-full px-4 items-center">
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase">Completed</span>
          <span className="text-2xl font-black text-slate-600">{completedCount} <span className="text-lg text-slate-400">/ {maxQs}</span></span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase">Stars</span>
          <div className="flex items-center gap-1 text-yellow-500 font-black text-2xl">
            {score} <Star size={20} fill="currentColor" />
          </div>
        </div>
      </div>
      <ProgressBar current={completedCount} total={maxQs} colorClass="bg-emerald-400" />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center animate-in fade-in duration-500 overflow-y-auto px-4 pb-8">
      <div className="bg-emerald-50 border-[6px] border-emerald-300 w-full max-w-4xl rounded-[2rem] p-6 md:p-8 flex flex-col items-center shadow-lg relative overflow-hidden mb-8 mt-4">
        <div className="absolute -top-10 -right-10 text-emerald-200 opacity-50"><Award size={200} /></div>
        
        <h2 className="text-3xl md:text-4xl font-black text-emerald-600 mb-2 z-10">{t.JOURNEY_TITLE}</h2>
        <p className="text-emerald-700 font-bold mb-6 text-center z-10">{t.JOURNEY_DESC}</p>
        
        <div className="bg-white px-8 py-4 rounded-full border-4 border-emerald-200 shadow-inner flex items-center gap-4 z-10">
          <span className="text-lg font-black text-slate-400 uppercase">{t.TOTAL_MASTERY}</span>
          <div className="flex items-center gap-2">
            <span className="text-5xl font-black text-yellow-500">{totalScore}</span>
            <span className="text-2xl font-black text-slate-300">/ {maxScore}</span>
            <Star className="text-yellow-400" size={36} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {renderGameCard(i18n.en.TAB_PLAY, <Layers className="text-pink-500" size={28} />, scores.play, completed.play, 30, 'border-pink-200')}
        {renderGameCard(i18n.en.TAB_MISSING, <Compass className="text-purple-500" size={28} />, scores.missing, completed.missing, 30, 'border-purple-200')}
        {renderGameCard(i18n.en.TAB_BUILD, <CircleDot className="text-orange-500" size={28} />, scores.build, completed.build, 30, 'border-orange-200')}
      </div>

      <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full font-black text-lg border-b-[4px] border-rose-300 active:border-b-0 active:translate-y-1 transition-all">
        <Trash2 size={24} /> {t.RESET_ALL}
      </button>
    </div>
  );
};


// ==========================================
// MAIN COMPONENT: APP WRAPPER & PLAY GAME
// ==========================================
const generateId = () => Math.random().toString(36).substr(2, 9);
const parseEquation = (arr) => arr.map(v => {
  if (['+', '-', '*', '/'].includes(v)) return { id: generateId(), type: 'op', value: v === '*' ? '×' : v === '/' ? '÷' : v };
  if (['(', ')'].includes(v)) return { id: generateId(), type: 'bracket', value: v };
  return { id: generateId(), type: 'num', value: Number(v) };
});

const getNextOperatorIndex = (eq) => {
  let maxDepth = 0, currentDepth = 0;
  let deepestBracketStart = -1, deepestBracketEnd = eq.length;
  for (let i = 0; i < eq.length; i++) {
    if (eq[i].value === '(') { currentDepth++; if (currentDepth >= maxDepth) { maxDepth = currentDepth; deepestBracketStart = i; } } 
    else if (eq[i].value === ')') { if (currentDepth === maxDepth) { deepestBracketEnd = i; break; } currentDepth--; }
  }
  let searchStart = deepestBracketStart === -1 ? 0 : deepestBracketStart + 1;
  let searchEnd = deepestBracketEnd === -1 ? eq.length : deepestBracketEnd;

  for (let i = searchStart; i < searchEnd; i++) if (eq[i].type === 'op' && (eq[i].value === '×' || eq[i].value === '÷')) return i;
  for (let i = searchStart; i < searchEnd; i++) if (eq[i].type === 'op' && (eq[i].value === '+' || eq[i].value === '-')) return i;
  return -1;
};

const cleanBrackets = (eqArray) => {
  let cleaned = [...eqArray];
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < cleaned.length - 2; i++) {
      if (cleaned[i].value === '(' && cleaned[i+1].type === 'num' && cleaned[i+2].value === ')') {
        cleaned.splice(i, 3, cleaned[i+1]);
        changed = true;
        break;
      }
    }
  }
  return cleaned;
};

const GAME_LEVELS = [
  { id: 1, titleEn: "Level 1: The Base", titleFr: "Niveau 1 : La Base", titleOj: "Ishkwaandem 1: Mitaawanga", titleCr: "Capasîs 1: Paskwâw", descEn: "Basic + and -", descFr: "Seulement + et -", descOj: "Eta + miinawa -", descCr: "Piko + êkwa -", questions: [{ id: '1-1', target: 8, eq: ['5', '+', '4', '-', '1'] }, { id: '1-2', target: 11, eq: ['10', '-', '2', '+', '3'] }, { id: '1-3', target: 4, eq: ['8', '-', '6', '+', '2'] }, { id: '1-4', target: 5, eq: ['7', '+', '3', '-', '5'] }, { id: '1-5', target: 5, eq: ['12', '-', '4', '-', '3'] }, { id: '1-6', target: 10, eq: ['6', '+', '6', '-', '2'] }, { id: '1-7', target: 12, eq: ['9', '-', '1', '+', '4'] }, { id: '1-8', target: 12, eq: ['15', '-', '5', '+', '2'] }, { id: '1-9', target: 7, eq: ['3', '+', '8', '-', '4'] }, { id: '1-10', target: 15, eq: ['20', '-', '10', '+', '5'] }] },
  { id: 2, titleEn: "Level 2: The Supports", titleFr: "Niveau 2 : Les Soutiens", titleOj: "Ishkwaandem 2: Bijiw", titleCr: "Capasîs 2: Wacîs", descEn: "× and ÷ go first!", descFr: "× et ÷ en premier !", descOj: "× miinawa ÷ niigaan!", descCr: "× êkwa ÷ nîkân!", questions: [{ id: '2-1', target: 14, eq: ['2', '+', '4', '*', '3'] }, { id: '2-2', target: 7, eq: ['10', '-', '6', '/', '2'] }, { id: '2-3', target: 15, eq: ['5', '*', '2', '+', '5'] }, { id: '2-4', target: 14, eq: ['20', '-', '2', '*', '3'] }, { id: '2-5', target: 13, eq: ['8', '+', '10', '/', '2'] }, { id: '2-6', target: 10, eq: ['4', '*', '4', '-', '6'] }, { id: '2-7', target: 3, eq: ['15', '-', '3', '*', '4'] }, { id: '2-8', target: 11, eq: ['9', '+', '6', '/', '3'] }, { id: '2-9', target: 10, eq: ['12', '/', '4', '+', '7'] }, { id: '2-10', target: 15, eq: ['5', '+', '2', '*', '5'] }] },
  { id: 3, titleEn: "Level 3: Foundation", titleFr: "Niveau 3 : Fondation", titleOj: "Ishkwaandem 3: Wajiw", titleCr: "Capasîs 3: Waciy", descEn: "( ) are the VIPs", descFr: "( ) sont les VIP", descOj: "Inaakonigewin ( )", descCr: "Kistêyihtamowin ( )", questions: [{ id: '3-1', target: 24, eq: ['(', '3', '+', '5', ')', '*', '3'] }, { id: '3-2', target: 2, eq: ['10', '-', '(', '4', '+', '4', ')'] }, { id: '3-3', target: 18, eq: ['3', '*', '(', '10', '-', '4', ')'] }, { id: '3-4', target: 5, eq: ['(', '6', '+', '4', ')', '/', '2'] }, { id: '3-5', target: 21, eq: ['3', '*', '(', '5', '+', '2', ')'] }, { id: '3-6', target: 2, eq: ['(', '12', '-', '2', ')', '/', '5'] }, { id: '3-7', target: 20, eq: ['4', '*', '(', '2', '+', '3', ')'] }, { id: '3-8', target: 20, eq: ['(', '8', '+', '2', ')', '*', '2'] }, { id: '3-9', target: 9, eq: ['15', '-', '(', '3', '*', '2', ')'] }, { id: '3-10', target: 10, eq: ['(', '10', '/', '2', ')', '+', '5'] }] }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('learn'); 
  const t = i18n[lang];

  const langs = ['en', 'fr', 'oj', 'cr'];
  const langLabels = { en: 'EN', fr: 'FR', oj: 'OJIBWE', cr: 'CREE' };

  // GLOBAL PROGRESS STATE
  const [globalProgress, setGlobalProgress] = useState({ play: {}, missing: {}, build: {} });

  const recordScore = (gameKey, questionId, stars) => {
    setGlobalProgress(prev => ({
      ...prev,
      [gameKey]: { 
        ...prev[gameKey], 
        [questionId]: Math.max(prev[gameKey][questionId] || 0, stars) 
      }
    }));
  };

  const handleLangToggle = () => {
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentLevelId(null);
  };

  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const levelObj = GAME_LEVELS.find(l => l.id === currentLevelId);
  const levelData = levelObj ? levelObj.questions[currentQuestionIdx] : null;
  const [equation, setEquation] = useState([]);
  const [history, setHistory] = useState([]);
  const [errorId, setErrorId] = useState(null);
  const [hintId, setHintId] = useState(null);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (levelData) { 
      setEquation(parseEquation(levelData.eq)); 
      setHistory([]); 
      setErrorId(null); 
      setHintId(null); 
      setErrorCount(0); 
    }
  }, [currentLevelId, currentQuestionIdx, levelData]);

  const isWin = equation.length === 1 && levelData && equation[0].value === levelData.target;

  // Record Play Score
  useEffect(() => {
    if (isWin && levelData) {
      let stars = 3;
      if (errorCount > 0 && errorCount <= 2) stars = 2;
      if (errorCount > 2) stars = 1;
      recordScore('play', levelData.id, stars);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWin]); 

  const handleOperatorClick = (idx) => {
    if (isWin) return;
    const expectedIdx = getNextOperatorIndex(equation);
    if (idx !== expectedIdx) { 
      setErrorId(equation[idx].id); 
      setErrorCount(prev => prev + 1); 
      setTimeout(() => setErrorId(null), 600); 
      return; 
    }

    const left = equation[idx - 1], op = equation[idx], right = equation[idx + 1];
    let resultVal = 0;
    if (op.value === '+') resultVal = left.value + right.value;
    if (op.value === '-') resultVal = left.value - right.value;
    if (op.value === '×') resultVal = left.value * right.value;
    if (op.value === '÷') resultVal = left.value / right.value;

    const newEq = [...equation];
    newEq.splice(idx - 1, 3, { id: generateId(), type: 'num', value: resultVal });
    setHistory([...history, equation]);
    setEquation(cleanBrackets(newEq));
    setHintId(null);
  };

  const getThemeColor = () => {
    if (activeTab === 'learn') return 'bg-sky-100 border-sky-200 text-sky-700';
    if (activeTab === 'play') return 'bg-pink-100 border-pink-200 text-pink-700';
    if (activeTab === 'missing') return 'bg-purple-100 border-purple-200 text-purple-700';
    if (activeTab === 'build') return 'bg-orange-100 border-orange-200 text-orange-700';
    if (activeTab === 'journey') return 'bg-emerald-100 border-emerald-200 text-emerald-700';
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-cyan-300 via-purple-300 to-pink-300 md:p-4 overflow-hidden font-sans selection:bg-white/40">
      <style>{`
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .animate-wiggle { animation: wiggle 0.3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        body { background-size: 200% 200%; animation: gradientBG 15s ease infinite; }
        @keyframes gradientBG { 0% {background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100% {background-position: 0% 50%;} }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* APP CONTAINER */}
      <div className={`relative w-full max-w-6xl h-screen md:h-[calc(100vh-2rem)] flex flex-col overflow-hidden bg-white md:rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.2)] transition-colors duration-500 ${getThemeColor().split(' ')[0]}`}>
        
        {/* HEADER & TABS */}
        <header className={`pt-4 px-4 bg-white border-b-[3px] shadow-sm relative z-20 shrink-0 ${getThemeColor().split(' ')[1]}`}>
          <div className="flex items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 p-1.5 md:p-2 rounded-xl border-b-[3px] border-amber-500 transform -rotate-6">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-lg md:text-2xl font-black text-slate-700 tracking-wide truncate">{t.TITLE}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => {
                if (window.confirm("Start Over completely?")) {
                  setGlobalProgress({ play: {}, missing: {}, build: {} });
                  handleTabChange('learn');
                }
              }} className="flex items-center justify-center p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 border-b-[3px] border-rose-300 active:border-b-0 active:translate-y-1 rounded-xl transition-all" title="Reset All Progress">
                <RefreshCw size={18} />
              </button>
              <button onClick={handleLangToggle} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-b-[3px] border-slate-300 active:border-b-0 active:translate-y-1 rounded-xl transition-all">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-sky-600" />
                <span className="font-bold text-xs md:text-sm text-slate-600">{langLabels[lang]}</span>
              </button>
            </div>
          </div>

          <div className="flex w-full overflow-x-auto gap-1 md:gap-2 scrollbar-hide">
            <button onClick={() => handleTabChange('learn')} className={`flex flex-1 min-w-[80px] items-center justify-center gap-1.5 py-2 rounded-t-xl font-black text-[10px] sm:text-xs md:text-sm transition-all ${activeTab === 'learn' ? 'bg-sky-500 text-white shadow-lg' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'}`}><BookOpen className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline truncate">{t.TAB_LEARN}</span></button>
            <button onClick={() => handleTabChange('play')} className={`flex flex-1 min-w-[80px] items-center justify-center gap-1.5 py-2 rounded-t-xl font-black text-[10px] sm:text-xs md:text-sm transition-all ${activeTab === 'play' ? 'bg-pink-500 text-white shadow-lg' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'}`}><Layers className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline truncate">{t.TAB_PLAY}</span></button>
            <button onClick={() => handleTabChange('missing')} className={`flex flex-1 min-w-[80px] items-center justify-center gap-1.5 py-2 rounded-t-xl font-black text-[10px] sm:text-xs md:text-sm transition-all ${activeTab === 'missing' ? 'bg-purple-500 text-white shadow-lg' : 'bg-purple-200 text-purple-700 hover:bg-purple-300'}`}><Compass className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline truncate">{t.TAB_MISSING}</span></button>
            <button onClick={() => handleTabChange('build')} className={`flex flex-1 min-w-[80px] items-center justify-center gap-1.5 py-2 rounded-t-xl font-black text-[10px] sm:text-xs md:text-sm transition-all ${activeTab === 'build' ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-200 text-orange-700 hover:bg-orange-300'}`}><CircleDot className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline truncate">{t.TAB_BUILD}</span></button>
            <button onClick={() => handleTabChange('journey')} className={`flex flex-1 min-w-[80px] items-center justify-center gap-1.5 py-2 rounded-t-xl font-black text-[10px] sm:text-xs md:text-sm transition-all ${activeTab === 'journey' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}><Map className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline truncate">{t.TAB_JOURNEY}</span></button>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full flex flex-col items-center relative z-10 overflow-y-auto p-4 scrollbar-hide">
          
          {/* --- LEARN TAB --- */}
          {activeTab === 'learn' && (
            <div className="w-full max-w-4xl bg-white rounded-[2rem] p-6 border-4 border-sky-200 shadow-xl flex flex-col gap-4 animate-in fade-in duration-500">
              <h2 className="text-2xl font-black text-center text-sky-600 mb-2">{t.RULE_TITLE}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-100 p-4 rounded-3xl border-b-[6px] border-purple-200 text-center"><div className="text-3xl mb-1 text-purple-500 flex justify-center"><Tent size={40} /></div><h3 className="font-black text-lg text-purple-700 mb-1">{t.RULE_1_TITLE}</h3><p className="font-medium text-sm text-purple-900">{t.RULE_1_DESC}</p></div>
                <div className="bg-pink-100 p-4 rounded-3xl border-b-[6px] border-pink-200 text-center"><div className="text-3xl mb-1 font-black text-pink-500 flex justify-center">× ÷</div><h3 className="font-black text-lg text-pink-700 mb-1">{t.RULE_2_TITLE}</h3><p className="font-medium text-sm text-pink-900">{t.RULE_2_DESC}</p></div>
                <div className="bg-yellow-100 p-4 rounded-3xl border-b-[6px] border-yellow-200 text-center"><div className="text-3xl mb-1 font-black text-yellow-600 flex justify-center">+ -</div><h3 className="font-black text-lg text-yellow-700 mb-1">{t.RULE_3_TITLE}</h3><p className="font-medium text-sm text-yellow-900">{t.RULE_3_DESC}</p></div>
              </div>
              
              <div className="bg-sky-50 rounded-3xl p-4 border-4 border-sky-100 mt-2">
                <h3 className="font-black text-xl text-sky-600 mb-3 text-center">{t.EXAMPLE_TITLE}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Example 1 */}
                  <div className="flex flex-col gap-2 font-bold text-sm text-slate-700">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-sky-100 text-center">{t.EXAMPLE_START}</div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-purple-200 text-center">{t.EXAMPLE_S1}</div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-yellow-200 text-center">{t.EXAMPLE_S2}</div>
                    <div className="bg-emerald-100 px-4 py-2 rounded-xl shadow-sm border-2 border-emerald-300 text-center text-emerald-700 text-lg">{t.EXAMPLE_END}</div>
                  </div>
                  {/* Example 2 */}
                  <div className="flex flex-col gap-2 font-bold text-sm text-slate-700">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-sky-100 text-center">{t.EXAMPLE2_START}</div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-pink-200 text-center">{t.EXAMPLE2_S1}</div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-yellow-200 text-center">{t.EXAMPLE2_S2}</div>
                    <div className="bg-emerald-100 px-4 py-2 rounded-xl shadow-sm border-2 border-emerald-300 text-center text-emerald-700 text-lg">{t.EXAMPLE2_END}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-sky-100 text-center">
                 <p className="text-xs font-medium text-sky-600/70 max-w-2xl mx-auto italic">{t.ACKNOWLEDGEMENT}</p>
              </div>
            </div>
          )}

          {/* --- PLAY TAB --- */}
          {activeTab === 'play' && (
            <div className="w-full h-full flex flex-col items-center animate-in fade-in duration-500">
              {currentLevelId === null ? (
                <div className="w-full flex flex-col items-center">
                  
                  <div className="bg-pink-50 border-4 border-pink-200 rounded-3xl p-4 md:p-5 mb-4 md:mb-6 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl shadow-sm shrink-0">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg md:text-xl font-black text-pink-600 mb-1">{t.PLAY_HOWTO_TITLE}</h3>
                      <p className="text-xs md:text-sm font-bold text-slate-600 leading-snug">{t.PLAY_HOWTO_DESC}</p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border-2 border-pink-100 flex items-center gap-2 shadow-inner shrink-0">
                      <span className="text-xs font-black text-slate-400 uppercase mr-1">{t.EX_LABEL}</span>
                      <div className="px-2 md:px-3 py-1 bg-white border-b-4 border-slate-200 rounded-lg font-black text-lg md:text-xl">2</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-yellow-400 text-yellow-900 rounded-full font-black text-lg">+</div>
                      <div className="px-2 md:px-3 py-1 bg-white border-b-4 border-slate-200 rounded-lg font-black text-lg md:text-xl">3</div>
                      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-pink-400 text-white rounded-full font-black animate-pulse ring-4 ring-pink-200 text-lg">×</div>
                      <div className="px-2 md:px-3 py-1 bg-white border-b-4 border-slate-200 rounded-lg font-black text-lg md:text-xl">4</div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-pink-600 mb-4">{t.LEVEL_SELECT}</h2>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl overflow-y-auto px-4 pb-4">
                    {GAME_LEVELS.map((lvl) => (
                      <button key={lvl.id} onClick={() => { setCurrentLevelId(lvl.id); setCurrentQuestionIdx(0); }} className="bg-white hover:bg-pink-50 p-4 rounded-3xl border-b-[6px] border-pink-300 active:border-b-0 active:translate-y-[6px] transition-all flex flex-col items-center shadow-sm border-2">
                        <div className="text-3xl mb-2 text-pink-400"><Layers strokeWidth={2.5} size={36} /></div>
                        <h3 className="text-lg font-black text-slate-700 mb-1 text-center">{lvl['title' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.titleEn}</h3>
                        <p className="font-bold text-pink-500 text-sm">{lvl['desc' + lang.charAt(0).toUpperCase() + lang.slice(1)] || lvl.descEn}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="flex w-full max-w-2xl justify-between items-center mb-2 px-4">
                    <button onClick={() => setCurrentLevelId(null)} className="text-pink-600 font-bold text-sm bg-pink-200/50 hover:bg-pink-200 px-4 py-1.5 rounded-full">{t.LEVEL_SELECT}</button>
                    <div className="text-slate-500 font-bold text-sm bg-white/50 px-4 py-1.5 rounded-full">{t.QUESTION} {currentQuestionIdx + 1} / {levelObj.questions.length}</div>
                  </div>
                  
                  <ProgressBar current={currentQuestionIdx} total={levelObj.questions.length} colorClass="bg-pink-500" />

                  <div className="bg-white px-6 py-3 rounded-full border-4 border-pink-200 shadow-md flex items-center gap-4 mb-6">
                    <span className="text-lg font-bold text-slate-400 uppercase">{t.GOAL}</span>
                    <span className="text-4xl font-black text-pink-500">{levelData?.target}</span>
                  </div>

                  {history.map((histEq, hIdx) => (
                    <div key={hIdx} className="flex gap-1.5 opacity-40 scale-90 mb-[-0.75rem] pointer-events-none">
                      {histEq.map((item) => <div key={item.id} className="text-xl font-bold bg-white px-3 py-1.5 rounded-xl text-slate-400 border-2 border-slate-200">{item.value}</div>)}
                    </div>
                  ))}

                  <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                    {equation.map((item, idx) => {
                      if (item.type === 'num') return <div key={item.id} className="min-w-[3rem] px-4 py-2 bg-white border-b-[6px] border-slate-200 rounded-2xl shadow-sm"><span className="text-3xl font-black text-slate-700">{item.value}</span></div>;
                      if (item.type === 'bracket') return <div key={item.id} className="px-1"><span className="text-5xl md:text-6xl font-bold text-purple-300">{item.value}</span></div>;
                      const isStrong = item.value === '×' || item.value === '÷';
                      return (
                        <button key={item.id} onClick={() => handleOperatorClick(idx)} className={`relative flex justify-center items-center w-12 h-12 md:w-14 md:h-14 rounded-full font-black text-3xl shadow-md border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all duration-150 ${errorId === item.id ? 'animate-wiggle bg-red-500 border-red-700 text-white' : hintId === item.id ? 'bg-emerald-400 border-emerald-600 text-white animate-pulse' : isStrong ? 'bg-pink-400 border-pink-600 text-white hover:bg-pink-300' : 'bg-yellow-400 border-yellow-600 text-yellow-900 hover:bg-yellow-300'}`}>
                          {item.value}
                        </button>
                      );
                    })}
                  </div>

                  {!isWin && (
                    <div className="flex gap-4 mt-8">
                      <button onClick={() => { setHintId(equation[getNextOperatorIndex(equation)]?.id); setTimeout(() => setHintId(null), 2000); setErrorCount(prev => prev + 1); }} disabled={isWin} className="flex items-center justify-center w-12 h-12 bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-full font-bold transition-all border-b-[4px] border-pink-400 active:border-b-0 active:translate-y-1"><Lightbulb className="w-5 h-5" /></button>
                      <button onClick={() => { setHistory(prev => prev.slice(0, -1)); setEquation(history[history.length - 1]); }} disabled={history.length === 0 || isWin} className="flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 rounded-full font-bold transition-all border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-1"><Undo2 className="w-5 h-5" /></button>
                      <button onClick={() => { setEquation(parseEquation(levelData.eq)); setHistory([]); setHintId(null); }} disabled={isWin} className="flex items-center justify-center w-12 h-12 bg-rose-100 hover:bg-rose-200 disabled:opacity-50 text-rose-500 rounded-full font-bold transition-all border-b-[4px] border-rose-300 active:border-b-0 active:translate-y-1"><RefreshCw className="w-5 h-5" /></button>
                    </div>
                  )}

                  {isWin && (
                    <div className="mt-8 bg-white border-4 border-emerald-400 p-6 rounded-3xl flex flex-col items-center shadow-xl animate-in zoom-in">
                      <h2 className="text-2xl font-black text-emerald-500 mb-4 flex items-center gap-2">{t.SUCCESS}</h2>
                      {currentQuestionIdx < levelObj.questions.length - 1 ? (
                        <button onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-black text-xl border-b-[6px] border-emerald-700 active:border-b-0 active:translate-y-[6px] transition-all">
                          {t.NEXT} <ChevronRight className="w-6 h-6" />
                        </button>
                      ) : (
                        <button onClick={() => setCurrentLevelId(null)} className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-white rounded-full font-black text-xl border-b-[6px] border-amber-600 active:border-b-0 active:translate-y-[6px] transition-all">{t.LEVEL_COMPLETE} - {t.BACK_TO_LEVELS}</button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- MISSING LINK TAB --- */}
          {activeTab === 'missing' && <MissingLinkGame t={t} lang={lang} recordScore={recordScore} />}

          {/* --- BUILDER TAB --- */}
          {activeTab === 'build' && <BuilderGame t={t} lang={lang} recordScore={recordScore} />}

          {/* --- JOURNEY TAB --- */}
          {activeTab === 'journey' && <JourneyTab progress={globalProgress} setProgress={setGlobalProgress} t={t} />}

        </main>
      </div>
    </div>
  );
}
