function startCatSpin() {
    // Add audio
    const audio = document.createElement('audio');
    audio.src = 'cat.mp3';
    audio.autoplay = true;
    audio.loop = true;
    document.body.appendChild(audio);

    // Create green overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#00FF00';
    overlay.style.zIndex = 9998;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s';
    document.body.appendChild(overlay);

    // Function to spawn adaptive GIFs
    function spawnCatGif() {
        const gif = document.createElement('img');
        gif.src = 'cat.gif';
        gif.style.position = 'fixed';
        gif.style.zIndex = 9999;

        // Responsive sizing based on screen width
        const screenWidth = window.innerWidth;
        const size = screenWidth < 480 ? 80 : (screenWidth < 768 ? 100 : 150);
        gif.style.width = size + 'px';
        gif.style.height = 'auto';
        gif.style.animation = 'spin 2s linear infinite';

        // Position with margin so it's not partially offscreen
        const margin = 20;
        const top = Math.random() * (window.innerHeight - size - margin * 2) + margin;
        const left = Math.random() * (window.innerWidth - size - margin * 2) + margin;

        gif.style.top = top + 'px';
        gif.style.left = left + 'px';
        document.body.appendChild(gif);

        setTimeout(() => gif.remove(), 8000); // Shorter lifespan for perf
    }

    // Limit number of gifs to avoid overload
    let gifInterval = setInterval(() => {
        if (document.querySelectorAll('img[src="cat.gif"]').length < 10) {
            spawnCatGif();
        }
    }, 500);

    // Green flash every 2s
    function flashScreen() {
        overlay.style.opacity = '1';
        setTimeout(() => overlay.style.opacity = '0', 200);
    }

    // Delayed full-spin effect
    setTimeout(() => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes spin-all {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            body *:not(script):not(style):not(audio) {
                animation: spin-all 5s linear infinite;
            }
        `;
        document.head.appendChild(style);
        setInterval(flashScreen, 2000);
    }, 3500);
}
