// ═══════════════════════════════════════════════════════════════
// APP - Système d'apprentissage progressif
// ═══════════════════════════════════════════════════════════════

// État global
const state = {
    // Progression sauvegardée
    progress: {
        completedLessons: [],      // IDs des leçons terminées
        phraseStats: {},           // { phraseId: { correct: n, total: n, lastSeen: date } }
        streak: 0,
        lastStudyDate: null,
        totalPhrases: 0
    },
    
    // Session actuelle
    currentModule: null,
    currentLesson: null,
    currentPhraseIndex: 0,
    sessionCorrect: 0,
    sessionTotal: 0,
    sessionPhrases: [],
    
    // UI
    theme: 'light'
};

// ═══════════════════════════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════════════════════════

function init() {
    loadProgress();
    loadTheme();
    renderHome();
    setupEventListeners();
    updateStreak();
}

function loadProgress() {
    const saved = localStorage.getItem('arabicLearning');
    if (saved) {
        state.progress = JSON.parse(saved);
    }
}

function saveProgress() {
    localStorage.setItem('arabicLearning', JSON.stringify(state.progress));
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    state.theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = state.theme === 'light' ? '🌙' : '☀️';
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastStudy = state.progress.lastStudyDate;
    
    if (lastStudy) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudy === today) {
            // Déjà étudié aujourd'hui, rien à faire
        } else if (lastStudy === yesterday.toDateString()) {
            // Étudié hier, streak continue
        } else {
            // Streak cassé
            state.progress.streak = 0;
        }
    }
    
    document.getElementById('streakCount').textContent = state.progress.streak;
}

// ═══════════════════════════════════════════════════════════════
// RENDU - ACCUEIL
// ═══════════════════════════════════════════════════════════════

function renderHome() {
    showView('homeView');
    renderStats();
    renderModules();
    renderReviewSection();
}

function renderStats() {
    document.getElementById('phrasesLearned').textContent = state.progress.totalPhrases;
    
    // Calcul maîtrise globale
    const stats = Object.values(state.progress.phraseStats);
    let totalMastery = 0;
    if (stats.length > 0) {
        stats.forEach(s => {
            totalMastery += s.total > 0 ? (s.correct / s.total) * 100 : 0;
        });
        totalMastery = Math.round(totalMastery / stats.length);
    }
    document.getElementById('masteryPercent').textContent = totalMastery + '%';
    
    // Niveau basé sur les modules complétés
    const completedModules = CURRICULUM.modules.filter(m => isModuleCompleted(m.id)).length;
    const levels = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+'];
    document.getElementById('currentLevel').textContent = levels[Math.min(completedModules, levels.length - 1)];
}

function renderModules() {
    const container = document.getElementById('modulesList');
    container.innerHTML = '';
    
    CURRICULUM.modules.forEach((module, index) => {
        const isLocked = isModuleLocked(module);
        const isCompleted = isModuleCompleted(module.id);
        const progress = getModuleProgress(module);
        
        const card = document.createElement('div');
        card.className = `module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="module-header">
                <span class="module-emoji">${module.emoji}</span>
                <div class="module-info">
                    <div class="module-title">${module.title}</div>
                    <div class="module-desc">${module.description}</div>
                </div>
                <div class="module-status">
                    ${isLocked ? '<span class="lock-icon">🔒</span>' : ''}
                    ${isCompleted ? '<span class="check-icon">✓</span>' : ''}
                </div>
            </div>
            <div class="module-progress">
                <div class="module-progress-fill" style="width: ${progress}%"></div>
            </div>
            ${!isLocked ? renderLessons(module) : ''}
        `;
        
        if (!isLocked) {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.lesson-item')) return;
                // Toggle expand
                card.classList.toggle('expanded');
            });
        }
        
        container.appendChild(card);
    });
}

