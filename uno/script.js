const colors = ['Red', 'Green', 'Blue', 'Yellow'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', 'Draw Two'];
let player1Hand = [];
let player2Hand = [];
let deck = [];
let currentPlayer = 1; // 1 untuk Pemain 1, 2 untuk Pemain 2
let topCard = null; // Kartu teratas yang sedang dimainkan

// Membuat deck kartu
function createDeck() {
    for (let color of colors) {
        for (let number of numbers) {
            deck.push(`${color} ${number}`);
        }
    }
    shuffleDeck();
}

// Mengacak deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Mengambil kartu dari deck
function drawCard() {
    if (deck.length > 0) {
        const card = deck.pop();
        if (currentPlayer === 1) {
            player1Hand.push(card);
            displayPlayerHand('player1-hand', player1Hand);
        } else {
            player2Hand.push(card);
            displayPlayerHand('player2-hand', player2Hand);
        }
        displayTopCard(card);
        switchPlayer();
    } else {
        alert("Deck kosong!");
    }
}

// Menampilkan kartu di tangan pemain
function displayPlayerHand(playerId, hand) {
    const playerHandDiv = document.getElementById(playerId);
    playerHandDiv.innerHTML = '';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = card;
        cardDiv.onclick = () => playCard(card); // Menambahkan event click untuk memainkan kartu
        playerHandDiv.appendChild(cardDiv);
    });
}

// Menampilkan kartu teratas
function displayTopCard(card) {
    const deckDiv = document.getElementById('deck');
    deckDiv.textContent = `Kartu Teratas: ${card}`;
    topCard = card; // Menyimpan kartu teratas
}

// Memainkan kartu
function playCard(card) {
    if (isValidPlay(card)) {
        if (currentPlayer === 1) {
            player1Hand = player1Hand.filter(c => c !== card);
        } else {
            player2Hand = player2Hand.filter(c => c !== card);
        }
        displayPlayerHand('player1-hand', player1Hand);
        displayPlayerHand('player2-hand', player2Hand);
        document.getElementById('played-card').textContent = `Kartu yang Dimainkan: ${card}`;
        switchPlayer();
    } else {
        alert("Kartu tidak valid untuk dimainkan!");
    }
}

// Memeriksa apakah kartu yang dimainkan valid
function isValidPlay(card) {
    const [color, number] = card.split(' ');
    const [topColor, topNumber] = topCard ? topCard.split(' ') : [null, null];

    return color === topColor || number === topNumber || topCard === null; // Kartu dapat dimainkan jika warnanya atau angkanya sama dengan kartu teratas
}

// Mengganti giliran pemain
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player').textContent = `Giliran: Pemain ${currentPlayer}`;
}

// Event listener untuk tombol ambil kartu
document.getElementById('draw-card').addEventListener('click', drawCard);

// Inisialisasi game
createDeck();