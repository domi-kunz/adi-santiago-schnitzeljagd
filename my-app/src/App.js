import React, { useState, useEffect } from 'react';
import './App.css';

const StartPage = ({ onContinue }) => {
  return (
    <div className="start-page-container">
      <h1>Willkommen, Sherlock!</h1>
      <p>
        Ah, wie wundervoll, dass Sie sich heute hier eingefunden haben. Es scheint, als hätten Sie ein Faible
        für knifflige Rätsel und aufregende Herausforderungen – ganz wie ich es vermutet habe! Aber Vorsicht,
        meine liebe Spürnase, dies ist kein gewöhnlicher Spaziergang durch den Park.
      </p>
      <p>
        Ich, Watson, habe eine Reihe spannender Quests für Sie vorbereitet. Jede einzelne fordert Ihren
        Verstand, Ihre Kreativität und Ihren Scharfsinn heraus. Schließen Sie die Quests innerhalb eines
        Monats ab, und Sie dürfen sich auf eine wohlverdiente Belohnung freuen. Doch seien Sie gewarnt,
        sollten Sie scheitern, erwartet Sie eine gerechte Strafe – ein wahrhaft bittersüßer Moment für uns
        beide, nicht wahr?
      </p>
      <p>
        Nun denn, hier die Regeln, die Sie unter keinen Umständen brechen dürfen – ich beobachte Sie genau:
      </p>
      <ul>
        <li>Beweisfoto! Senden Sie Domi nach Abschluss einer Quest ein Selfie als Beweis via WhatsApp. Ohne Beweis kein Triumph, mein Freund!</li>
        <li>Internet? Nein, danke! Jede Form von Recherche im weltweiten Netz ist strengstens untersagt. Ihr brillanter Verstand reicht aus – vertrauen Sie mir!</li>
        <li>Keine Schummeleien! Hilfsmittel oder Hilfe von Dritten sind unter keinen Umständen gestattet. Nur Sie und Ihr Gehirn, Sherlock.</li>
      </ul>
      <p>
        Nun liegt es an Ihnen, Sherlock. Mögen Sie uns alle mit Ihrer Genialität beeindrucken. Aber vergessen
        Sie nicht: Der Countdown läuft, und das Spiel ist erbarmungslos.
      </p>
      <p>Viel Erfolg, Sherlock!<br />Ihr Watson</p>
      <button className="continue-button" onClick={onContinue}>Weiter</button>
    </div>
  );
};

