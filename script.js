const vocabulary = [
    { eng: "Who is Mr. Park meeting at the airport?", viet: "Ông Park gặp ai ở sân bay?" },
    { eng: "Inside the terminal", viet: "Trong khu vực nhà ga" },
    { eng: "They called a taxi", viet: "Họ đã gọi một chiếc taxi" },
    { eng: "A new client", viet: "Một khách hàng mới" },
    { eng: "Which of these notebooks is yours?", viet: "Cuốn sổ tay nào trong số này là của bạn?" },
    { eng: "At the library", viet: "Ở thư viện" },
    { eng: "The black one’s mine", viet: "Chiếc màu đen là của tôi" },
    { eng: "Thanks, it is", viet: "Cảm ơn, đúng là nó rồi" },
    { eng: "Who’s been selected to lead the design team?", viet: "Ai đã được chọn để dẫn dắt đội thiết kế?" },
    { eng: "Sign here, please", viet: "Ký vào đây, xin vui lòng" },
    { eng: "Will he read it?", viet: "Anh ấy sẽ đọc nó chứ?" },
    { eng: "Ms. Lee was chosen", viet: "Cô Lee đã được chọn" },
    { eng: "Who’s retiring next month?", viet: "Ai sẽ nghỉ hưu vào tháng tới?" },
    { eng: "No, we’re not tired", viet: "Không, chúng tôi không mệt" },
    { eng: "Library Caroline is", viet: "Tới nghỉ! Caroline sẽ nghỉ hưu (tới dẫn máy trong hình)" },
    { eng: "It’s due in four weeks", viet: "Nó sẽ đến trong 4 tuần" },
    { eng: "Which paint color did you choose for the waiting room?", viet: "Bạn đã chọn màu sơn nào cho phòng chờ?" },
    { eng: "He didn’t see the memo", viet: "Anh ấy không thấy bản ghi nhớ" },
    { eng: "A shade of pale green", viet: "Một sắc thái xanh nhạt" },
    { eng: "I don’t mind waiting", viet: "Tôi không phiền chờ đợi" },
    { eng: "What was the article about?", viet: "Bài báo nói về gì?" },
    { eng: "I didn’t read it", viet: "Tôi không đọc nó" },
    { eng: "No, not recently", viet: "Không, không gần đây" },
    { eng: "That’s about it", viet: "Đại khái là vậy" },
    { eng: "Who was in your office this morning?", viet: "Ai đã ở trong văn phòng của bạn sáng nay?" },
    { eng: "In the other building", viet: "Trong tòa nhà khác" },
    { eng: "I’ll meet him tomorrow", viet: "Tôi sẽ gặp anh ấy vào ngày mai" },
    { eng: "My manager Mr. Lao", viet: "Quản lý của tôi, ông Lao" },
    { eng: "Who’s leading the orientation?", viet: "Ai đang dẫn dắt buổi định hướng?" },
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

function startGame(mode) {
    currentMode = mode;
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('fill-input').style.display = mode === 'fillBlank' ? 'block' : 'none';
    document.getElementById('options').style.display = mode === 'fillBlank' ? 'none' : 'block';
    document.getElementById('result').textContent = '';
    generateQuestion();
}

function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    currentQuestion = vocabulary[randomIndex];

    if (currentMode === 'engToViet') {
        document.getElementById('question').textContent = currentQuestion.eng;
        generateOptions('viet');
    } else if (currentMode === 'vietToEng') {
        document.getElementById('question').textContent = currentQuestion.viet;
        generateOptions('eng');
    } else if (currentMode === 'fillBlank') {
        const sentence = currentQuestion.eng.replace(currentQuestion.eng.split(' ')[2], '____');
        document.getElementById('question').textContent = sentence;
    }
}

function generateOptions(key) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    const correctAnswer = currentQuestion[key];
    const allAnswers = vocabulary.map(item => item[key]).filter(answer => answer !== correctAnswer);
    const shuffledAnswers = [correctAnswer];

    while (shuffledAnswers.length < 4) {
        const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
        if (!shuffledAnswers.includes(randomAnswer)) {
            shuffledAnswers.push(randomAnswer);
        }
    }

    shuffledAnswers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const result = document.getElementById('result');
    let correctAnswer;

    if (currentMode === 'engToViet') {
        correctAnswer = currentQuestion.viet;
        userAnswer = userAnswer || document.getElementById('fill-input').value;
    } else if (currentMode === 'vietToEng') {
        correctAnswer = currentQuestion.eng;
        userAnswer = userAnswer || document.getElementById('fill-input').value;
    } else if (currentMode === 'fillBlank') {
        correctAnswer = currentQuestion.eng.split(' ')[2];
        userAnswer = document.getElementById('fill-input').value;
    }

    if (userAnswer === correctAnswer) {
        result.textContent = 'Chính xác! 🎉';
        result.style.color = 'green';
    } else {
        result.textContent = `Sai rồi! Đáp án đúng là: ${correctAnswer}`;
        result.style.color = 'red';
    }

    setTimeout(generateQuestion, 2000);
}