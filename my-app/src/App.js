import React, { useState, useEffect } from 'react';

const App = () => {
  const [month, setMonth] = useState(0); // Zeigt nur den Januar an
  const [taskIndex, setTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [viewHistory, setViewHistory] = useState(false); // Zustand für Historie anzeigen
  const [attemptsLeft, setAttemptsLeft] = useState(7); // Zustand für die Versuche

  const oceanBlue = {
    light: '#E3F2FD',
    medium: '#64B5F6',
    dark: '#1E88E5',
    darker: '#1565C0'
  };

  const months = [
    "Januar", // Zeigt nur den Januar an
    // Weitere Monate folgen später
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
    // Weitere Monate folgen später...
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
        setAttemptsLeft(7); // Setze die Versuche zurück, wenn die Antwort korrekt war
      }, 1500);
    } else {
      // Wenn die Antwort falsch ist, verringere die Anzahl der Versuche
      setAttemptsLeft((prev) => Math.max(prev - 1, 0));
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
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))', // Farbverlauf von oben nach unten
      fontFamily: "'Roboto', sans-serif",
      backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ef/Santiago_de_Compostela_2016.jpg")', // Bild von Santiago de Compostela
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Bild bleibt beim Scrollen fixiert
      minHeight: '100vh',
      color: 'white' // Schriftfarbe auf weiß setzen, um den Kontrast zu erhöhen
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: oceanBlue.darker
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          fontWeight: '600',
          letterSpacing: '1px',
          whiteSpace: 'normal', // Damit der Text umgebrochen wird, falls nötig
          wordBreak: 'break-word' // Um lange Wörter zu brechen
        }}>
          Adi's Santiago Jagd💙
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: oceanBlue.dark,
          fontWeight: '400',
          marginBottom: '1rem'
        }}>
          Deine Reise durch Santiago de Compostela
        </p>
      </div>

      <div style={{
        textAlign: 'right',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px'
      }}>
        <button
          onClick={() => setRulesAccepted(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: oceanBlue.medium,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: '600',
          }}
        >
          📖 Regeln
        </button>
      </div>

      {rulesAccepted && (
        <div style={{
          backgroundColor: oceanBlue.light,
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          color: oceanBlue.darker,
          textAlign: 'center',
        }}>
          <h3 style={{
            color: oceanBlue.darker,
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Regeln:
          </h3>
          <p>
            1. Schicke Domi ein Beweisfoto in Form eines Selfies per WhatsApp!<br />
            2. Internetrecherche ist strengstens untersagt!<br />
            3. Hilfsmittel oder Hilfe von Dritten ist nicht gestattet!<br />
            4. Du kannst deine Historie einsehen, sobald du alle Aufgaben abgeschlossen hast.
          </p>
          <button
            onClick={() => setRulesAccepted(false)}
            style={{
              padding: '12px 24px',
              backgroundColor: oceanBlue.dark,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              fontWeight: '600',
              marginTop: '1rem'
            }}
          >
            Schließen
          </button>
        </div>
      )}

      {areAllTasksCompleted() ? (
        <div style={{
          padding: '2rem',
          backgroundColor: oceanBlue.light,
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '48px', color: oceanBlue.dark }}>🎉</span>
          <h2 style={{
            color: oceanBlue.darker,
            fontSize: '2rem',
            marginTop: '1rem',
            fontWeight: '700'
          }}>
            Herzlichen Glückwunsch, Schneckchen!
          </h2>
          <p style={{
            color: oceanBlue.dark,
            marginTop: '1rem',
            fontSize: '1.1rem'
          }}>
            Du hast alle Aufgaben abgeschlossen! Die nächsten Monate sind in Arbeit und werden am 01. des nächsten Monats online gestellt.
            <br />
            Du kannst deine Historie einsehen, um die Fragen und Antworten der vergangenen Monate zu überprüfen.
          </p>

          <button
            onClick={() => setViewHistory(!viewHistory)}
            style={{
              padding: '10px 20px',
              backgroundColor: oceanBlue.dark,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px',
              fontSize: '1.1rem',
              letterSpacing: '1px'
            }}
          >
            {viewHistory ? 'Historie verbergen' : 'Historie anzeigen'}
          </button>

          {viewHistory && (
            <div style={{
              marginTop: '1rem',
              fontSize: '1.1rem',
              textAlign: 'left'
            }}>
              <h3>Historie der Antworten</h3>
              {completedTasks.length > 0 ? (
                completedTasks.map((taskId, idx) => {
                  const [m, t] = taskId.split('-');
                  const task = tasks[m][t];
                  return (
                    <div key={idx} style={{
                      marginBottom: '10px',
                      padding: '1rem',
                      backgroundColor: '#F4F8FB',
                      borderRadius: '8px'
                    }}>
                      <strong>{task.title}:</strong>
                      <p><strong>Frage:</strong> {task.question}</p>
                      <p><strong>Antwort:</strong> {task.answer}</p>
                      <p><strong>Standort:</strong> {task.location}</p>
                    </div>
                  );
                })
              ) : (
                <p>Noch keine Aufgaben abgeschlossen.</p>
              )}
            </div>
          )}

          {/* Liebesbrief */}
          <div style={{
            padding: '2rem',
            marginTop: '2rem',
            backgroundColor: '#FFEBEE',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            color: '#D32F2F',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#D32F2F'
            }}>
              💌 Liebesbrief an Adi 💌
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#C2185B',
              fontWeight: '400'
            }}>
              Du hast nun ein paar wunderbare Orte in Santiago de Compostela erkundet! Deine Jagd ist nicht nur ein Abenteuer, sondern auch ein Liebesbeweis an mich:
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="months-container" style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '2rem',
            overflowX: 'auto',
            padding: '10px 0',
            justifyContent: 'center'
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
                  padding: '12px 25px',
                  backgroundColor: month === idx ? oceanBlue.dark : oceanBlue.light,
                  color: month === idx ? 'white' : oceanBlue.darker,
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  minWidth: '150px',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {monthName}
              </button>
            ))}
          </div>

          <div style={{
            backgroundColor: oceanBlue.light,
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: oceanBlue.darker,
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              {currentTask.title}
            </h3>

            <p style={{
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              color: oceanBlue.dark
            }}>
              {currentTask.question}
            </p>

            {showHint && (
              <div style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                color: oceanBlue.darker
              }}>
                <span>💡</span>
                <p>{currentTask.hint}</p>
              </div>
            )}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Deine Antwort..."
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${oceanBlue.medium}`,
                  outline: 'none',
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}
              />
              <button
                onClick={checkAnswer}
                style={{
                  padding: '12px 25px',
                  backgroundColor: oceanBlue.dark,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                Prüfen
              </button>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'transparent',
                border: `1px solid ${oceanBlue.medium}`,
                borderRadius: '8px',
                color: oceanBlue.dark,
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '15px',
                transition: 'background-color 0.3s ease'
              }}
            >
              {showHint ? 'Hinweis verbergen' : 'Hinweis anzeigen'}
            </button>

            {attemptsLeft > 0 && (
              <div style={{
                marginTop: '15px',
                color: oceanBlue.darker,
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>
                <p>Verbleibende Versuche: {attemptsLeft}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