function renderLessons(module) {
    const lessons = module.lessons || [];
    if (lessons.length === 0) return '';
    
    let html = '<div class="module-lessons">';
    
    lessons.forEach((lesson, index) => {
        const isLocked = isLessonLocked(lesson);
        const isCompleted = state.progress.completedLessons.includes(lesson.id);
        
        html += `
            <div class="lesson-item ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                 data-lesson-id="${lesson.id}" 
                 data-module-id="${module.id}">
                <span class="lesson-number">${isCompleted ? '✓' : index + 1}</span>
                <span class="lesson-name">${lesson.title}</span>
                <span class="lesson-status-icon">${isLocked ? '🔒' : (isCompleted ? '' : '→')}</span>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function renderReviewSection() {
    const toReview = getPhrasesToReview();
    const section = document.getElementById('reviewSection');
    
    if (toReview.length > 0) {
        section.style.display = 'block';
        document.getElementById('reviewCount').textContent = toReview.length;
    } else {
        section.style.display = 'none';
    }
}

// ═══════════════════════════════════════════════════════════════
// LOGIQUE PROGRESSION
// ═══════════════════════════════════════════════════════════════

function isModuleLocked(module) {
    if (!module.locked && !module.requires) return false;
    if (module.requires) {
        return !module.requires.every(reqId => isModuleCompleted(reqId));
    }
    return module.locked;
}

function isModuleCompleted(moduleId) {
    const module = CURRICULUM.modules.find(m => m.id === moduleId);
    if (!module || !module.lessons) return false;
    
    return module.lessons.every(lesson => 
        state.progress.completedLessons.includes(lesson.id)
    );
}

function getModuleProgress(module) {
    if (!module.lessons || module.lessons.length === 0) return 0;
    
    const completed = module.lessons.filter(l => 
        state.progress.completedLessons.includes(l.id)
    ).length;
    
    return Math.round((completed / module.lessons.length) * 100);
}

function isLessonLocked(lesson) {
    if (!lesson.requires) return false;
    return !lesson.requires.every(reqId => 
        state.progress.completedLessons.includes(reqId)
    );
}

function getPhrasesToReview() {
    // Phrases vues il y a plus de X heures selon leur niveau
    const now = Date.now();
    const toReview = [];
    
    Object.entries(state.progress.phraseStats).forEach(([phraseId, stats]) => {
        if (!stats.lastSeen) return;
        
        const hoursSince = (now - stats.lastSeen) / (1000 * 60 * 60);
        const mastery = stats.total > 0 ? stats.correct / stats.total : 0;
        
        // Intervalle basé sur la maîtrise
        let interval = 4; // 4h par défaut
        if (mastery >= 0.8) interval = 72;      // 3 jours
        else if (mastery >= 0.6) interval = 24; // 1 jour
        
        if (hoursSince >= interval) {
            toReview.push(phraseId);
        }
    });
    
    return toReview;
}

// ═══════════════════════════════════════════════════════════════
// LEÇON
// ═══════════════════════════════════════════════════════════════

function startLesson(moduleId, lessonId) {
    const module = CURRICULUM.modules.find(m => m.id === moduleId);
    const lesson = module?.lessons?.find(l => l.id === lessonId);
    
    if (!module || !lesson) return;
    if (isLessonLocked(lesson)) return;
    
    state.currentModule = module;
    state.currentLesson = lesson;
    state.currentPhraseIndex = 0;
    state.sessionCorrect = 0;
    state.sessionTotal = 0;
    state.sessionPhrases = lesson.phrases || [];
    
    showView('lessonView');
    
    // Update header
    document.getElementById('lessonModule').textContent = module.title;
    document.getElementById('lessonTitle').textContent = lesson.title;
    
    // Show objective
    document.getElementById('objectiveCard').style.display = 'block';
    document.getElementById('phraseCard').style.display = 'none';
    document.getElementById('objectiveText').textContent = lesson.objective || '';
}

function beginLesson() {
    document.getElementById('objectiveCard').style.display = 'none';
    document.getElementById('phraseCard').style.display = 'block';
    renderPhrase();
}

function renderPhrase() {
    const phrase = state.sessionPhrases[state.currentPhraseIndex];
    if (!phrase) return;
    
    // Progress
    const progress = ((state.currentPhraseIndex + 1) / state.sessionPhrases.length) * 100;
    document.getElementById('lessonProgressFill').style.width = `${progress}%`;
    document.getElementById('lessonProgressText').textContent = 
        `${state.currentPhraseIndex + 1}/${state.sessionPhrases.length}`;
    
    // Type badge
    const isNew = !state.progress.phraseStats[phrase.arabic];
    document.getElementById('phraseType').innerHTML = `
        <span class="type-badge ${isNew ? 'new' : 'review'}">${isNew ? 'Nouveau' : 'Révision'}</span>
    `;
    
    // Phrase content
    document.getElementById('arabicText').textContent = phrase.arabic;
    document.getElementById('translitText').textContent = phrase.transliteration;
    document.getElementById('translationText').textContent = phrase.translation;
    
    // Reset translation visibility
    document.getElementById('translationArea').classList.remove('revealed');
    
    // Grammar note
    const grammarNote = document.getElementById('grammarNote');
    if (phrase.grammar) {
        grammarNote.style.display = 'flex';
        document.getElementById('grammarText').textContent = phrase.grammar;
    } else {
        grammarNote.style.display = 'none';
    }
    
    // Render responses
    renderResponses(phrase.responses);
    
    // Hide next button
    document.getElementById('nextPhraseBtn').style.display = 'none';
}

function renderResponses(responses) {
    const container = document.getElementById('responsesList');
    const shuffled = [...responses].sort(() => Math.random() - 0.5);
    
    container.innerHTML = shuffled.map((resp, i) => `
        <div class="response-item" data-correct="${resp.correct}" data-index="${i}">
            <p class="response-arabic">${resp.arabic}</p>
            <p class="response-translation">${resp.translation}</p>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.response-item').forEach(item => {
        item.addEventListener('click', handleResponseClick);
    });
}

