import { useState, useEffect, useRef } from "react";
import Icon from "../components/Icon";

const callAPI = async (messages) => {
  const res = await fetch("/api/tutor", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API error");
  return data.reply || "Please try again!";
};

const QUICK = ["Explain photosynthesis","Quadratic formula","JAMB English tips","Newton's laws","Chemical bonding","Past tense rules","How to pass WAEC","Solve this: 3x+7=22"];

export default function TutorPage() {
  const [messages, setMessages] = useState([{ role:"assistant", content:"Welcome! I'm Mr. Knowledge, your AI tutor 👨‍🏫\n\nAsk me anything about your WAEC or JAMB subjects — Maths, Biology, Chemistry, English, Physics and more! What shall we tackle today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    const newMsgs = [...messages, { role:"user", content:msg }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const reply = await callAPI(newMsgs.map(m => ({ role:m.role, content:m.content })));
      setMessages(m => [...m, { role:"assistant", content:reply }]);
    } catch {
      setMessages(m => [...m, { role:"assistant", content:"Sorry, I had a network issue. Please check your connection and try again! 🙏" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 170px)" }}>
      <div style={{ marginBottom:"12px" }}>
        <div style={{ fontSize:"22px", fontWeight:700, marginBottom:"2px" }}>Mr. Knowledge 🤖</div>
        <div style={{ fontSize:"13px", color:"#6B7FA3" }}>Your AI classroom teacher — ask anything!</div>
      </div>

      {/* Quick chips */}
      <div style={{ display:"flex", gap:"6px", overflowX:"auto", paddingBottom:"10px", marginBottom:"6px", flexShrink:0 }}>
        {QUICK.map((q,i) => (
          <button key={i} onClick={() => send(q)}
            style={{ flexShrink:0, padding:"6px 12px", borderRadius:"20px", border:"1px solid #1E2D45", background:"#1C2537", color:"#6B7FA3", fontFamily:"'Sora',sans-serif", fontSize:"12px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}>
            {q}
          </button>
        ))}
        <style>{`::-webkit-scrollbar{display:none}`}</style>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"14px", flexDirection:m.role==="user"?"row-reverse":"row" }}>
            <div style={{ width:"34px", height:"34px", borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", background:m.role==="assistant"?"rgba(0,229,160,0.12)":"#1C2537", border:`1px solid ${m.role==="assistant"?"rgba(0,229,160,0.25)":"#1E2D45"}` }}>
              {m.role==="assistant"?"👨‍🏫":"🧑‍🎓"}
            </div>
            <div style={{ maxWidth:"78%", padding:"12px 15px", borderRadius:m.role==="assistant"?"4px 16px 16px 16px":"16px 4px 16px 16px", fontSize:"14px", lineHeight:1.6, background:m.role==="assistant"?"#1C2537":"rgba(0,229,160,0.12)", border:`1px solid ${m.role==="assistant"?"#1E2D45":"rgba(0,229,160,0.2)"}`, color:m.role==="assistant"?"#F0F4FF":"#00E5A0", whiteSpace:"pre-wrap" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
            <div style={{ width:"34px", height:"34px", borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", background:"rgba(0,229,160,0.12)", border:"1px solid rgba(0,229,160,0.25)" }}>👨‍🏫</div>
            <div style={{ padding:"14px 18px", borderRadius:"4px 16px 16px 16px", background:"#1C2537", border:"1px solid #1E2D45", display:"flex", gap:"4px", alignItems:"center" }}>
              {[0,1,2].map(i => <div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#6B7FA3", animation:`bounce 1.2s ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
        <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0.6)}40%{transform:scale(1)}}`}</style>
      </div>

      {/* Input */}
      <div style={{ display:"flex", gap:"8px", paddingTop:"10px", flexShrink:0 }}>
        <input
          style={{ flex:1, background:"#1C2537", border:"1px solid #1E2D45", borderRadius:"13px", padding:"12px 16px", color:"#F0F4FF", fontFamily:"'Sora',sans-serif", fontSize:"14px", outline:"none" }}
          placeholder="Ask Mr. Knowledge anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && send()}
        />
        <button onClick={() => send()} disabled={!input.trim()||loading}
          style={{ width:"46px", height:"46px", borderRadius:"13px", border:"none", background:"#00E5A0", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, opacity:(!input.trim()||loading)?0.4:1, transition:"all 0.2s" }}>
          <Icon name="send" size={18} color="#0A0E1A" />
        </button>
      </div>
    </div>
  );
}
