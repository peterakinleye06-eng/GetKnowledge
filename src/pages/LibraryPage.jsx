import { useState } from "react";
import { LIBRARY_TOPICS } from "../data";
import Icon from "../components/Icon";

const renderMd = (text) => {
  const lines = text.split("\n");
  const html = [];
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) html.push(`<h2 style="font-size:19px;font-weight:700;margin-bottom:10px;color:#F0F4FF">${l.slice(3)}</h2>`);
    else if (l.startsWith("### ")) html.push(`<h3 style="font-size:15px;font-weight:600;margin:14px 0 6px;color:#00E5A0">${l.slice(4)}</h3>`);
    else if (l.startsWith("|")) {
      if (!inTable) { html.push(`<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px">`); inTable = true; }
      const cells = l.split("|").filter(c=>c.trim()!=="").map(c=>c.trim());
      if (l.includes("---")) html.push("");
      else html.push(`<tr>${cells.map(c=>`<td style="padding:8px;border:1px solid #1E2D45">${c}</td>`).join("")}</tr>`);
    } else {
      if (inTable) { html.push("</table>"); inTable = false; }
      if (l.startsWith("> ")) html.push(`<blockquote style="border-left:3px solid #7C5CBF;padding-left:12px;color:#a0aec0;font-style:italic;margin:10px 0">${l.slice(2)}</blockquote>`);
      else if (l.startsWith("✓")) html.push(`<p style="color:#00E5A0;margin-bottom:6px">${l}</p>`);
      else if (l.trim()==="") html.push("<br/>");
      else {
        let p = l.replace(/\*\*(.+?)\*\*/g,"<strong style='color:#00E5A0'>$1</strong>").replace(/`(.+?)`/g,`<code style="background:#1C2537;padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px">$1</code>`);
        html.push(`<p style="margin-bottom:8px;line-height:1.7;color:#d1daf0">${p}</p>`);
      }
    }
  }
  if (inTable) html.push("</table>");
  return html.join("");
};

export default function LibraryPage() {
  const [topic, setTopic] = useState(null);

  if (topic) return (
    <div>
      <button onClick={() => setTopic(null)} style={{ display:"flex", alignItems:"center", gap:"6px", border:"none", background:"transparent", color:"#6B7FA3", fontFamily:"'Sora',sans-serif", fontSize:"14px", cursor:"pointer", marginBottom:"16px", padding:0 }}>
        <Icon name="back" size={18} /> Back to Library
      </button>
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"18px" }}>
        <span style={{ fontSize:"11px", fontWeight:600, padding:"4px 10px", borderRadius:"7px", background:"#1C2537", color:"#6B7FA3", border:"1px solid #1E2D45" }}>{topic.subject}</span>
        <span style={{ fontSize:"11px", fontWeight:600, padding:"4px 10px", borderRadius:"7px", background:"#1C2537", color:topic.exam.includes("JAMB")?"#FF6B35":"#00E5A0", border:`1px solid ${topic.exam.includes("JAMB")?"rgba(255,107,53,0.3)":"rgba(0,229,160,0.3)"}` }}>{topic.exam}</span>
        <span style={{ fontSize:"11px", fontWeight:600, padding:"4px 10px", borderRadius:"7px", background:"#1C2537", color:"#6B7FA3", border:"1px solid #1E2D45" }}>📖 {topic.readTime}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: renderMd(topic.content) }} />
    </div>
  );

  return (
    <div>
      <div style={{ fontSize:"22px", fontWeight:700, marginBottom:"4px" }}>Library</div>
      <div style={{ fontSize:"13px", color:"#6B7FA3", marginBottom:"18px" }}>Study notes for WAEC & JAMB</div>
      {LIBRARY_TOPICS.map(t => (
        <div key={t.id} onClick={() => setTopic(t)}
          style={{ background:"#111827", border:"1px solid #1E2D45", borderRadius:"16px", padding:"16px", marginBottom:"12px", cursor:"pointer", display:"flex", gap:"14px", alignItems:"flex-start", transition:"all 0.2s" }}>
          <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:t.color, flexShrink:0, marginTop:"5px" }} />
          <div>
            <div style={{ fontSize:"16px", fontWeight:600, marginBottom:"6px" }}>{t.title}</div>
            <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"11px", padding:"3px 8px", borderRadius:"6px", background:"#1C2537", color:"#6B7FA3", border:"1px solid #1E2D45" }}>{t.subject}</span>
              <span style={{ fontSize:"11px", padding:"3px 8px", borderRadius:"6px", background:"#1C2537", color:t.exam.includes("JAMB")?"#FF6B35":"#00E5A0", border:"1px solid #1E2D45" }}>{t.exam}</span>
              <span style={{ fontSize:"11px", padding:"3px 8px", borderRadius:"6px", background:"#1C2537", color:"#6B7FA3", border:"1px solid #1E2D45" }}>⏱ {t.readTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