const App = () => {
  const [showStartPage, setShowStartPage] = useState(() => {
    const hasSeenStartPage = localStorage.getItem('hasSeenStartPage');
    return !hasSeenStartPage;
  });

  const [month, setMonth] = useState(() => {
    const savedMonth = localStorage.getItem('currentMonth');
    return savedMonth ? parseInt(savedMonth, 10) : 0;
  });

  const [taskIndex, setTaskIndex] = useState(() => {
    const savedTaskIndex = localStorage.getItem('currentTaskIndex');
    return savedTaskIndex ? parseInt(savedTaskIndex, 10) : 0;
  });

  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [feedbackClass, setFeedbackClass] = useState('');

  const months = ["Januar", "Februar"];

  const tasks = [
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
        hint: "Stell dich vor den Palast und zähle die Säulen am Eingang...Säulen sind nicht gleich Pfeiler!",
        location: "Praza do Obradoiro"
      }
    ],
    [
      {
        title: "Das historische Museum erkunden",
        question: "Wie viele Räume gibt es in der ersten Etage des Museums?",
        answer: "5",
        hint: "Zähle die Ausstellungsräume auf der ersten Etage...",
        location: "Historisches Museum"
      },
      {
        title: "Der Botanische Garten",
        question: "Welche Farbe hat die größte Blume im Garten?",
        answer: "rot",
        hint: "Suche die auffälligste Blume im Garten...",
        location: "Botanischer Garten"
      },
      {
        title: "Marktplatz erkunden",
        question: "Wie viele Stände verkaufen frisches Obst?",
        answer: "12",
        hint: "Gehe durch den Markt und zähle die Obststände...",
        location: "Marktplatz"
      },
      {
        title: "Das Denkmal zählen",
        question: "Wie viele Stufen führen zum Denkmal?",
        answer: "20",
        hint: "Gehe die Treppe hinauf und zähle die Stufen...",
        location: "Denkmal"
      }
    ]
  ];

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('currentMonth', month);
    localStorage.setItem('currentTaskIndex', taskIndex);

    if (!showStartPage) {
      localStorage.setItem('hasSeenStartPage', 'true');
    }
  }, [completedTasks, showStartPage, month, taskIndex]);

  const checkAnswer = () => {
    const currentTask = tasks[month][taskIndex];
    if (!currentTask) return;

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentTask.answer;
    setIsCorrect(isAnswerCorrect);
    setFeedbackClass(isAnswerCorrect ? 'answer-correct' : 'answer-wrong');

    setTimeout(() => {
      setFeedbackClass('');
    }, 1000);

    if (isAnswerCorrect) {
      const newCompletedTasks = [...completedTasks, `${month}-${taskIndex}`];
      setCompletedTasks(newCompletedTasks);
    
      setTimeout(() => {
        if (taskIndex < tasks[month].length - 1) {
          setTaskIndex(taskIndex + 1);
        } else {
          // Entferne diese Zeile: `setMonth(month + 1);`
          setTaskIndex(0);
        }
        setUserAnswer('');
        setIsCorrect(false);
        setShowHint(false);
        setAttemptsLeft(4);
      }, 1500);
    }
    
  };

  const isTaskCompleted = (monthIndex, taskIdx) => {
    return completedTasks.includes(`${monthIndex}-${taskIdx}`);
  };

  const calculateProgress = () => {
    const totalTasks = tasks[month].length;
    const completedCount = completedTasks.filter(task => task.startsWith(`${month}-`)).length;
    return Math.round((completedCount / totalTasks) * 100);
  };

  const areAllTasksCompletedForMonth = (monthIndex) => {
    return tasks[monthIndex].every((_, taskIdx) =>
      isTaskCompleted(monthIndex, taskIdx)
    );
  };

  const currentTask = tasks[month]?.[taskIndex];

  if (showStartPage) {
    return <StartPage onContinue={() => setShowStartPage(false)} />;
  }

  if (month === 0 && areAllTasksCompletedForMonth(0)) {
    return (
      <div className="app-container">
        <div className="header">
          <span style={{ fontSize: '48px', color: '#1565C0' }}>🎉</span>
          <h1>Herzlichen Glückwunsch!</h1>
          <p>Du hast alle Aufgaben für Januar erfolgreich abgeschlossen!</p>
          <div className="love-letter-container">
            <h2>💌 Liebesbrief an Adi 💌</h2>
            <p>
              Du hast nicht nur alle Aufgaben mit Bravour gemeistert,
              sondern auch bewiesen, dass du mein liebster Abenteurer bist! Danke, dass du mit mir
              diese Reise gemacht hast. Ich liebe dich! ❤️
            </p>
          </div>
          <div className="info-container">
            <p>
              ⚠️ Die Quests für Februar werden erst am <strong>01. Februar</strong> freigeschaltet!
            </p>
          </div>
          <button
            onClick={() => {
                setMonth(1); // Übergang zum Februar nur auf Knopfdruck
                 setTaskIndex(0);
             }}
            className="month-button"
          >
            Zum Februar
          </button>
        </div>
  
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `100%` }}></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
          Fortschritt: 100%
        </p>
      </div>
    );
  }
  
  

  if (month === 1 && areAllTasksCompletedForMonth(1)) {
    return (
      <div className="app-container">
        <div className="header">
          <span style={{ fontSize: '48px', color: '#1565C0' }}>🎉</span>
          <h1>Februar abgeschlossen!</h1>
          <p>Du hast auch die Aufgaben für Februar abgeschlossen!</p>
          <div className="poem-container">
            <h2>Ein Essensgutschein deiner Wahl!</h2>
            <p>
              Du liebst das Essen gehen genauso wie ich,<br />
              deshalb erhältst du hiermit einen Gutschein deiner Wahl.<br />
              Teile mir mit wo und wann und es geht auf mich. ❤️<br />
              </p>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `100%` }}></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
          Fortschritt: 100%
        </p>
      </div>
    );
  }

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`app-container ${feedbackClass}`}>
      <div className="header">
        <h1>Questiago💙</h1>
        <p>Watson is watching you!👀</p>
      </div>

      <div className="rules-button-container">
        <button
          onClick={() => setRulesAccepted(true)}
          className="rules-button"
        >
          📖 Regeln
        </button>
      </div>

      {rulesAccepted && (
        <div className="rules-modal">
          <h3>Regeln:</h3>
          <p>
            1. Schicke Domi ein Beweisfoto in Form eines Selfies per WhatsApp!<br />
            2. Internetrecherche ist strengstens untersagt!<br />
            3. Hilfsmittel oder Hilfe von Dritten ist nicht gestattet!<br />
          </p>
          <button
            onClick={() => setRulesAccepted(false)}
            className="close-rules-button"
          >
            Schließen
          </button>
        </div>
      )}

      <div className="month-display">
        <h2>{months[month]}</h2>
      </div>

      <div className="task-container">
        <h3>{currentTask.title}</h3>
        <p>{currentTask.question}</p>

        {showHint && (
          <div className="hint-container">
            <span>💡</span>
            <p>{currentTask.hint}</p>
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Deine Antwort..."
            className="answer-input"
          />
          <button onClick={checkAnswer} className="check-answer-button">
            Prüfen
          </button>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="toggle-hint-button"
        >
          {showHint ? 'Hinweis verbergen' : 'Hinweis anzeigen'}
        </button>

        {attemptsLeft > 0 && (
          <div className="attempts-left">
            <p>Verbleibende Versuche: {attemptsLeft}</p>
          </div>
        )}

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
          Fortschritt: {calculateProgress()}%
        </p>
      </div>
    </div>
  );
};

export default App;
