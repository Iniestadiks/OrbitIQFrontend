import React, { useState } from 'react';
import './Quiz.css';
function Quiz() {
    // Définir les questions et les réponses
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: 'Quelle est la plus grande planète du système solaire ?',
            options: ['Jupiter', 'Saturne', 'Uranus', 'Neptune'],
            correctAnswer: 'Jupiter',
            selectedOption: null,
            answered: false
        },
        {
            id: 2,
            question: 'Combien de temps faut-il à la Terre pour orbiter autour du Soleil ?',
            options: ['365.25 jours', '88 jours terrestres', '24 heures', '687 jours terrestres'],
            correctAnswer: '365.25 jours',
            selectedOption: null,
            answered: false
        },
        {
            id: 3,
            question: 'Quelle planète est souvent appelée la "planète rouge" en raison de sa couleur ?',
            options: ['Jupiter', 'Mars', 'Vénus', 'Saturne'],
            correctAnswer: 'Mars',
            selectedOption: null,
            answered: false
        },
        {
            id: 4,
            question: 'Quelle planète est la plus proche du Soleil ?',
            options: ['Vénus', 'Mars', 'Mercure', 'Terre'],
            correctAnswer: 'Mercure',
            selectedOption: null,
            answered: false
        },
        {
            id: 5,
            question: 'Quelle planète est connue pour ses anneaux distinctifs ?',
            options: ['Jupiter', 'Saturne', 'Neptune', 'Uranus'],
            correctAnswer: 'Saturne',
            selectedOption: null,
            answered: false
        },
        {
            id: 6,
            question: 'Quelle planète est la plus massive du système solaire ?',
            options: ['Jupiter', 'Uranus', 'Neptune', 'Terre'],
            correctAnswer: 'Jupiter',
            selectedOption: null,
            answered: false
        },
        {
            id: 7,
            question: 'Quelle planète est la plus éloignée du Soleil ?',
            options: ['Neptune', 'Uranus', 'Saturne', 'Mars'],
            correctAnswer: 'Neptune',
            selectedOption: null,
            answered: false
        },
        {
            id: 8,
            question: 'Quelle planète est souvent appelée "la sœur de la Terre" en raison de leurs tailles similaires ?',
            options: ['Vénus', 'Mars', 'Uranus', 'Mercure'],
            correctAnswer: 'Vénus',
            selectedOption: null,
            answered: false
        },
        // Ajoutez d'autres questions ici
]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = (selectedOption) => {
        // Mise à jour de la réponse utilisateur
        const newAnswers = [...userAnswers, { questionId: questions[currentQuestion].id, selectedOption, isCorrect: selectedOption === questions[currentQuestion].correctAnswer }];
        setUserAnswers(newAnswers);

        // Mise à jour de l'option sélectionnée pour la question actuelle
        const newQuestions = questions.map((q, index) => {
            if (index === currentQuestion) {
                return { ...q, selectedOption };
            }
            return q;
        });
        setQuestions(newQuestions);
    };

    const calculateScore = () => {
        const correctAnswersCount = userAnswers.filter(answer => answer.isCorrect).length;
        return Math.round((correctAnswersCount / questions.length) * 100);
    };

    const showFinalScore = () => {
        setShowScore(true);
    };

    const returnToFirstQuestion = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowScore(false);
        setQuestions(questions.map(q => ({ ...q, selectedOption: '' })));
    };

    const goToPreviousQuestion = () => {
        setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : 0);
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="quiz-score">
                    <h2>Votre score final est de {calculateScore()}%</h2>
                    <button onClick={returnToFirstQuestion} className="quiz-button">Recommencer le quiz</button>
                </div>
            ) : (
                <div className="quiz-question">
                    <h2>Question {currentQuestion + 1}</h2>
                    <h3>{questions[currentQuestion].question}</h3>
                    <ul className="quiz-options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className={`quiz-button ${option === questions[currentQuestion].selectedOption ? 'selected' : ''}`}
                                    onClick={() => handleAnswerClick(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="quiz-navigation">
                        {currentQuestion > 0 && (
                            <button onClick={goToPreviousQuestion} className="quiz-button">Question précédente</button>
                        )}
                        {currentQuestion < questions.length - 1 ? (
                            <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="quiz-button">Question suivante</button>
                        ) : (
                            <button onClick={showFinalScore} className="quiz-button">Voir le score</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;