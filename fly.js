(function() {
    // Duration in milliseconds
    const DURATION = 60000; // 60 seconds (rave duration)
    const INTRO_DURATION = 5000; // 5 seconds for intro
    const LYRIC_DELAY = 7000; // 7 seconds delay for lyrics after music starts

    // Create audio element (starts after intro)
    const audio = document.createElement('audio');
    audio.src = 'https://github.com/orlyjamie/home/raw/main/fly.mp3';
    audio.loop = false;
    audio.volume = 0.5;

    // Create Matrix intro elements
    const introContainer = document.createElement('div');
    introContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: black;
        z-index: 2000;
        opacity: 1;
        transition: opacity 1s ease-out;
    `;
    document.body.appendChild(introContainer);

    // Add background image
    const introImage = document.createElement('img');
    introImage.src = 'https://raw.githubusercontent.com/orlyjamie/home/refs/heads/main/elonmatrix.jpeg';
    introImage.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
        z-index: 2001;
    `;
    introContainer.appendChild(introImage);

    // Matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2002;';
    introContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'limegreen';
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    const matrixInterval = setInterval(drawMatrix, 50);

    const introMessage = document.createElement('div');
    introMessage.textContent = '@theonejvo vibe hacking in progress';
    introMessage.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: limegreen;
        font-family: 'Courier New', monospace;
        font-size: 36px;
        text-align: center;
        text-shadow: 0 0 10px limegreen;
        z-index: 2003; // Above rain
        opacity: 1;
    `;
    introContainer.appendChild(introMessage);

    // Create walking images (appear after intro)
    const img1 = document.createElement('img');
    img1.src = 'https://raw.githubusercontent.com/orlyjamie/home/refs/heads/main/vibehacking.png';
    const img2 = document.createElement('img');
    img2.src = 'https://raw.githubusercontent.com/orlyjamie/home/refs/heads/main/levelsio.png';
    const img3 = document.createElement('img');
    img3.src = 'https://raw.githubusercontent.com/orlyjamie/home/refs/heads/main/10x10.png';

    const walkingImages = [img1, img2, img3];
    walkingImages.forEach((img, index) => {
        img.style.cssText = `
            position: fixed;
            bottom: -150px;
            left: ${20 + (index * 250)}px;
            width: 200px;
            height: auto;
            z-index: 1000;
            pointer-events: auto; /* Allow clicks */
            opacity: 0;
            cursor: pointer; /* Indicate clickable */
        `;
        document.body.appendChild(img);
    });

    // Create raver kids (appear after intro)
    const raverKids = [];
    for (let i = 0; i < 5; i++) {
        const raver = document.createElement('img');
        raver.src = 'https://raw.githubusercontent.com/orlyjamie/home/refs/heads/main/ravekid.gif';
        raver.style.cssText = `
            position: fixed;
            bottom: -150px;
            left: ${100 + (i * 300)}px;
            width: 150px;
            height: auto;
            z-index: 998;
            pointer-events: auto; /* Allow clicks */
            opacity: 0;
            cursor: pointer; /* Indicate clickable */
        `;
        document.body.appendChild(raver);
        raverKids.push(raver);
    }

    // Create subtitle container (appears after intro)
    const subtitle = document.createElement('div');
    subtitle.style.cssText = `
        position: fixed;
        bottom: 50px;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 24px;
        font-family: Arial, sans-serif;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
        z-index: 1001;
        pointer-events: none;
        opacity: 0;
    `;
    document.body.appendChild(subtitle);

    // Create stop message (appears during rave)
    const stopMessage = document.createElement('div');
    stopMessage.textContent = 'Press X to stop intro music';
    stopMessage.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 18px;
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.8);
        z-index: 1002;
        opacity: 0;
    `;
    document.body.appendChild(stopMessage);

    // Lyrics with timings starting at 7 seconds after music begins
    const lyrics = [
        { time: 0, text: "Pieter turns the dials of his vibe machine" },
        { time: 4, text: "JVO's hacking rhythms, making vibes unseen" },
        { time: 8, text: "Electric pulses dance through the endless stream" },
        { time: 12, text: "They breathe in code, living the neon dream" },
        { time: 16, text: "A thousand sparks ignite, they program the sound" },
        { time: 20, text: "A heartbeat of the future where no rules are bound" },
        { time: 24, text: "Pieter smiles sharp, JVO grins wide" },
        { time: 28, text: "Their vibes collide in the circuits they confide" },
        { time: 32, text: "Vibe coding, vibe hacking on a rocket to the sky" },
        { time: 36, text: "Elon's plans are glowing, they’re aiming real high" },
        { time: 40, text: "The night bends electric, reality flips" },
        { time: 44, text: "Together they're the architects on this wild trip" },
        { time: 48, text: "Neurons humming, they sync like a beat" },
        { time: 52, text: "Wires sing the secrets of a world complete" },
        { time: 56, text: "Elon sketches stars as numbers flash and spin" },
        { time: 60, text: "Vibe coding and hacking, the future’s breaking in" },
        { time: 64, text: "Pieter deciphers rhythm with his steady hand" },
        { time: 68, text: "JVO cracks the light, part of the master plan" },
        { time: 72, text: "Together they’re unbound, a binary spark" },
        { time: 76, text: "Creating constellations in this endless dark" },
        { time: 80, text: "Vibe coding, vibe hacking on a rocket to the sky" },
        { time: 84, text: "Elon's plans are glowing, they’re aiming real high" },
        { time: 88, text: "The night bends electric, reality flips" },
        { time: 92, text: "Together they're the architects on this wild trip" }
    ];

    // Create stylesheet for animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes path1 {
            0% { left: 20px; bottom: 20px; transform: rotate(5deg); }
            25% { left: 20px; bottom: calc(100vh - 220px); transform: rotate(0deg); }
            50% { left: calc(100vw - 220px); bottom: calc(100vh - 220px); transform: rotate(-5deg); }
            75% { left: calc(100vw - 220px); bottom: 20px; transform: rotate(0deg); }
            100% { left: 20px; bottom: 20px; transform: rotate(5deg); }
        }
        @keyframes path2 {
            0% { left: 270px; bottom: 20px; transform: rotate(5deg); }
            25% { left: calc(100vw - 220px); bottom: 20px; transform: rotate(0deg); }
            50% { left: calc(100vw - 220px); bottom: calc(100vh - 220px); transform: rotate(-5deg); }
            75% { left: 270px; bottom: calc(100vh - 220px); transform: rotate(0deg); }
            100% { left: 270px; bottom: 20px; transform: rotate(5deg); }
        }
        @keyframes path3 {
            0% { left: 520px; bottom: 20px; transform: rotate(5deg); }
            25% { left: 520px; bottom: calc(100vh - 220px); transform: rotate(0deg); }
            50% { left: 20px; bottom: calc(100vh - 220px); transform: rotate(-5deg); }
            75% { left: 20px; bottom: calc(50vh - 110px); transform: rotate(0deg); }
            100% { left: 520px; bottom: 20px; transform: rotate(5deg); }
        }
        @keyframes raverPath1 {
            0% { left: 100px; bottom: 20px; }
            25% { left: calc(50vw - 75px); bottom: calc(25vh); }
            50% { left: calc(100vw - 250px); bottom: 20px; }
            75% { left: calc(25vw); bottom: calc(50vh); }
            100% { left: 100px; bottom: 20px; }
        }
        @keyframes raverPath2 {
            0% { left: 400px; bottom: 20px; }
            25% { left: calc(75vw); bottom: calc(75vh - 150px); }
            50% { left: 100px; bottom: calc(50vh); }
            75% { left: calc(100vw - 300px); bottom: calc(25vh); }
            100% { left: 400px; bottom: 20px; }
        }
        @keyframes raverPath3 {
            0% { left: 700px; bottom: 20px; }
            25% { left: calc(100vw - 150px); bottom: calc(50vh - 75px); }
            50% { left: calc(50vw); bottom: calc(75vh - 150px); }
            75% { left: 200px; bottom: calc(25vh); }
            100% { left: 700px; bottom: 20px; }
        }
        @keyframes raverPath4 {
            0% { left: 1000px; bottom: 20px; }
            25% { left: calc(25vw); bottom: calc(75vh - 150px); }
            50% { left: calc(75vw); bottom: calc(25vh); }
            75% { left: 400px; bottom: calc(50vh); }
            100% { left: 1000px; bottom: 20px; }
        }
        @keyframes raverPath5 {
            0% { left: 1300px; bottom: 20px; }
            25% { left: calc(50vw); bottom: calc(50vh); }
            50% { left: 100px; bottom: calc(75vh - 150px); }
            75% { left: calc(100vw - 150px); bottom: calc(25vh); }
            100% { left: 1300px; bottom: 20px; }
        }
        @keyframes danceBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        @keyframes raveSweep {
            0% { transform: rotate(-30deg) translateX(-100vw); opacity: 0.8; }
            50% { transform: rotate(30deg) translateX(100vw); opacity: 1; }
            100% { transform: rotate(-30deg) translateX(-100vw); opacity: 0.8; }
        }
        @keyframes strobeFlash {
            0% { opacity: 0; }
            10% { opacity: 0.9; }
            20% { opacity: 0; }
            30% { opacity: 0.7; }
            40% { opacity: 0; }
            100% { opacity: 0; }
        }
        @keyframes subtitleFade {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes messageFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Create enhanced rave lights (appear after intro)
    const raveLights = [
        { type: 'beam', color: 'rgba(255, 0, 0, 0.8)', top: '10%', duration: 2, delay: 0 },
        { type: 'beam', color: 'rgba(0, 255, 0, 0.8)', top: '30%', duration: 1.5, delay: 0.5 },
        { type: 'beam', color: 'rgba(0, 0, 255, 0.8)', top: '70%', duration: 2.5, delay: 1 },
        { type: 'strobe', color: 'rgba(255, 255, 0, 0.6)', top: '50%', duration: 0.5, delay: 0 },
        { type: 'strobe', color: 'rgba(255, 0, 255, 0.6)', top: '90%', duration: 0.7, delay: 0.3 }
    ];

    // Declare intervals in outer scope
    let subtitleInterval;

    // Cleanup function
    function stopEverything() {
        audio.pause();
        audio.remove();
        clearInterval(matrixInterval);
        if (subtitleInterval) clearInterval(subtitleInterval);
        walkingImages.forEach(img => {
            img.removeEventListener('click', handleImageClick);
        });
        raverKids.forEach(raver => {
            raver.removeEventListener('click', handleImageClick);
        });
        introContainer.remove();
        document.querySelectorAll('div[style*="raveSweep"], div[style*="strobeFlash"]').forEach(light => light.remove());
        walkingImages.forEach(img => {
            img.style.animation = 'none';
            img.style.transition = 'opacity 1s ease-out';
            img.style.opacity = '0';
            setTimeout(() => img.remove(), 1000);
        });
        raverKids.forEach(raver => {
            raver.style.animation = 'none';
            raver.style.transition = 'opacity 1s ease-out';
            raver.style.opacity = '0';
            setTimeout(() => raver.remove(), 1000);
        });
        subtitle.style.opacity = '0';
        setTimeout(() => subtitle.remove(), 1000);
        stopMessage.style.opacity = '0';
        setTimeout(() => stopMessage.remove(), 1000);
        document.removeEventListener('keydown', handleKeyPress);
    }

    // Key press handler
    function handleKeyPress(event) {
        if (event.key.toLowerCase() === 'x') {
            stopEverything();
        }
    }

    // Image click handler for redirection
    function handleImageClick() {
        window.location.href = 'https://x.com/theonejvo/status/1899391345795731796';
    }

    // Start intro
    setTimeout(() => {
        // Fade out background and image, keep message visible
        introContainer.style.opacity = '0';
        setTimeout(() => {
            introMessage.style.animation = 'messageFade 1s ease-out';
            introMessage.style.opacity = '0';
            setTimeout(() => {
                clearInterval(matrixInterval);
                introContainer.remove();
            }, 1000);
        }, INTRO_DURATION - 1000);

        // Start rave after intro
        audio.play();

        // Animate walking images and add click listeners
        walkingImages.forEach((img, index) => {
            img.style.transition = 'bottom 1s ease-out, opacity 0.5s ease-out';
            img.style.bottom = '20px';
            img.style.opacity = '1';
            setTimeout(() => {
                img.style.transition = 'none';
                const path = `path${index + 1}`;
                img.style.animation = `${path} 10s linear ${DURATION / 10000} ${index * 0.2}s`;
                img.addEventListener('click', handleImageClick); // Add click listener
            }, 1000);
        });

        // Animate raver kids and add click listeners
        raverKids.forEach((raver, index) => {
            raver.style.transition = 'bottom 1s ease-out, opacity 0.5s ease-out';
            raver.style.bottom = '20px';
            raver.style.opacity = '1';
            setTimeout(() => {
                raver.style.transition = 'none';
                const raverPath = `raverPath${index + 1}`;
                raver.style.animation = `
                    ${raverPath} 8s linear ${DURATION / 8000} ${index * 0.2}s,
                    danceBounce 0.8s ease-in-out infinite ${index * 0.1}s
                `;
                raver.addEventListener('click', handleImageClick); // Add click listener
            }, 1000);
        });

        // Add rave lights
        raveLights.forEach(light => {
            const element = document.createElement('div');
            element.style.cssText = `
                position: fixed;
                top: ${light.top};
                left: 0;
                width: ${light.type === 'beam' ? '150%' : '100vw'};
                height: ${light.type === 'beam' ? '8px' : '100vh'};
                background: ${light.color};
                transform-origin: center;
                pointer-events: none;
                z-index: 999;
                animation: ${light.type === 'beam' ? 'raveSweep' : 'strobeFlash'} ${light.duration}s infinite ${light.delay}s;
            `;
            document.body.appendChild(element);
        });

        // Show stop message
        stopMessage.style.opacity = '1';
        document.addEventListener('keydown', handleKeyPress);

        // Show subtitles 7 seconds after music starts
        subtitle.style.opacity = '1';
        let currentLyric = 0;
        subtitleInterval = setInterval(() => {
            const musicTime = audio.currentTime; // Time since music started (at 5s)
            if (musicTime < 7) return; // Wait 7s from music start (12s total)
            const adjustedTime = musicTime - 7; // Lyrics start at 0s relative to 7s delay
            if (currentLyric >= lyrics.length || musicTime * 1000 > DURATION) {
                clearInterval(subtitleInterval);
                subtitle.textContent = '';
                return;
            }
            if (adjustedTime >= lyrics[currentLyric].time) {
                subtitle.textContent = lyrics[currentLyric].text;
                subtitle.style.animation = 'subtitleFade 4s ease-in-out';
                subtitle.addEventListener('animationend', () => {
                    subtitle.style.animation = 'none';
                }, { once: true });
                currentLyric++;
            }
        }, 100);

    }, INTRO_DURATION - 1000); // Start rave 1s before intro fully ends

    // Stop everything after intro + rave duration
    setTimeout(() => {
        stopEverything();
    }, DURATION + INTRO_DURATION);
})();
