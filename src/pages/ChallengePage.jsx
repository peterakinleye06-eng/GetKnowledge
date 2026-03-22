import { useState } from "react";
import { DAILY_CHALLENGES } from "../data";
import { useAuth } from "../context/AuthContext";

export default function ChallengePage() {
  const { updatePoints } = useAuth();
  const [idx, setIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState([]);

  const ch = DAILY_CHALLENGES[idx];
  const labels = ["A","B","C","D"];

  const answer = (i) => {
    setAnswered(true); setSelectedAns(i);
    if (i === ch.ans) { updatePoints(ch.points); setCompleted(c => [...c, idx]); }
  };

  const next = () => {
    const n = (idx + 1) % DAILY_CHALLENGES.length;
    setIdx(n); setAnswered(false); setSelectedAns(null);
  };

  const diffColor = { Easy:"#00E5A0", Medium:"#FF6B35", Hard:"#E91E8C" };

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#1a0a3e,#0e1a3e)", border:"1px solid rgba(124,92,191,0.25)", borderRadius:"18px", padding:"20px", marginBottom:"18px", textAlign:"center" }}>
        <div style={{ fontSize:"32px", marginBottom:"6px" }}>⚡</div>
        <div style={{ fontSize:"22px", fontWeight:800, marginBottom:"4px" }}>Daily Challenge</div>
        <div style={{ fontSize:"13px", color:"#6B7FA3" }}>New questions every day — earn bonus XP!</div>
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
        <span style={{ fontSize:"11px", padding:"4px 10px", borderRadius:"7px", background:"#1C2537", color:"#6B7FA3", border:"1px solid #1E2D45" }}>{ch.subject}</span>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontSize:"11px", fontWeight:700, padding:"4px 10px", borderRadius:"7px", background:`rgba(${ch.difficulty==="Easy"?"0,229,160":ch.difficulty==="Medium"?"255,107,53":"233,30,140"},0.12)`, color:diffColor[ch.difficulty] }}>{ch.difficulty}</span>
          <span style={{ fontSize:"12px", color:"#00E5A0", fontWeight:700 }}>+{ch.points} XP</span>
        </div>
      </div>

      <div style={{ fontSize:"17px", fontWeight:600, lineHeight:1.5, marginBottom:"22px" }}>{ch.question}</div>

      {ch.options.map((opt, i) => {
        let bg="#1C2537", border="1px solid #1E2D45", color="#F0F4FF";
        if (answered) {
          if (i===ch.ans) { bg="rgba(0,229,160,0.14)"; border="2px solid #00E5A0"; color="#00E5A0"; }
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
          <div style={{ background:"rgba(0,229,160,0.08)", border:"1px solid rgba(0,229,160,0.2)", borderRadius:"12px", padding:"13px", marginBottom:"14px", fontSize:"14px", lineHeight:1.5 }}>
            <strong style={{ color:"#fff", display:"block", fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"4px" }}>
              💡 {selectedAns===ch.ans?"Correct! 🎉":"Incorrect"}
            </strong>
            <span style={{ color:"#00E5A0" }}>{ch.explanation}</span>
          </div>
          <button onClick={next} style={{ width:"100%", padding:"15px", borderRadius:"13px", border:"none", background:"linear-gradient(135deg,#00E5A0,#00C6A2)", color:"#0A0E1A", fontFamily:"'Sora',sans-serif", fontSize:"15px", fontWeight:700, cursor:"pointer" }}>
            Next Challenge →
          </button>
        </>
      )}

      <div style={{ marginTop:"16px", display:"flex", justifyContent:"center", gap:"6px" }}>
        {DAILY_CHALLENGES.map((_,i) => (
          <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:i===idx?"#00E5A0":completed.includes(i)?"rgba(0,229,160,0.35)":"#1E2D45", transition:"all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}
