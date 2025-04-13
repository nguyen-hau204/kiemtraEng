const vocabulary = [
    { eng: "Who is Mr. Park meeting at the airport?", viet: "Ông Park gặp ai ở sân bay?" },
    { eng: "Inside the terminal", viet: "Trong khu vực nhà ga" },
    { eng: "They called a taxi", viet: "Họ đã gọi một chiếc taxi" },
    { eng: "A new client", viet: "Một khách hàng mới" },
    { eng: "Which of these notebooks is yours?", viet: "Cuốn sổ tay nào trong số này là của bạn?" },
    { eng: "At the library", viet: "Ở thư viện" },
    { eng: "The black one's mine", viet: "Chiếc màu đen là của tôi" },
    { eng: "Thanks, it is", viet: "Cảm ơn, đúng là nó rồi" },
    { eng: "Who's been selected to lead the design team?", viet: "Ai đã được chọn để dẫn dắt đội thiết kế?" },
    { eng: "Sign here, please", viet: "Ký vào đây, xin vui lòng" },
    { eng: "Will he read it?", viet: "Anh ấy sẽ đọc nó chứ?" },
    { eng: "Ms. Lee was chosen", viet: "Cô Lee đã được chọn" },
    { eng: "Who's retiring next month?", viet: "Ai sẽ nghỉ hưu vào tháng tới?" },
    { eng: "No, we're not tired", viet: "Không, chúng tôi không mệt" },
    { eng: "Library Caroline is", viet: "Tới nghỉ! Caroline sẽ nghỉ hưu (tới dẫn máy trong hình)" },
    { eng: "It's due in four weeks", viet: "Nó sẽ đến trong 4 tuần" },
    { eng: "Which paint color did you choose for the waiting room?", viet: "Bạn đã chọn màu sơn nào cho phòng chờ?" },
    { eng: "He didn't see the memo", viet: "Anh ấy không thấy bản ghi nhớ" },
    { eng: "A shade of pale green", viet: "Một sắc thái xanh nhạt" },
    { eng: "I don't mind waiting", viet: "Tôi không phiền chờ đợi" },
    { eng: "What was the article about?", viet: "Bài báo nói về gì?" },
    { eng: "I didn't read it", viet: "Tôi không đọc nó" },
    { eng: "No, not recently", viet: "Không, không gần đây" },
    { eng: "That's about it", viet: "Đại khái là vậy" },
    { eng: "Who was in your office this morning?", viet: "Ai đã ở trong văn phòng của bạn sáng nay?" },
    { eng: "In the other building", viet: "Trong tòa nhà khác" },
    { eng: "I'll meet him tomorrow", viet: "Tôi sẽ gặp anh ấy vào ngày mai" },
    { eng: "My manager Mr. Lao", viet: "Quản lý của tôi, ông Lao" },
    { eng: "Who's leading the orientation?", viet: "Ai đang dẫn dắt buổi định hướng?" },
    { eng: "He read it recently", viet: "Anh ấy đã đọc nó gần đây" },
    { eng: "The human resource team", viet: "Đội nhân sự" },
    { eng: "Some training manuals", viet: "Một số tài liệu đào tạo" },
    { eng: "What should I bring to the trade show?", viet: "Tôi nên mang gì đến hội chợ thương mại?" },
    { eng: "Your business cards", viet: "Thẻ kinh doanh của bạn" },
    { eng: "At the conference center", viet: "Tại trung tâm hội nghị" },
    { eng: "Sorry, I have it", viet: "Xin lỗi, tôi có rồi" },
    { eng: "What kind of company does Mr. Perez manage?", viet: "Ông Perez quản lý loại công ty nào?" },
    { eng: "For twenty years", viet: "Trong hai mươi năm" },
    { eng: "I can manage that", viet: "Tôi có thể quản lý được việc đó" },
    { eng: "An advertising agency", viet: "Một công ty quảng cáo" }
];

let currentQuestion = {};
let currentMode = '';
let score = 0;
let selectedAnswer = null;
let usedQuestions = [];
let questionCount = 0;
const MAX_QUESTIONS = 10;

function startGame(mode) {
    currentMode = mode;
    score = 0;
    questionCount = 0;
    usedQuestions = [];
    document.getElementById('score').textContent = score;
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('fill-input').style.display = mode === 'fillBlank' ? 'block' : 'none';
    document.getElementById('options').style.display = mode === 'fillBlank' ? 'none' : 'block';
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = '';
    document.getElementById('restart-button').style.display = 'none';
    generateQuestion();
}

