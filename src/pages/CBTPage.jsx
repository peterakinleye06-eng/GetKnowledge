import { useState, useEffect, useRef } from "react";
import { CBT_QUESTIONS } from "../data";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

export default function CBTPage() {
  const { updatePoints } = useAuth();
  const [screen, setScreen] = useState("setup");
  const [exam, setExam] = useState("WAEC");
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === "quiz" && !answered) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setAnswered(true); setSelectedAns(-1); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, idx, answered]);

  const start = () => {
    const pool = CBT_QUESTIONS[exam]?.[subject] || [];
    if (!pool.length) return;
    setQuestions([...pool].sort(() => Math.random() - 0.5));
    setIdx(0); setScore(0); setAnswered(false); setSelectedAns(null); setTimeLeft(60);
    setScreen("quiz");
  };

  const answer = (i) => {
    clearInterval(timerRef.current);
    const correct = questions[idx].ans === i;
    setAnswered(true); setSelectedAns(i);
    if (correct) { setScore(s => s + 1); updatePoints(10); }
  };

  const next = () => {
    const n = idx + 1;
    if (n >= questions.length) { setScreen("result"); return; }
    setIdx(n); setAnswered(false); setSelectedAns(null); setTimeLeft(60);
  };

  const reset = () => { setScreen("setup"); setSubject(null); };

  const labels = ["A","B","C","D"];
  const subjects = Object.keys(CBT_QUESTIONS[exam] || {});

  if (screen === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct>=80?"Excellent! 🎉":pct>=60?"Good Pass 👍":pct>=50?"Average 📚":"Keep Practising 💪";
    return (
      <div style={{ textAlign:"center", paddingTop:"20px" }}>
        <div style={{ width:"120px", height:"120px", borderRadius:"50%", border:"5px solid #00E5A0", margin:"0 auto 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(0,229,160,0.07)" }}>
          <div style={{ fontSize:"36px", fontWeight:800, color:"#00E5A0", fontFamily:"'JetBrains Mono',monospace" }}>{pct}%</div>
          <div style={{ fontSize:"12px", color:"#6B7FA3" }}>{score}/{questions.length}</div>
        </div>
        <div style={{ fontSize:"20px", fontWeight:700, marginBottom:"6px" }}>{grade}</div>
        <div style={{ fontSize:"13px", color:"#6B7FA3", marginBottom:"28px" }}>{exam} · {subject}</div>
        <button onClick={reset} style={{ width:"100%", padding:"15px", borderRadius:"13px", border:"none", background:"linear-gradient(135deg,#00E5A0,#00C6A2)", color:"#0A0E1A", fontFamily:"'Sora',sans-serif", fontSize:"15px", fontWeight:700, cursor:"pointer", marginBottom:"10px" }}>Try Another Subject</button>
        <button onClick={start} style={{ width:"100%", padding:"13px", borderRadius:"13px", border:"1px solid #1E2D45", background:"#1C2537", color:"#F0F4FF", fontFamily:"'Sora',sans-serif", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>Retry Same Subject</button>
      </div>
    );
  }

  if (screen === "quiz") {
    const q = questions[idx];
    return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
          <span style={{ fontSize:"13px", color:"#6B7FA3" }}>{exam} · {subject}</span>
          <span style={{ fontSize:"15px", fontWeight:700, color:timeLeft<=10?"#FF4444":"#F0F4FF", fontFamily:"'JetBrains Mono',monospace", display:"flex", alignItems:"center", gap:"4px", ...(timeLeft<=10?{animation:"pulse 1s infinite"}:{}) }}>
            <Icon name="time" size={15} /> {timeLeft}s
          </span>
        </div>
        <div style={{ height:"3px", background:"#1E2D45", borderRadius:"3px", marginBottom:"22px" }}>
          <div style={{ height:"100%", width:`${(idx/questions.length)*100}%`, background:"linear-gradient(90deg,#00E5A0,#00B8FF)", borderRadius:"3px", transition:"width 0.4s" }} />
        </div>
        <div style={{ fontSize:"11px", color:"#00E5A0", fontWeight:600, fontFamily:"'JetBrains Mono',monospace", marginBottom:"8px" }}>Question {idx+1} of {questions.length}</div>
        <div style={{ fontSize:"17px", fontWeight:600, lineHeight:1.5, marginBottom:"22px" }}>{q.q}</div>
        {q.options.map((opt,i) => {
          let bg="#1C2537", border="1px solid #1E2D45", color="#F0F4FF";
          if (answered) {
            if (i===q.ans) { bg="rgba(0,229,160,0.14)"; border="2px solid #00E5A0"; color="#00E5A0"; }
            else if (i===selectedAns) { bg="rgba(255,68,68,0.12)"; border="2px solid #FF4444"; color="#FF6666"; }
          }
          return (
            <button key={i} disabled={answered} onClick={() => answer(i)}
              style={{ width:"100%", padding:"14px 16px", marginBottom:"10px", borderRadius:"13px", border, background:bg, color, fontFamily:"'Sora',sans-serif", fontSize:"14px", fontWeight:500, cursor:answered?"default":"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:"12px", transition:"all 0.2s" }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", fontWeight:700, width:"20px", flexShrink:0 }}>{labels[i]}</span>
              {opt}
            </button>
          );
        })}
        {answered && (
          <>
            <div style={{ background:"rgba(0,229,160,0.08)", border:"1px solid rgba(0,229,160,0.2)", borderRadius:"12px", padding:"13px", marginBottom:"14px", fontSize:"14px", color:"#00E5A0", lineHeight:1.5 }}>
              <strong style={{ color:"#fff", display:"block", fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"4px" }}>💡 Explanation</strong>
              {q.explanation}
            </div>
            <button onClick={next} style={{ width:"100%", padding:"15px", borderRadius:"13px", border:"none", background:"linear-gradient(135deg,#00E5A0,#00C6A2)", color:"#0A0E1A", fontFamily:"'Sora',sans-serif", fontSize:"15px", fontWeight:700, cursor:"pointer" }}>
              {idx+1<questions.length?"Next Question →":"See Results"}
            </button>
          </>
        )}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize:"22px", fontWeight:700, marginBottom:"4px" }}>CBT Practice</div>
      <div style={{ fontSize:"13px", color:"#6B7FA3", marginBottom:"18px" }}>Choose your exam and subject</div>
      <div style={{ display:"flex", gap:"8px", marginBottom:"18px" }}>
        {["WAEC","JAMB"].map(e => (
          <button key={e} onClick={() => { setExam(e); setSubject(null); }}
            style={{ flex:1, padding:"10px", borderRadius:"12px", border:`2px solid ${exam===e?(e==="WAEC"?"#00E5A0":"#FF6B35"):"#1E2D45"}`, background:exam===e?(e==="WAEC"?"rgba(0,229,160,0.08)":"rgba(255,107,53,0.08)"):"transparent", color:exam===e?(e==="WAEC"?"#00E5A0":"#FF6B35"):"#6B7FA3", fontFamily:"'Sora',sans-serif", fontSize:"14px", fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>
            {e}
          </button>
        ))}
      </div>
      <div style={{ fontSize:"11px", fontWeight:700, color:"#6B7FA3", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"10px" }}>Select Subject</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"18px" }}>
        {subjects.map(s => (
          <button key={s} onClick={() => setSubject(s)}
            style={{ padding:"14px", borderRadius:"13px", border:`2px solid ${subject===s?"#00E5A0":"#1E2D45"}`, background:subject===s?"rgba(0,229,160,0.1)":"#1C2537", color:subject===s?"#00E5A0":"#F0F4FF", fontFamily:"'Sora',sans-serif", fontSize:"13px", fontWeight:600, cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}>
            {s}
            <div style={{ fontSize:"11px", color:"#6B7FA3", marginTop:"3px", fontWeight:400 }}>{CBT_QUESTIONS[exam][s].length} questions</div>
          </button>
        ))}
      </div>
      <button onClick={start} disabled={!subject}
        style={{ width:"100%", padding:"15px", borderRadius:"13px", border:"none", background:subject?"linear-gradient(135deg,#00E5A0,#00C6A2)":"#1C2537", color:subject?"#0A0E1A":"#3a4a60", fontFamily:"'Sora',sans-serif", fontSize:"15px", fontWeight:700, cursor:subject?"pointer":"not-allowed", transition:"all 0.2s" }}>
        Start Practice Session →
      </button>
    </div>
  );
}
