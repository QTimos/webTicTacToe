let transitionMessages = [
    "> Initializing system...",
    "> Updating terminal...",
];

function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'transitionOverlay';
    
    const container = document.createElement('div');
    container.className = 'transitionContainer';
    
    const textElement = document.createElement('div');
    textElement.className = 'transitionText';
    
    const cursor = document.createElement('span');
    cursor.className = 'transitionCursor';
    
    container.appendChild(textElement);
    container.appendChild(cursor);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    return { overlay, textElement, cursor };
}

async function typeAndEraseMessages(textElement, cursor, messages, typingSpeed = 30, eraseSpeed = 20, pauseBetween = 800) {
    const messageElements = [];
    
    for (const message of messages) {
        const textP = document.createElement("p");
        textElement.appendChild(textP);
        messageElements.push(textP);
        
        for (let i = 0; i < message.length; i++) {
            textP.textContent = message.substring(0, i + 1);
            textP.appendChild(cursor);
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
        
        await new Promise(resolve => setTimeout(resolve, pauseBetween / 2));
    }
    
    await new Promise(resolve => setTimeout(resolve, pauseBetween));
    
    for (let j = messageElements.length - 1; j >= 0; j--) {
        const textP = messageElements[j];
        const message = messages[j];
        
        for (let i = message.length; i > 0; i--) {
            textP.textContent = message.substring(0, i - 1);
            if (i > 1) {
                textP.appendChild(cursor);
            }
            await new Promise(resolve => setTimeout(resolve, eraseSpeed));
        }
        
        textElement.removeChild(textP);
        await new Promise(resolve => setTimeout(resolve, eraseSpeed * 2));
    }
}

async function transitionPage(url) {
    if (url == "./html/endScreen.html") {
        transitionMessages = [];
        transitionMessages.push("> Calculating results...", "> Loading end screen...");
    }
    if (url == "../index.html") {
        transitionMessages = [];
        transitionMessages.push("> Reloading the game...", "> Loading prefabs...");
    }
    
    const { overlay, textElement, cursor } = createTransitionOverlay();
    document.querySelector('.screenSection').classList.add('fadeOut');
    overlay.classList.add('active');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const messages = [...transitionMessages];
    await typeAndEraseMessages(textElement, cursor, messages);
    window.location.href = url;
}

function updateGoToEndScreen() {
    const originalGoToEndScreen = window.goToEndScreen;
    if (originalGoToEndScreen) {
        window.goToEndScreen = function(gameState) {
            localStorage.setItem("gameState", gameState);
            transitionPage("./html/endScreen.html");
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const screenSection = document.querySelector('.screenSection');
    screenSection.classList.add('pageContent');
    const internalLinks = document.querySelectorAll('a[href^="./"], a[href^="../"], a[href^="#"]');
    internalLinks.forEach(link => {
        if (link.hasAttribute('data-no-transition')) return;
        link.setAttribute('data-transition', 'true');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            transitionPage(url);
        });
    });
    screenSection.style.opacity = '0';
    setTimeout(() => {
        screenSection.style.opacity = '1';
    }, 100);
    updateGoToEndScreen();
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        const screenSection = document.querySelector('.screenSection');
        if (screenSection) {
            screenSection.style.opacity = '0';
            setTimeout(() => {
                screenSection.style.opacity = '1';
            }, 100);
        }
    }
});