function handleResponseClick(e) {
    const item = e.currentTarget;
    if (item.classList.contains('disabled')) return;
    
    const isCorrect = item.dataset.correct === 'true';
    const phrase = state.sessionPhrases[state.currentPhraseIndex];
    
    // Update stats
    state.sessionTotal++;
    if (isCorrect) state.sessionCorrect++;
    
    // Update phrase stats
    if (!state.progress.phraseStats[phrase.arabic]) {
        state.progress.phraseStats[phrase.arabic] = { correct: 0, total: 0, lastSeen: null };
    }
    const stats = state.progress.phraseStats[phrase.arabic];
    stats.total++;
    if (isCorrect) stats.correct++;
    stats.lastSeen = Date.now();
    
    // Visual feedback
    document.querySelectorAll('.response-item').forEach(r => {
        r.classList.add('disabled');
        if (r.dataset.correct === 'true') {
            r.classList.add('correct');
        }
    });
    
    if (!isCorrect) {
        item.classList.add('incorrect');
    }
    
    // Reveal translation
    document.getElementById('translationArea').classList.add('revealed');
    
    // Show next button
    document.getElementById('nextPhraseBtn').style.display = 'flex';
    
    saveProgress();
}

function nextPhrase() {
    state.currentPhraseIndex++;
    
    if (state.currentPhraseIndex >= state.sessionPhrases.length) {
        // Leçon terminée
        completeLesson();
    } else {
        // Phrase suivante
        document.getElementById('phraseCard').style.opacity = '0';
        setTimeout(() => {
            renderPhrase();
            document.getElementById('phraseCard').style.opacity = '1';
        }, 150);
    }
}

function completeLesson() {
    const lessonId = state.currentLesson.id;
    
    // Marquer comme complété si >60% correct
    const mastery = state.sessionTotal > 0 ? (state.sessionCorrect / state.sessionTotal) * 100 : 0;
    
    if (mastery >= 60 && !state.progress.completedLessons.includes(lessonId)) {
        state.progress.completedLessons.push(lessonId);
        state.progress.totalPhrases += state.sessionPhrases.length;
    }
    
    // Update streak
    const today = new Date().toDateString();
    if (state.progress.lastStudyDate !== today) {
        state.progress.streak++;
        state.progress.lastStudyDate = today;
    }
    
    saveProgress();
    showResults(mastery);
}

function showResults(mastery) {
    showView('resultView');
    
    // Emoji based on performance
    let emoji = '🎉';
    let title = 'Leçon terminée !';
    let subtitle = 'Tu progresses bien';
    
    if (mastery < 60) {
        emoji = '💪';
        title = 'Continue !';
        subtitle = 'Un peu plus de pratique et ce sera parfait';
    } else if (mastery >= 90) {
        emoji = '🌟';
        title = 'Excellent !';
        subtitle = 'Tu maîtrises cette leçon';
    }
    
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultSubtitle').textContent = subtitle;
    document.getElementById('resultCorrect').textContent = `${state.sessionCorrect}/${state.sessionTotal}`;
    document.getElementById('resultMastery').textContent = `${Math.round(mastery)}%`;
    
    // Phrases summary
    const summary = document.getElementById('phrasesSummary');
    summary.innerHTML = state.sessionPhrases.map(p => `<li>${p.arabic}</li>`).join('');
    
    // Review button
    const reviewBtn = document.getElementById('reviewMistakesBtn');
    reviewBtn.style.display = mastery < 100 ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════════════════════════

function playAudio() {
    const phrase = state.sessionPhrases[state.currentPhraseIndex];
    if (!phrase) return;
    
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase.arabic);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
        
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
        if (arabicVoice) utterance.voice = arabicVoice;
        
        window.speechSynthesis.speak(utterance);
    }
}

// ═══════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Lesson items (delegated)
    document.getElementById('modulesList').addEventListener('click', (e) => {
        const lessonItem = e.target.closest('.lesson-item');
        if (lessonItem && !lessonItem.classList.contains('locked')) {
            const lessonId = lessonItem.dataset.lessonId;
            const moduleId = lessonItem.dataset.moduleId;
            startLesson(moduleId, lessonId);
        }
    });
    
    // Back to home
    document.getElementById('backToHome').addEventListener('click', renderHome);
    
    // Start lesson
    document.getElementById('startLessonBtn').addEventListener('click', beginLesson);
    
    // Audio
    document.getElementById('audioBtn').addEventListener('click', playAudio);
    
    // Reveal translation
    document.getElementById('revealBtn').addEventListener('click', () => {
        document.getElementById('translationArea').classList.add('revealed');
    });
    
    // Next phrase
    document.getElementById('nextPhraseBtn').addEventListener('click', nextPhrase);
    
    // Continue learning (from results)
    document.getElementById('continueLearningBtn').addEventListener('click', renderHome);
    
    // Review section
    document.getElementById('startReviewBtn')?.addEventListener('click', startReview);
}

function startReview() {
    // TODO: Implémenter la révision des phrases à revoir
    alert('Fonctionnalité en cours de développement');
}

// ═══════════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', init);
