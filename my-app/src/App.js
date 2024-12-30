import React, { useState, useEffect } from 'react';

const App = () => {
  const [month, setMonth] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const oceanBlue = {
    light: '#E3F2FD',
    medium: '#64B5F6',
    dark: '#1E88E5',
    darker: '#1565C0'
  };

  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni"
  ];

  const tasks = [
    // Januar
    [
      {
        title: "Die Kathedrale erkunden",
        question: "Finde die Statue des heiligen Jakobus in der Kathedrale. Welches Symbol hält er in seiner rechten Hand?",
        answer: "stab",
        hint: "Schau dir den Hauptaltar genau an...",
        location: "Kathedrale von Santiago de Compostela"
      },
      {
        title: "Praza do Obradoiro",
        question: "Wie viele Säulen hat der Haupteingang des Pazo de Raxoi?",
        answer: "8",
        hint: "Stell dich vor den Palast und zähle die Säulen am Eingang...",
        location: "Praza do Obradoiro"
      }
    ],
    // Weitere Monate folgen ...
  ];

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const checkAnswer = () => {
    const currentTask = tasks[month][taskIndex];
    if (!currentTask) return;

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentTask.answer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      const newCompletedTasks = [...completedTasks, `${month}-${taskIndex}`];
      setCompletedTasks(newCompletedTasks);
      
      setTimeout(() => {
        if (taskIndex < tasks[month].length - 1) {
          setTaskIndex(taskIndex + 1);
        }
        setUserAnswer('');
        setIsCorrect(false);
        setShowHint(false);
      }, 1500);
    }
  };

  const isTaskCompleted = (monthIndex, taskIdx) => {
    return completedTasks.includes(`${monthIndex}-${taskIdx}`);
  };

  const areAllTasksCompleted = () => {
    return tasks.every((monthTasks, monthIndex) => 
      monthTasks.every((_, taskIdx) => 
        isTaskCompleted(monthIndex, taskIdx)
      )
    );
  };

  const currentTask = tasks[month]?.[taskIndex];
  if (!currentTask) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: oceanBlue.darker
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          ❤️ Adrianes Santiago Abenteuer ❤️
        </h1>
        <p style={{ color: oceanBlue.dark }}>
          Deine persönliche Schnitzeljagd durch Santiago de Compostela
        </p>
      </div>

      {areAllTasksCompleted() ? (
        <div style={{
          padding: '2rem',
          backgroundColor: oceanBlue.light,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '48px' }}>🎁</span>
          <h2 style={{ color: oceanBlue.darker, marginTop: '1rem' }}>
            Herzlichen Glückwunsch, Adriane!
          </h2>
          <p style={{ marginTop: '1rem', color: oceanBlue.dark }}>
            Du hast alle Aufgaben gemeistert! Dein besonderes Geschenk wartet auf dich.
            [Hier kommt dein digitaler Brief/Gutschein]
          </p>
        </div>
      ) : (
        <>
          <div className="months-container" style={{
            display: 'flex', 
            gap: '10px', 
            marginBottom: '2rem',
            overflowX: 'auto',
            padding: '10px 0'
          }}>
            {months.map((monthName, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMonth(idx);
                  setTaskIndex(0);
                  setUserAnswer('');
                  setIsCorrect(false);
                  setShowHint(false);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: month === idx ? oceanBlue.dark : oceanBlue.light,
                  color: month === idx ? 'white' : oceanBlue.darker,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                {monthName}
              </button>
            ))}
          </div>

          <div style={{
            backgroundColor: oceanBlue.light,
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              color: oceanBlue.darker,
              marginBottom: '1rem'
            }}>
              {currentTask.title}
            </h3>
            
            <p style={{ marginBottom: '1rem' }}>
              {currentTask.question}
            </p>

            {showHint && (
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                gap: '10px',
                alignItems: 'start'
              }}>
                <span>💡</span>
                <p style={{ color: oceanBlue.darker }}>{currentTask.hint}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Deine Antwort..."
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${oceanBlue.medium}`,
                  outline: 'none'
                }}
              />
              <button
                onClick={checkAnswer}
                style={{
                  padding: '10px 20px',
                  backgroundColor: oceanBlue.dark,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Prüfen
              </button>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'transparent',
                border: `1px solid ${oceanBlue.medium}`,
                borderRadius: '8px',
                color: oceanBlue.dark,
                cursor: 'pointer'
              }}
            >
              {showHint ? 'Hinweis verbergen' : 'Hinweis anzeigen'}
            </button>

            {isCorrect && (
              <div style={{
                backgroundColor: '#E8F5E9',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                display: 'flex',
                gap: '10px',
                alignItems: 'start'
              }}>
                <span>✅</span>
                <div>
                  <p style={{ color: '#2E7D32', fontWeight: 'bold' }}>Richtig!</p>
                  <p style={{ color: '#2E7D32' }}>
                    Nächster Ort: {currentTask.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '10px',
            marginBottom: '2rem'
          }}>
            {tasks[month].map((_, idx) => (
              <div
                key={idx}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isTaskCompleted(month, idx) 
                    ? oceanBlue.dark 
                    : idx === taskIndex 
                    ? oceanBlue.medium 
                    : '#E0E0E0'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
