import React, { useState } from 'react';

function Quiz() {
    // Définir les questions et les réponses
    const questions = [
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
    ];

    // Initialiser l'état pour suivre la question actuelle et les réponses de l'utilisateur
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);

    // Gérer la sélection de réponse par l'utilisateur
    const handleAnswerClick = (selectedOption) => {
        const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
        setUserAnswers([...userAnswers, { questionId: questions[currentQuestion].id, selectedOption, isCorrect }]);
        // Mettre à jour l'option sélectionnée et marquer la question comme répondue
        questions[currentQuestion].selectedOption = selectedOption;
        questions[currentQuestion].answered = true;
    };

    // Calculer le score total de l'utilisateur
    const calculateScore = () => {
        const correctAnswersCount = userAnswers.filter(answer => answer.isCorrect).length;
        return Math.round((correctAnswersCount / questions.length) * 100);
    };

    // Afficher le score final
    const showFinalScore = () => {
        setShowScore(true);
    };

    // Retourner à la première question
    const returnToFirstQuestion = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowScore(false);
        // Réinitialiser les options sélectionnées et les questions répondus
        questions.forEach(question => {
            question.selectedOption = null;
            question.answered = false;
        });
    };

    // Aller à la question précédente
    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div>
            {showScore ? (
                <div>
                    <h2>Votre score final est de {calculateScore()}%</h2>
                    <p>Merci d'avoir participé au quiz !</p>
                    <button onClick={returnToFirstQuestion}  style={{ margin: '5px', width: '200px', padding: '10px' }}>Recommencer le quiz</button>
                </div>
            ) : (
                <div>
                    <h2>Question {currentQuestion + 1}</h2>
                    <h3>{questions[currentQuestion].question}</h3>
                    <ul>
                        {questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className={option === questions[currentQuestion].selectedOption ? 'selected' : ''}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={questions[currentQuestion].answered}
                                    style={{ margin: '5px', width: '200px', padding: '10px' }}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {currentQuestion > 0 && (
                        <button onClick={goToPreviousQuestion}  style={{ margin: '5px', width: '200px', padding: '10px' }}>Question précédente</button>
                    )}
                    {currentQuestion < questions.length - 1 ? (
                        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}  style={{ margin: '5px', width: '200px', padding: '10px' }}>Question suivante</button>
                    ) : (
                        <button onClick={showFinalScore}  style={{ margin: '5px', width: '200px', padding: '10px' }}>Voir le score</button>
                    )}
                </div>
            )}
            <style>
                {`
                    button.selected {
                        background-color: blue;
                        color: black;
                    }
                `}
            </style>
        </div>
    );
}

export default Quiz;
