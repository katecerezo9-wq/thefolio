import React, { useState } from 'react';

const About = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const quizData = [
    {
      question: "What is the maximum number of active items a hero can have in Mobile Legends?",
      options: ["4", "5", "6", "7"],
      answer: 2,
      difficulty: "easy",
      explanation: "Each hero can have up to 6 active items in their inventory."
    },
    {
      question: "Which MLBB hero is known as 'The Lady of Clockwork'?",
      options: ["Odette", "Lunox", "Nana", "Angela"],
      answer: 3,
      difficulty: "medium",
      explanation: "Angela is known as 'The Lady of Clockwork' due to her time-manipulating abilities."
    },
    {
      question: "In esports strategy, what does 'draft' typically refer to?",
      options: ["Player selection process", "Hero banning/picking phase", "Prize money distribution", "Tournament schedule"],
      answer: 1,
      difficulty: "easy",
      explanation: "Draft refers to the hero banning and picking phase before a match."
    },
    {
      question: "Which MLCC team won the M3 World Championship?",
      options: ["Blacklist International", "Evos Legends", "RRQ Hoshi", "ONIC Esports"],
      answer: 0,
      difficulty: "hard",
      explanation: "Blacklist International won the M3 World Championship in 2021."
    },
    {
      question: "What does 'GG' stand for in gaming culture?",
      options: ["Great Game", "Good Gaming", "Good Game", "Go Goal"],
      answer: 2,
      difficulty: "easy",
      explanation: "GG stands for 'Good Game', used to show sportsmanship."
    },
    {
      question: "Which item provides 'True Damage' that ignores all defenses?",
      options: ["Blade of Despair", "Endless Battle", "Malefic Roar", "Sea Halberd"],
      answer: 1,
      difficulty: "medium",
      explanation: "Endless Battle provides true damage after using a skill."
    },
    {
      question: "What is the term for when a player single-handedly defeats multiple enemies?",
      options: ["Teamwipe", "Savage", "Maniac", "Godlike"],
      answer: 1,
      difficulty: "easy",
      explanation: "A 'Savage' is achieved when a player defeats 5 enemies consecutively."
    },
    {
      question: "Which jungle monster provides the 'Lightning Retribution' buff?",
      options: ["Turtle", "Lord", "Red Buff", "Blue Buff"],
      answer: 0,
      difficulty: "medium",
      explanation: "The Turtle provides Lightning Retribution when killed."
    },
    {
      question: "In esports, what does 'ADC' stand for?",
      options: ["Attack Damage Carry", "Advanced Damage Character", "Assault Damage Controller", "Area Damage Champion"],
      answer: 0,
      difficulty: "easy",
      explanation: "ADC stands for Attack Damage Carry, typically a marksman hero."
    },
    {
      question: "Which hero has the skill 'Cyclone Sweep' that makes them immune to CC?",
      options: ["Chou", "Benedetta", "Wanwan", "Roger"],
      answer: 1,
      difficulty: "hard",
      explanation: "Benedetta's 'Cyclone Sweep' makes her immune to crowd control effects."
    },
    {
      question: "What is the maximum number of spells a hero can have?",
      options: ["3", "4", "5", "6"],
      answer: 1,
      difficulty: "easy",
      explanation: "Each hero has 4 skills: 3 basic skills and 1 ultimate."
    },
    {
      question: "Which country has won the most M-series World Championships?",
      options: ["Philippines", "Indonesia", "Malaysia", "Singapore"],
      answer: 0,
      difficulty: "medium",
      explanation: "The Philippines has won the most M-series championships (M2 and M3)."
    },
    {
      question: "What does 'CS' stand for in MOBA terminology?",
      options: ["Character Score", "Creep Score", "Combat Stats", "Critical Strike"],
      answer: 1,
      difficulty: "medium",
      explanation: "CS stands for Creep Score, counting minions/jungle monsters killed."
    },
    {
      question: "Which hero can transform between human and wolf forms?",
      options: ["Roger", "Alpha", "Barats", "Thamuz"],
      answer: 0,
      difficulty: "easy",
      explanation: "Roger transforms between human and wolf forms with his ultimate."
    },
    {
      question: "What is the term for unexpectedly winning a team fight when at a disadvantage?",
      options: ["Backdoor", "Stolen", "Clutch", "Comeback"],
      answer: 2,
      difficulty: "easy",
      explanation: "A 'Clutch' play is when you win despite being at a disadvantage."
    }
  ];

  const getPointsForDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 10;
    }
  };

  const selectOption = (index) => {
    if (showResult || quizCompleted) return;
    setSelectedOptionIndex(index);
  };

  const submitAnswer = () => {
    if (selectedOptionIndex === null || quizCompleted) return;
    
    const correct = selectedOptionIndex === quizData[currentQuestionIndex].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + getPointsForDifficulty(quizData[currentQuestionIndex].difficulty));
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
    } else {
      setCurrentStreak(0);
    }
    
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setShowResult(false);
      setIsCorrect(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setQuizCompleted(false);
    setShowResult(false);
    setIsCorrect(null);
  };

  const currentData = quizData[currentQuestionIndex];
  const percentage = (score / (quizData.length * 20)) * 100;

  return (
    <>
      <section className="about-hero animate-up">
        <h1>My Journey</h1>
        <p>Student. Athlete. Content Creator.</p>
      </section>

      <section className="content-section">
        <div className="text-content animate-up">
          <h2>How It All Started</h2>
          <p>
            My love for gaming isn't new—it deeply connects to my childhood. Growing up in the Philippines surrounded by male cousins, I was always inclined to play "boy games" rather than playing with dolls. The competitive spirit was always there, waiting to be unleashed.
          </p>
          <p>
            However, my journey into <strong>Mobile Legends: Bang Bang</strong> officially began during the Pandemic. Stuck at home, my cousins introduced me to the game. What started as just a way to bond with them quickly turned into a passion. I realized I wasn't just playing for fun—I wanted to win, and I had the skills to do it.
          </p>
        </div>
        <div className="image-content animate-up">
          <img src="assets/profile.jpg" alt="Kate Ann Cerezo" />
          <p className="caption">It started as a hobby during the lockdown.</p>
        </div>
      </section>

      <section className="content-section gray-bg animate-up">
        <div className="image-content">
          <img src="assets/276b6d1d-0656-43dd-abdb-20fc09f0dc7f.jpg" alt="DMMMSU-SLUC Champion Team" />
          <p className="caption">Campus Sports Olympics Champions</p>
        </div>
        <div className="text-content">
          <h2>Representing DMMMSU-SLUC</h2>
          <p>
            I started my journey as a student-athlete during my first year in college. Now that I am a 3rd-year student, representing <strong>Don Mariano Marcos Memorial State University (SLUC)</strong> continues to be an absolute honor.
          </p>
          <p>
            Throughout these years, we fought hard and emerged as <strong>Champions</strong> in the Campus Sports Olympics and secured <strong>Gold Medals</strong> at the University Olympics. Currently, we are training hard to represent the school in the upcoming SCUAA.
          </p>
        </div>
      </section>

      <section className="content-section animate-up">
        <div className="text-content">
          <h2>Competing Outside Campus</h2>
          <p>
            Aside from school competitions, I also wanted to test my skills against other strong amateur teams. That is when I joined the <strong>Smart League</strong> (All-Women's Tournament).
          </p>
          <p>
            It was a tougher battlefield, but our team managed to secure <strong>2nd Place</strong> and took home a prize pool of 15,000 pesos. This experience proved to me that I could compete with the best in the region.
          </p>
        </div>
        <div className="image-content">
          <img src="assets/e6b51848-8905-454f-899b-c4c10dfa8468.jpg" alt="Smart League Team" />
          <p className="caption">Taking on the Smart League (2nd Place)</p>
        </div>
      </section>

      <section className="timeline-section gray-bg">
        <blockquote className="animate-up">
          "As a girl with an interest in gaming, balance is key. I have a dream to graduate and find a good job, so I make sure I never neglect my academics while pursuing my esports passion."
        </blockquote>

        <h2 className="animate-up" style={{marginTop: '50px'}}>My Milestones</h2>
        
        <ol className="timeline-list animate-up">
          <li><strong>2020 (Pandemic):</strong> Started playing MLBB with cousins.</li>
          <li><strong>1st Year College:</strong> Started journey as a Student-Athlete.</li>
          <li><strong>Oct 2025:</strong> Champion at Campus Sports Olympics.</li>
          <li><strong>Nov 2025:</strong> Gold Medalist at University Olympics.</li>
          <li><strong>Dec 2024:</strong> 2nd Place at Smart League (Women's).</li>
          <li><strong>Present (3rd Year):</strong> Preparing for SCUAA.</li>
        </ol>
      </section>

      <section className="content-section">
        <div className="image-content animate-up">
          <img src="assets/0c324b7b-82ee-4d24-a326-f739beeadd12.jpg" alt="Kate Ann with friends" />
          <p className="caption">My support system outside the arena</p>
        </div>
        <div className="text-content animate-up">
          <h2>Beyond the Screen</h2>
          <p>
            Even though I spend a lot of time grinding in the Land of Dawn, I make sure to have a life outside of esports. These are the people who support my journey, win or lose.
          </p>
          <p>
            I am also active on TikTok as a content creator. Recently, one of my witty videos went viral with over 400,000 views!
          </p>
          <a href="https://vt.tiktok.com/ZSadYJM2k/" target="_blank" rel="noopener noreferrer">
            <button className="action-btn">Watch Video</button>
          </a>
        </div>
      </section>

      {/* QUIZ GAME SECTION */}
      <section className="quiz-section animate-up">
        <h2 className="quiz-title">Esports & MLBB Challenge</h2>
        <p className="quiz-progress" id="quizProgress">
          {quizCompleted ? 'Challenge Completed!' : `Question ${currentQuestionIndex + 1} of ${quizData.length}`}
        </p>
        <div className="quiz-score-display" id="scoreDisplay">
          Score: {score} | Streak: {currentStreak}
        </div>
        
        <div className="quiz-container">
          {!quizCompleted ? (
            <>
              <h3 className="quiz-question" id="quizQuestion">
                <span id="questionText">{currentData.question}</span>
                <span className={`difficulty-badge difficulty-${currentData.difficulty}`}>
                  {currentData.difficulty.toUpperCase()}
                </span>
              </h3>
              
              <div className="quiz-options" id="quizOptions">
                {currentData.options.map((option, index) => (
                  <div
                    key={index}
                    className={`quiz-option ${selectedOptionIndex === index ? 'selected' : ''} ${showResult && index === currentData.answer ? 'correct-answer' : ''} ${showResult && selectedOptionIndex === index && selectedOptionIndex !== currentData.answer ? 'wrong-answer' : ''}`}
                    onClick={() => selectOption(index)}
                    style={showResult ? { pointerEvents: 'none' } : {}}
                  >
                    <span style={{marginRight: '10px', fontWeight: 'bold'}}>{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              
              <div className="quiz-buttons">
                {!showResult ? (
                  <button className="quiz-button" onClick={submitAnswer} disabled={selectedOptionIndex === null}>
                    Submit Answer
                  </button>
                ) : (
                  <button className="quiz-button" onClick={nextQuestion}>
                    {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
              
              {showResult && (
                <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`} id="quizResult">
                  {isCorrect ? (
                    <>
                      <div style={{fontSize: '1.2em'}}>✅ Correct! +{getPointsForDifficulty(currentData.difficulty)} points</div>
                      <div style={{marginTop: '8px', fontSize: '0.9em'}}>{currentData.explanation}</div>
                      <div style={{marginTop: '5px', color: '#27ae60'}}>Current Streak: {currentStreak} 🔥</div>
                    </>
                  ) : (
                    <>
                      <div style={{fontSize: '1.2em'}}>❌ Incorrect!</div>
                      <div style={{marginTop: '8px', fontSize: '0.9em'}}>{currentData.explanation}</div>
                      <div style={{marginTop: '8px', fontWeight: 'normal'}}>
                        Correct answer: <strong>{currentData.options[currentData.answer]}</strong>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="quiz-final" id="quizFinal">
                <div style={{fontSize: '1.5em', marginBottom: '15px'}}>Final Score: <strong>{score} points</strong></div>
                <div style={{marginBottom: '10px'}}>Your Rank: <strong style={{color: '#f1c40f'}}>
                  {percentage >= 90 ? 'Mythical Glory' :
                   percentage >= 75 ? 'Mythic' :
                   percentage >= 60 ? 'Legend' :
                   percentage >= 40 ? 'Epic' : 'Warrior'}
                </strong></div>
                <div style={{marginBottom: '10px'}}>Maximum Streak: <strong>{maxStreak} 🔥</strong></div>
                <div style={{marginBottom: '15px'}}>Accuracy: <strong>{Math.round(percentage)}%</strong></div>
                <div><em>
                  {percentage >= 90 ? '🏆 Legendary! You\'re an esports encyclopedia!' :
                   percentage >= 75 ? '🎯 Epic Performance! Solid gaming knowledge!' :
                   percentage >= 60 ? '👍 Great Job! You\'re on your way to becoming a pro!' :
                   percentage >= 40 ? '😊 Good Effort! Keep practicing and watching tournaments!' :
                   '📚 Nice Try! Time to grind more MLBB matches!'}
                </em></div>
              </div>
              <div className="quiz-restart">
                <button className="quiz-button" onClick={restartQuiz}>Play Again</button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default About;