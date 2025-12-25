<script>
let player;
let ytStarted = false;
let ytReady = false;
let openedLetter = null;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '1', // ไม่เป็น 0
        width: '1',
        videoId: 'KRtvCCDbLgQ',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'KRtvCCDbLgQ'
        },
        events: {
            onReady: (event) => {
                ytReady = true;
                event.target.mute(); // Mute ก่อน
                console.log("YouTube Ready");
            }
        }
    });
}

function createSnowflake() {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.textContent = "❄";
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.fontSize = Math.random() * 10 + 15 + "px";
    snow.style.animationDuration = Math.random() * 3 + 3 + "s";
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 7000);
}

function openGift() {
    const gift = document.querySelector(".gift");
    const lettersBox = document.getElementById("letters");
    const allLetters = document.querySelectorAll(".letter");

    // เล่นเพลงหลังคลิก 🎁
    if (!ytStarted && ytReady) {
        player.unMute();
        player.playVideo();
        ytStarted = true;
    }

    gift.classList.add("opened");
    lettersBox.style.display = "block";

    allLetters.forEach(letter => {
        letter.style.display = "block";
        letter.style.transform = "translate(0,0)";
    });

    setTimeout(() => {
        gift.style.display = "none";
        allLetters.forEach(letter => {
            letter.style.opacity = "1";
            const dir = letter.dataset.dir;
            if (dir === "left") letter.style.transform = "translate(-120px, 140px) scale(1)";
            if (dir === "right") letter.style.transform = "translate(120px, 140px) scale(1)";
            if (dir === "up") letter.style.transform = "translate(0px, 60px) scale(1)";
        });
    }, 100);
}

function openLetter(letter) {
    const popup = document.getElementById("popup");
    const text = document.getElementById("popup-text");
    openedLetter = letter;
    text.textContent = letter.dataset.message;
    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
    if (openedLetter) {
        openedLetter.style.display = "none";
        openedLetter = null;
    }
}

setInterval(createSnowflake, 200);
</script>

</body>
</html>
