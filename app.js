// App State
let currentLesson = 0;
let currentPhrase = 0;
let correctAnswers = 0;
let startTime = null;
let answered = false;

// Theme
function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

let currentTheme = getInitialTheme();

// DOM Elements
const elements = {
    levelBadge: document.getElementById('levelBadge'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    contextBadge: document.getElementById('contextBadge'),
    arabicPhrase: document.getElementById('arabicPhrase'),
    transliteration: document.getElementById('transliteration'),
    listenBtn: document.getElementById('listenBtn'),
    translationSection: document.getElementById('translationSection'),
    revealBtn: document.getElementById('revealBtn'),
    translation: document.getElementById('translation'),
    responseSection: document.getElementById('responseSection'),
    responseOptions: document.getElementById('responseOptions'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    themeToggle: document.getElementById('themeToggle'),
    completeModal: document.getElementById('completeModal'),
    statCorrect: document.getElementById('statCorrect'),
    statTime: document.getElementById('statTime'),
    nextLessonBtn: document.getElementById('nextLessonBtn')
};

// Initialize
function init() {
    initTheme();
    loadProgress();
    displayPhrase();
    setupEventListeners();
    startTime = Date.now();
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('arabicProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentLesson = progress.lesson || 0;
        // Start at beginning of lesson
        currentPhrase = 0;
    }
}

function saveProgress() {
    localStorage.setItem('arabicProgress', JSON.stringify({
        lesson: currentLesson
    }));
}

// Display current phrase
function displayPhrase() {
    const lesson = LESSONS[currentLesson];
    if (!lesson) return;
    
    const phrase = lesson.phrases[currentPhrase];
    if (!phrase) return;
    
    // Reset state
    answered = false;
    elements.translationSection.classList.remove('revealed');
    
    // Update UI
    elements.levelBadge.textContent = lesson.level;
    document.querySelector('.context-emoji').textContent = lesson.emoji;
    document.querySelector('.context-text').textContent = lesson.title;
    
    elements.arabicPhrase.textContent = phrase.arabic;
    elements.transliteration.textContent = phrase.transliteration;
    elements.translation.textContent = phrase.translation;
    
    // Update progress
    const total = lesson.phrases.length;
    const progress = ((currentPhrase + 1) / total) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `${currentPhrase + 1}/${total}`;
    
    // Render response options
    renderResponses(phrase.responses);
    
    // Update navigation
    elements.prevBtn.disabled = (currentPhrase === 0 && currentLesson === 0);
    elements.nextBtn.textContent = 'Suivant';
    
    // Animation
    document.getElementById('dialogueCard').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('dialogueCard').style.opacity = '1';
    }, 50);
}

// Render response options
function renderResponses(responses) {
    // Shuffle responses
    const shuffled = [...responses].sort(() => Math.random() - 0.5);
    
    elements.responseOptions.innerHTML = shuffled.map((resp, i) => `
        <div class="response-option" data-correct="${resp.correct}" data-index="${i}">
            <p class="response-arabic">${resp.arabic}</p>
            <p class="response-translation">${resp.translation}</p>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.response-option').forEach(option => {
        option.addEventListener('click', handleResponse);
    });
}

// Handle response selection
function handleResponse(e) {
    if (answered) return;
    answered = true;
    
    const option = e.currentTarget;
    const isCorrect = option.dataset.correct === 'true';
    
    // Mark all options
    document.querySelectorAll('.response-option').forEach(opt => {
        opt.classList.add('disabled');
        if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
        }
    });
    
    if (!isCorrect) {
        option.classList.add('incorrect');
    } else {
        correctAnswers++;
    }
    
    // Reveal translation
    elements.translationSection.classList.add('revealed');
    
    // Update next button
    elements.nextBtn.innerHTML = `
        Suivant
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    `;
}

// Navigation
function goNext() {
    const lesson = LESSONS[currentLesson];
    
    if (currentPhrase < lesson.phrases.length - 1) {
        // Next phrase in lesson
        currentPhrase++;
        displayPhrase();
    } else {
        // Lesson complete
        showLessonComplete();
    }
}

function goPrev() {
    if (currentPhrase > 0) {
        currentPhrase--;
        displayPhrase();
    } else if (currentLesson > 0) {
        currentLesson--;
        currentPhrase = LESSONS[currentLesson].phrases.length - 1;
        displayPhrase();
    }
}

// Show lesson complete modal
function showLessonComplete() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    elements.statCorrect.textContent = correctAnswers;
    elements.statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    elements.completeModal.classList.add('active');
    saveProgress();
}

// Next lesson
function startNextLesson() {
    elements.completeModal.classList.remove('active');
    
    if (currentLesson < LESSONS.length - 1) {
        currentLesson++;
        currentPhrase = 0;
        correctAnswers = 0;
        startTime = Date.now();
        saveProgress();
        displayPhrase();
    } else {
        // All lessons complete
        alert('Bravo ! Tu as terminé toutes les leçons disponibles 🎉');
    }
}

// Text-to-Speech
function speakArabic(text) {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
        utterance.voice = arabicVoice;
    }
    
    window.speechSynthesis.speak(utterance);
}

// Event Listeners
function setupEventListeners() {
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    elements.listenBtn.addEventListener('click', () => {
        const phrase = LESSONS[currentLesson].phrases[currentPhrase];
        speakArabic(phrase.arabic);
    });
    
    elements.revealBtn.addEventListener('click', () => {
        elements.translationSection.classList.add('revealed');
    });
    
    elements.nextBtn.addEventListener('click', goNext);
    elements.prevBtn.addEventListener('click', goPrev);
    elements.nextLessonBtn.addEventListener('click', startNextLesson);
    
    // Load voices
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {};
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);
