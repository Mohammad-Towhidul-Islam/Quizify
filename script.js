const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript"],
        correctAnswer: "CSS",
    },
    {
        question: "Which is not a programming language?",
        options: ["Python", "Java", "HTML"],
        correctAnswer: "HTML",
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<script>", "<link>"],
        correctAnswer: "<style>",
    },
    {
        question: "Which attribute is used to define the style of an HTML element?",
        options: ["style", "class", "id"],
        correctAnswer: "style",
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<br>", "<break>", "<lb>"],
        correctAnswer: "<br>",
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>"],
        correctAnswer: "<a>",
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "text-font"],
        correctAnswer: "font-size",
    },
    {
        question: "How do you select an element with the class name 'container' in CSS?",
        options: [".container", "#container", "container"],
        correctAnswer: ".container",
    },
    {
        question: "Which HTML element is used to display images?",
        options: ["<image>", "<img>", "<src>"],
        correctAnswer: "<img>",
    },
    {
        question: "How can you make a list that lists items in a numbered order in HTML?",
        options: ["<ul>", "<ol>", "<dl>"],
        correctAnswer: "<ol>",
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["background-color", "bg-color", "color-background"],
        correctAnswer: "background-color",
    },
    {
        question: "Which HTML tag is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>"],
        correctAnswer: "<title>",
    },
    {
        question: "How do you add a comment in HTML?",
        options: ["<!-- Comment -->", "// Comment", "/* Comment */"],
        correctAnswer: "<!-- Comment -->",
    },
    {
        question: "Which element is used to define important text in HTML?",
        options: ["<strong>", "<b>", "<em>"],
        correctAnswer: "<strong>",
    },
    {
        question: "Which HTML element is used for displaying text as bold?",
        options: ["<b>", "<strong>", "<i>"],
        correctAnswer: "<b>",
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    // Shuffle the questions before starting the quiz
    shuffleQuestions();

    document.querySelector('.home-page').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    showQuestion(currentQuestionIndex);
}

// Shuffle the questions array using Fisher-Yates (Knuth) shuffle algorithm
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements
    }
}

function showQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    const progressFill = document.getElementById('progress-fill');
    
    questionContainer.innerHTML = ""; 
    const questionData = questions[index];
    
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.textContent = questionData.question;
    
    questionContainer.appendChild(questionElement);

    questionData.options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.className = "question-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;

        const label = document.createElement("label");
        label.textContent = option;

        optionElement.appendChild(input);
        optionElement.appendChild(label);
        questionContainer.appendChild(optionElement);
    });

    // Update Progress Bar
    progressFill.style.width = ((index + 1) / questions.length) * 100 + "%";
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
        alert("✔ Correct!");
        score++;
    } else {
        alert(`❌ Incorrect! The correct answer was: ${correctAnswer}.`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        document.getElementById('question-container').innerHTML = `
            <h2>Quiz Over!</h2>
            <p>Your score: ${score} out of ${questions.length}</p>
        `;
        document.getElementById("submit-button").style.display = "none";
    }
}