function generateQuestion() {
    // Nếu đã hoàn thành tất cả câu hỏi
    if (questionCount >= MAX_QUESTIONS) {
        gameOver();
        return;
    }
    
    // Tạo mảng các câu hỏi chưa sử dụng
    const availableQuestions = vocabulary.filter(q => !usedQuestions.includes(q));
    
    // Nếu đã hết câu hỏi, reset lại mảng câu hỏi đã dùng
    if (availableQuestions.length === 0) {
        usedQuestions = [];
        generateQuestion();
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    usedQuestions.push(currentQuestion);
    questionCount++;

    document.getElementById('fill-input').value = ''; // Reset input field

    if (currentMode === 'engToViet') {
        document.getElementById('question').textContent = currentQuestion.eng;
        generateOptions('viet');
    } else if (currentMode === 'vietToEng') {
        document.getElementById('question').textContent = currentQuestion.viet;
        generateOptions('eng');
    } else if (currentMode === 'fillBlank') {
        const words = currentQuestion.eng.split(' ');
        // Chọn một từ ngẫu nhiên để ẩn (không phải từ đầu hoặc cuối)
        const randomWordIndex = Math.floor(Math.random() * (words.length - 2)) + 1;
        const hiddenWord = words[randomWordIndex];
        words[randomWordIndex] = '_____';
        document.getElementById('question').textContent = words.join(' ');
        // Lưu từ bị ẩn để kiểm tra sau này
        currentQuestion.hiddenWord = hiddenWord;
    }
}

function generateOptions(key) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    selectedAnswer = null;

    const correctAnswer = currentQuestion[key];
    
    // Lấy các đáp án sai từ từ vựng, loại bỏ đáp án đúng
    const allAnswers = vocabulary.map(item => item[key]).filter(answer => answer !== correctAnswer);
    const shuffledAnswers = [correctAnswer];

    // Chọn 3 đáp án sai ngẫu nhiên, đảm bảo không trùng lặp
    while (shuffledAnswers.length < 4) {
        const randomIndex = Math.floor(Math.random() * allAnswers.length);
        const randomAnswer = allAnswers[randomIndex];
        if (!shuffledAnswers.includes(randomAnswer)) {
            shuffledAnswers.push(randomAnswer);
        }
    }

    // Xáo trộn các đáp án
    shuffledAnswers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => selectAnswer(button, answer);
        optionsDiv.appendChild(button);
    });
}

function selectAnswer(button, answer) {
    // Bỏ chọn đáp án trước đó
    const allButtons = document.querySelectorAll('#options button');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Đánh dấu đáp án được chọn
    button.classList.add('selected');
    selectedAnswer = answer;
}

function checkAnswer() {
    const result = document.getElementById('result');
    let correctAnswer, userAnswer;

    if (currentMode === 'engToViet') {
        correctAnswer = currentQuestion.viet;
        userAnswer = selectedAnswer;
    } else if (currentMode === 'vietToEng') {
        correctAnswer = currentQuestion.eng;
        userAnswer = selectedAnswer;
    } else if (currentMode === 'fillBlank') {
        correctAnswer = currentQuestion.hiddenWord;
        userAnswer = document.getElementById('fill-input').value.trim();
    }

    if (!userAnswer) {
        result.textContent = 'Vui lòng chọn hoặc nhập đáp án!';
        result.className = 'wrong';
        return;
    }

    // Kiểm tra đáp án (trường hợp fill blank không phân biệt hoa thường)
    const isCorrect = currentMode === 'fillBlank' 
        ? userAnswer.toLowerCase() === correctAnswer.toLowerCase()
        : userAnswer === correctAnswer;

    if (isCorrect) {
        result.textContent = 'Chính xác! 🎉';
        result.className = 'correct';
        score += 10;
        document.getElementById('score').textContent = score;
    } else {
        result.textContent = `Sai rồi! Đáp án đúng là: ${correctAnswer}`;
        result.className = 'wrong';
    }

    // Tự động chuyển câu hỏi sau 2.5 giây
    setTimeout(() => {
        result.textContent = '';
        result.className = '';
        generateQuestion();
    }, 2500);
}

function gameOver() {
    document.getElementById('question').textContent = `Kết thúc! Điểm của bạn: ${score}/${MAX_QUESTIONS * 10}`;
    document.getElementById('options').style.display = 'none';
    document.getElementById('fill-input').style.display = 'none';
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
}

function resetGame() {
    document.getElementById('check-button').style.display = 'block';
    document.getElementById('restart-button').style.display = 'none';
    startGame(currentMode);
}