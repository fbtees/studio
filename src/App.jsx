import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080808; }

  .app { min-height: 100vh; background: #080808; color: #f0f0f0; font-family: 'Barlow', sans-serif; padding-bottom: 80px; }

  .header {
    border-bottom: 3px solid #FF2200;
    padding: 16px 32px;
    display: flex; align-items: center; justify-content: space-between;
    background: #080808; position: sticky; top: 0; z-index: 100;
  }
  .logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; color: #fff; line-height: 1; }
  .logo span { color: #FF2200; }
  .tagline { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 4px; color: #444; text-transform: uppercase; margin-top: 2px; }
  .pip-row { display: flex; gap: 6px; align-items: center; }
  .pip { width: 10px; height: 10px; border-radius: 50%; background: #1a1a1a; border: 2px solid #282828; transition: all 0.3s; }
  .pip.active { background: #FF2200; border-color: #FF2200; box-shadow: 0 0 8px #FF2200aa; }
  .pip.done { background: #FFE600; border-color: #FFE600; }

  .idea-bar {
    padding: 24px 32px;
    background: linear-gradient(180deg, #101010 0%, #080808 100%);
    border-bottom: 1px solid #181818;
  }
  .bar-label { font-family: 'Bebas Neue', sans-serif; font-size: 11px; letter-spacing: 5px; color: #FF2200; margin-bottom: 10px; }
  .bar-row { display: flex; gap: 10px; }
  .idea-input {
    flex: 1; background: #111; border: 2px solid #1e1e1e; border-radius: 3px;
    color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 600;
    letter-spacing: 1px; padding: 13px 18px; outline: none; transition: border-color 0.2s;
  }
  .idea-input:focus { border-color: #FF2200; }
  .idea-input::placeholder { color: #2e2e2e; }
  .ignite-btn {
    background: #FF2200; color: #fff; border: none; border-radius: 3px;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px;
    padding: 0 28px; cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .ignite-btn:hover:not(:disabled) { background: #ff4422; transform: translateY(-1px); }
  .ignite-btn:disabled { background: #252525; color: #444; cursor: not-allowed; }

  .style-bar {
    padding: 14px 32px 18px;
    background: #0a0a0a;
    border-bottom: 1px solid #181818;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }
  .style-field { display: flex; flex-direction: column; gap: 5px; }
  .style-label { font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 4px; color: #444; text-transform: uppercase; }
  .style-input {
    background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 3px;
    color: #ccc; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.5px; padding: 8px 12px; outline: none; transition: border-color 0.2s;
  }
  .style-input:focus { border-color: #FF2200; color: #fff; }
  .style-input::placeholder { color: #252525; }

  .dashboard { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: #111; margin: 2px; }

  .panel {
    background: #0c0c0c; padding: 24px 24px 22px; display: flex; flex-direction: column;
    min-height: 520px; position: relative; overflow: hidden;
  }
  .panel.locked { pointer-events: none; }
  .panel.locked::after {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,0.2) 10px,rgba(0,0,0,0.2) 11px);
    pointer-events: none;
  }
  .panel.locked .panel-head, .panel.locked .panel-body { opacity: 0.3; }

  .bg-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 100px; line-height: 0.8;
    color: #121212; position: absolute; right: 16px; top: 12px; pointer-events: none; user-select: none;
  }

  .panel-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; position: relative; z-index: 1; }
  .p-title { font-family: 'Bebas Neue', sans-serif; font-size: 21px; letter-spacing: 3px; color: #fff; line-height: 1; }
  .p-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 3px; color: #3a3a3a; text-transform: uppercase; margin-top: 4px; }

  .badge { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 4px 9px; border-radius: 2px; white-space: nowrap; }
  .badge.locked { background: #161616; color: #333; border: 1px solid #1e1e1e; }
  .badge.ready { background: #1a1a00; color: #FFE600; border: 1px solid #FFE600; }
  .badge.running { background: #1a0500; color: #FF4411; border: 1px solid #FF2200; animation: blink 0.9s infinite; }
  .badge.done { background: #001500; color: #33ee77; border: 1px solid #33ee77; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .panel-body { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
  .scroll { overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: #1e1e1e transparent; padding-right: 4px; }

  .panel-foot { margin-top: 14px; flex-shrink: 0; }

  .btn {
    width: 100%; border: 2px solid; border-radius: 3px; background: transparent;
    font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 3px;
    padding: 10px 0; cursor: pointer; transition: all 0.15s;
  }
  .btn:disabled { border-color: #1e1e1e !important; color: #333 !important; cursor: not-allowed; }
  .btn.red { border-color: #FF2200; color: #FF2200; }
  .btn.red:hover:not(:disabled) { background: #FF2200; color: #fff; }
  .btn.yellow { border-color: #FFE600; color: #FFE600; }
  .btn.yellow:hover:not(:disabled) { background: #FFE600; color: #000; }
  .btn.green { border-color: #33ee77; color: #33ee77; }
  .btn.green:hover:not(:disabled) { background: #33ee77; color: #000; }
  .btn.grey { border-color: #333; color: #555; }
  .btn.grey:hover:not(:disabled) { border-color: #555; color: #999; }

  .loader { padding: 30px 0; text-align: center; }
  .loader-text { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 4px; color: #FF2200; text-transform: uppercase; animation: blink 0.9s infinite; margin-bottom: 14px; }
  .loader-bar { height: 2px; background: #181818; border-radius: 1px; overflow: hidden; }
  .loader-fill { height: 100%; width: 35%; background: linear-gradient(90deg, transparent, #FF2200, transparent); animation: scan 1.4s ease-in-out infinite; }
  @keyframes scan { 0%{transform:translateX(-200%)} 100%{transform:translateX(500%)} }

  .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; min-height: 200px; }
  .empty-icon { font-size: 32px; margin-bottom: 10px; }
  .empty-txt { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #1e1e1e; }

  .slabel { font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 5px; color: #FF2200; text-transform: uppercase; margin: 14px 0 7px; }
  .slabel:first-child { margin-top: 0; }

  /* CONCEPT CARDS */
  .concept-cards { display: flex; flex-direction: column; gap: 8px; }
  .ccard {
    border: 1px solid #1a1a1a; border-radius: 3px; padding: 13px 14px;
    cursor: pointer; transition: all 0.15s; position: relative; background: #0f0f0f;
  }
  .ccard:hover { border-color: #2e2e2e; }
  .ccard.sel { border-color: #FFE600; background: #111100; }
  .ccard.sel::before {
    content: '✓ SELECTED'; position: absolute; top: 10px; right: 12px;
    font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 3px; color: #FFE600;
  }
  .cc-num { font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 3px; color: #333; margin-bottom: 4px; }
  .cc-tl { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; color: #fff; line-height: 1.1; margin-bottom: 5px; }
  .ccard.sel .cc-tl { color: #FFE600; }
  .cc-ang { font-size: 12px; color: #666; line-height: 1.5; margin-bottom: 7px; }
  .cc-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1px; padding: 2px 7px; border-radius: 2px; text-transform: uppercase; }
  .tag.mood { background: #160a00; color: #FF6633; border: 1px solid #331100; }
  .tag.type { background: #0a0a16; color: #6677FF; border: 1px solid #111133; }
  .tag.aud { background: #0a1600; color: #66BB33; border: 1px solid #113300; }
  .cc-vis { font-size: 11px; color: #444; margin-top: 7px; font-style: italic; line-height: 1.4; }

  /* VARIATION TABS */
  .vtabs { display: flex; gap: 4px; margin-bottom: 14px; flex-wrap: wrap; }
  .vtab {
    font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 2px;
    padding: 6px 14px; border: 1px solid #1e1e1e; border-radius: 2px; background: #111;
    color: #444; cursor: pointer; transition: all 0.15s;
  }
  .vtab:hover { border-color: #333; color: #888; }
  .vtab.active { border-color: #FFE600; color: #FFE600; background: #111100; }
  .vtab.spinning { color: #FF2200; border-color: #FF2200; animation: blink 0.9s infinite; }
  .vtab.picked { border-color: #33ee77; color: #33ee77; background: #001500; }

  .vname { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #FF2200; text-transform: uppercase; margin-bottom: 6px; }
  .vbrief { font-size: 12px; color: #666; line-height: 1.5; background: #111; border-left: 2px solid #FF2200; padding: 9px 12px; border-radius: 0 2px 2px 0; margin-bottom: 10px; }

  .decisions-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
  .decision-row { display: flex; gap: 8px; align-items: flex-start; }
  .decision-key { font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 3px; color: #FF2200; min-width: 80px; margin-top: 1px; text-transform: uppercase; }
  .decision-val { font-size: 12px; color: #888; line-height: 1.5; }

  .prompt-wrap { position: relative; margin-bottom: 10px; }
  .prompt-label { font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 4px; color: #444; margin-bottom: 6px; }
  .prompt-box {
    background: #080808; border: 1px solid #1e1e1e; border-radius: 3px;
    padding: 12px 14px; font-family: 'Barlow', sans-serif; font-size: 12px;
    color: #aaa; line-height: 1.65; white-space: pre-wrap; word-break: break-word;
    max-height: 140px; overflow-y: auto;
  }
  .copy-btn {
    position: absolute; top: 26px; right: 8px;
    background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 2px;
    font-family: 'Bebas Neue', sans-serif; font-size: 10px; letter-spacing: 2px;
    color: #555; padding: 4px 10px; cursor: pointer; transition: all 0.15s;
  }
  .copy-btn:hover { border-color: #FFE600; color: #FFE600; }
  .copy-btn.copied { border-color: #33ee77; color: #33ee77; }

  .pick-btn {
    width: 100%; border: 1px solid #1e1e1e; border-radius: 2px; background: #111;
    font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 3px; color: #333;
    padding: 8px 0; cursor: pointer; transition: all 0.15s; margin-top: 4px;
  }
  .pick-btn:hover { border-color: #33ee77; color: #33ee77; }
  .pick-btn.chosen { border-color: #33ee77; color: #33ee77; background: #001500; }

  /* CAL */
  .cal-list { display: flex; flex-direction: column; gap: 5px; }
  .cal-row {
    display: flex; align-items: flex-start; gap: 10px;
    background: #0f0f0f; border: 1px solid #181818; border-radius: 2px; padding: 9px 12px;
  }
  .cal-d { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #FF2200; line-height: 1; min-width: 28px; }
  .plt { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2px; padding: 2px 6px; border-radius: 2px; display: inline-block; margin-bottom: 3px; }
  .plt.instagram { background: #1a0022; color: #cc66ff; border: 1px solid #6600cc; }
  .plt.tiktok { background: #001a1a; color: #00d4cc; border: 1px solid #00d4cc; }
  .cal-type { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; color: #ccc; }
  .cal-desc { font-size: 11px; color: #444; margin-top: 2px; line-height: 1.4; }

  /* POSTS */
  .post-block { background: #0f0f0f; border: 1px solid #181818; border-radius: 3px; padding: 13px 14px; margin-bottom: 8px; }
  .post-top { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
  .post-day { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 2px; color: #333; }
  .caption { font-size: 12px; color: #bbb; line-height: 1.65; white-space: pre-wrap; }
  .hashtags { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: #334499; margin-top: 7px; letter-spacing: 0.5px; }
  .cta-line { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #FFE600; margin-top: 6px; text-transform: uppercase; }
`;

async function callClaude(systemPrompt, userMsg) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch {}
  }
  return { raw: text };
}

const VAR_STYLES = [
  { name: "BOLD TYPE",    desc: "Massive typography-forward, raw and aggressive. Text IS the design. Oversized letterforms, tight tracking, stark contrast." },
  { name: "ILLUSTRATIVE", desc: "Character or icon-driven graphic with supporting type. A central illustrated figure or symbol dominates the composition." },
  { name: "MINIMAL",      desc: "Stripped-back. One strong element, generous negative space, surgical precision. Less is devastatingly more." },
  { name: "DISTRESSED",   desc: "Grunge textures, worn edges, vintage screen-print look. Rough, imperfect, like it was printed in 1994 in a basement." },
  { name: "GRAPHIC POP",  desc: "High-contrast geometric shapes, bold color blocking, graphic punch. Think Constructivist poster meets streetwear." },
];

function Badge({ status }) {
  const map = { locked:"LOCKED", ready:"READY", running:"GENERATING", done:"✓ DONE" };
  return <span className={`badge ${status}`}>{map[status]}</span>;
}

function Loader({ text }) {
  return (
    <div className="loader">
      <div className="loader-text">{text}</div>
      <div className="loader-bar"><div className="loader-fill" /></div>
    </div>
  );
}

function PromptBox({ prompt }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="prompt-wrap">
      <div className="prompt-label">// IMAGE GENERATION PROMPT — COPY TO MIDJOURNEY / DALL-E / FIREFLY</div>
      <div className="prompt-box">{prompt}</div>
      <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>
        {copied ? "✓ COPIED" : "COPY"}
      </button>
    </div>
  );
}

function Empty({ icon, text }) {
  return <div className="empty"><div className="empty-icon">{icon}</div><div className="empty-txt">{text}</div></div>;
}

export default function App() {
  const [idea, setIdea] = useState("");

  // Style context
  const [styleAesthetic, setStyleAesthetic] = useState("");
  const [styleColor, setStyleColor] = useState("");
  const [styleTypography, setStyleTypography] = useState("");
  const [styleReference, setStyleReference] = useState("");

  // Stage 1
  const [s1, setS1] = useState(null);
  const [s1Loading, setS1Loading] = useState(false);
  const [selConcept, setSelConcept] = useState(null);

  // Stage 2
  const [vars, setVars] = useState(Array(5).fill(null));
  const [vLoading, setVLoading] = useState(Array(5).fill(false));
  const [activeVar, setActiveVar] = useState(0);
  const [selVar, setSelVar] = useState(null);

  // Stage 3
  const [s3, setS3] = useState(null);
  const [s3Loading, setS3Loading] = useState(false);

  // Stage 4
  const [s4, setS4] = useState(null);
  const [s4Loading, setS4Loading] = useState(false);

  const anyBusy = s1Loading || vLoading.some(Boolean) || s3Loading || s4Loading;

  async function runS1() {
    if (!idea.trim()) return;
    setS1Loading(true);
    setS1(null); setSelConcept(null);
    setVars(Array(5).fill(null)); setVLoading(Array(5).fill(false));
    setActiveVar(0); setSelVar(null);
    setS3(null); setS4(null);

    const result = await callClaude(
      `You are the creative director for FuckBoyTees — a bold, unapologetic, irreverent streetwear brand known for sharp cultural commentary, dark humor, and designs people are proud to wear.
Generate 5 FULLY DISTINCT design concepts. Each must take a completely different creative angle on the same raw idea.
Return ONLY valid JSON, no markdown, no backticks:
{
  "concepts": [
    {
      "id": 1,
      "tagline": "MAIN TAGLINE IN ALL CAPS",
      "angle": "The specific creative angle this concept takes (one sentence)",
      "visualDescription": "Exactly what the graphic should look like — imagery, layout, composition (2 sentences)",
      "colorPalette": "e.g. Black + blood red + off-white",
      "typography": "e.g. Ultra-condensed distressed slab serif",
      "mood": "e.g. Aggressive / Sarcastic / Absurdist",
      "targetAudience": "e.g. Self-aware gym rats aged 18-30"
    }
  ]
}`,
      `Generate 5 fully distinct t-shirt design concepts for this idea: "${idea}"`
    );
    setS1(result);
    setS1Loading(false);
  }

  async function runS2() {
    if (selConcept === null || !s1) return;
    const concept = s1.concepts[selConcept];
    setVars(Array(5).fill(null));
    setVLoading(Array(5).fill(true));
    setSelVar(null); setS3(null); setS4(null);
    setActiveVar(0);

    const styleContext = [
      styleAesthetic && `Aesthetic direction: ${styleAesthetic}`,
      styleColor && `Color mood: ${styleColor}`,
      styleTypography && `Typography feel: ${styleTypography}`,
      styleReference && `Brand references: ${styleReference}`,
    ].filter(Boolean).join("\n");

    await Promise.allSettled(
      VAR_STYLES.map(async (style, i) => {
        const result = await callClaude(
          `You are a senior graphic designer and art director with 15+ years in streetwear. You think deeply about design before executing. You understand print techniques, cultural context, and what makes a t-shirt actually sell.

Your job is to act as the creative brain behind a design — filling in gaps the client hasn't thought of, making expert decisions, and producing a prompt so detailed and precise that any image generation AI (Midjourney, DALL-E, Firefly) or human designer can execute it perfectly with zero ambiguity.

For each variation you must:
1. Make expert creative decisions the client hasn't specified (composition, negative space, print placement, specific imagery)
2. Justify the key decisions briefly
3. Write a comprehensive, expert-level image generation prompt

Return ONLY valid JSON:
{
  "variationName": "${style.name}",
  "designRationale": "2-3 sentences: the creative logic and key decisions made",
  "decisions": {
    "composition": "specific layout and composition decision",
    "colorExecution": "exact color usage and how they interact",
    "typographyExecution": "specific font style, weight, treatment",
    "printTechnique": "e.g. 3-color screen print, discharge print, embroidery",
    "keyImagery": "specific visual elements and how they're rendered"
  },
  "imagePrompt": "The full Midjourney/image-gen prompt — minimum 80 words, maximum 150 words. Must include: subject, style, composition, colors, typography treatment, mood, print technique, resolution/quality tags. Written as a direct prompt, not a description."
}`,
          `Design variation: ${style.name} — ${style.desc}

CONCEPT BRIEF:
Tagline: "${concept.tagline}"
Creative angle: ${concept.angle}
Visual direction: ${concept.visualDescription}
Concept color palette: ${concept.colorPalette}
Concept typography: ${concept.typography}
Mood: ${concept.mood}
Target audience: ${concept.targetAudience}

CLIENT STYLE INPUTS:
${styleContext || "None provided — use your expert judgment based on the concept."}

Think like a senior designer. Fill in every gap. Make the decisions the client hasn't made. Then write the definitive prompt for this variation.`
        );
        setVars(prev => { const n = [...prev]; n[i] = result; return n; });
        setVLoading(prev => { const n = [...prev]; n[i] = false; return n; });
      })
    );
  }

  async function runS3() {
    if (selVar === null || !s1) return;
    const concept = s1.concepts[selConcept];
    const variation = vars[selVar];
    setS3Loading(true); setS3(null); setS4(null);

    const result = await callClaude(
      `You are a social media strategist for FuckBoyTees streetwear.
Build a 14-day Instagram + TikTok launch calendar. Use these content types freely: Teaser, Behind the Scenes, Drop Announcement, Lifestyle, Meme, Engagement Bait, Countdown, Hype Reel, Repost.
Return ONLY valid JSON:
{
  "calendar": [
    { "day": 1, "platform": "Instagram", "contentType": "Teaser", "description": "specific description of what to post" }
  ]
}`,
      `Calendar for:
Concept: "${idea}" | Tagline: "${concept.tagline}"
Design style: "${variation?.variationName}" | Audience: "${concept.targetAudience}" | Mood: "${concept.mood}"`
    );
    setS3(result);
    setS3Loading(false);
  }

  async function runS4() {
    if (!s3) return;
    const concept = s1.concepts[selConcept];
    setS4Loading(true); setS4(null);

    const result = await callClaude(
      `You are the social media copywriter for FuckBoyTees — edgy, irreverent, culturally sharp streetwear.
Instagram: punchy storytelling, slightly longer. TikTok: ultra-short, hook-first, native.
Return ONLY valid JSON:
{
  "posts": [
    { "day": 1, "platform": "Instagram", "caption": "full caption", "hashtags": "#tag1 #tag2 #tag3 #tag4 #tag5", "cta": "call to action" }
  ]
}`,
      `Write post copy for every calendar item.
Brand: FuckBoyTees | Concept: "${idea}" | Tagline: "${concept.tagline}" | Mood: "${concept.mood}"
Calendar: ${JSON.stringify(s3.calendar)}`
    );
    setS4(result);
    setS4Loading(false);
  }

  const s1Status = s1Loading ? "running" : s1 ? "done" : idea.trim() ? "ready" : "locked";
  const s2Status = vLoading.some(Boolean) ? "running" : vars.some(Boolean) ? "done" : selConcept !== null ? "ready" : "locked";
  const s3Status = s3Loading ? "running" : s3 ? "done" : selVar !== null ? "ready" : "locked";
  const s4Status = s4Loading ? "running" : s4 ? "done" : s3 ? "ready" : "locked";

  const curVar = vars[activeVar];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        <div className="header">
          <div>
            <div className="logo">FUCKBOY<span>TEES</span></div>
            <div className="tagline">Creative Pipeline Studio</div>
          </div>
          <div className="pip-row">
            {[s1Status, s2Status, s3Status, s4Status].map((st, i) => (
              <div key={i} className={`pip ${st === "running" ? "active" : st === "done" ? "done" : ""}`} />
            ))}
          </div>
        </div>

        <div className="idea-bar">
          <div className="bar-label">// Drop Your Raw Idea — Get 5 Concepts × 5 Designs</div>
          <div className="bar-row">
            <input
              className="idea-input"
              placeholder="e.g. guy who skips leg day every single time..."
              value={idea}
              onChange={e => setIdea(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !anyBusy && runS1()}
            />
            <button className="ignite-btn" onClick={runS1} disabled={anyBusy || !idea.trim()}>
              {s1Loading ? "WORKING..." : "IGNITE"}
            </button>
          </div>
        </div>

        <div className="style-bar">
          <div className="style-field">
            <div className="style-label">// Aesthetic</div>
            <input className="style-input" placeholder="e.g. vintage, grunge, minimal..." value={styleAesthetic} onChange={e => setStyleAesthetic(e.target.value)} />
          </div>
          <div className="style-field">
            <div className="style-label">// Color Mood</div>
            <input className="style-input" placeholder="e.g. black + neon green, muted earthy..." value={styleColor} onChange={e => setStyleColor(e.target.value)} />
          </div>
          <div className="style-field">
            <div className="style-label">// Typography</div>
            <input className="style-input" placeholder="e.g. hand-drawn, stencil, serif..." value={styleTypography} onChange={e => setStyleTypography(e.target.value)} />
          </div>
          <div className="style-field">
            <div className="style-label">// Reference Brands</div>
            <input className="style-input" placeholder="e.g. Supreme, Off-White, Stussy..." value={styleReference} onChange={e => setStyleReference(e.target.value)} />
          </div>
        </div>

        <div className="dashboard">

          {/* ── S1: CONCEPT EXPANSION ── */}
          <div className="panel">
            <div className="bg-num">01</div>
            <div className="panel-head">
              <div>
                <div className="p-title">Concept Expansion</div>
                <div className="p-sub">5 Fully Fleshed Concepts · Click to Select</div>
              </div>
              <Badge status={s1Status} />
            </div>
            <div className="panel-body">
              {s1Loading && <Loader text="Generating 5 Distinct Concepts..." />}
              {!s1 && !s1Loading && <Empty icon="💡" text="Enter an idea above to begin" />}
              {s1 && !s1Loading && (
                <div className="scroll">
                  <div className="concept-cards">
                    {s1.concepts?.map((c, i) => (
                      <div
                        key={i}
                        className={`ccard ${selConcept === i ? "sel" : ""}`}
                        onClick={() => {
                          setSelConcept(i);
                          setVars(Array(5).fill(null));
                          setVLoading(Array(5).fill(false));
                          setSelVar(null); setS3(null); setS4(null);
                        }}
                      >
                        <div className="cc-num">CONCEPT {String(i + 1).padStart(2, "0")}</div>
                        <div className="cc-tl">{c.tagline}</div>
                        <div className="cc-ang">{c.angle}</div>
                        <div className="cc-tags">
                          <span className="tag mood">{c.mood}</span>
                          <span className="tag type">{c.typography}</span>
                          <span className="tag aud">{c.targetAudience}</span>
                        </div>
                        <div className="cc-vis">{c.visualDescription}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {s1 && (
              <div className="panel-foot">
                <button
                  className="btn yellow"
                  onClick={runS2}
                  disabled={selConcept === null || vLoading.some(Boolean)}
                >
                  {vLoading.some(Boolean)
                    ? "GENERATING 5 DESIGNS..."
                    : selConcept !== null
                      ? `→ GENERATE 5 VARIATIONS FOR CONCEPT ${selConcept + 1}`
                      : "← SELECT A CONCEPT FIRST"}
                </button>
              </div>
            )}
          </div>

          {/* ── S2: DESIGN VARIATIONS ── */}
          <div className={`panel ${s2Status === "locked" ? "locked" : ""}`}>
            <div className="bg-num">02</div>
            <div className="panel-head">
              <div>
                <div className="p-title">Design Prompts</div>
                <div className="p-sub">5 Expert Briefs · Midjourney-Ready Prompts</div>
              </div>
              <Badge status={s2Status} />
            </div>
            <div className="panel-body">
              {!vars.some(Boolean) && !vLoading.some(Boolean) && (
                <Empty icon="✏️" text="Select a concept and generate prompts" />
              )}
              {(vars.some(Boolean) || vLoading.some(Boolean)) && (
                <>
                  <div className="vtabs">
                    {VAR_STYLES.map((style, i) => (
                      <div
                        key={i}
                        className={`vtab ${activeVar === i ? "active" : ""} ${vLoading[i] ? "spinning" : ""} ${selVar === i ? "picked" : ""}`}
                        onClick={() => setActiveVar(i)}
                      >
                        {vLoading[i] ? `V${i+1}…` : `V${i+1}`}{selVar === i ? " ✓" : ""}
                      </div>
                    ))}
                  </div>
                  <div className="scroll">
                    {vLoading[activeVar] && <Loader text={`Senior Designer Thinking: ${VAR_STYLES[activeVar].name}...`} />}
                    {curVar && !vLoading[activeVar] && (
                      <>
                        <div className="vname">V{activeVar + 1} — {curVar.variationName}</div>
                        <div className="vbrief">{curVar.designRationale}</div>

                        {curVar.decisions && (
                          <div className="decisions-list">
                            {Object.entries(curVar.decisions).map(([key, val]) => (
                              <div key={key} className="decision-row">
                                <div className="decision-key">{key}</div>
                                <div className="decision-val">{val}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {curVar.imagePrompt && (
                          <PromptBox prompt={curVar.imagePrompt} />
                        )}

                        <button
                          className={`pick-btn ${selVar === activeVar ? "chosen" : ""}`}
                          onClick={() => { setSelVar(activeVar); setS3(null); setS4(null); }}
                        >
                          {selVar === activeVar ? "✓ THIS VARIATION SELECTED — LOCKED IN" : "SELECT THIS VARIATION →"}
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {selVar !== null && (
              <div className="panel-foot">
                <button className="btn red" onClick={runS3} disabled={s3Loading}>
                  {s3Loading ? "BUILDING CALENDAR..." : "→ BUILD SOCIAL CALENDAR"}
                </button>
              </div>
            )}
          </div>

          {/* ── S3: SOCIAL CALENDAR ── */}
          <div className={`panel ${s3Status === "locked" ? "locked" : ""}`}>
            <div className="bg-num">03</div>
            <div className="panel-head">
              <div>
                <div className="p-title">Social Calendar</div>
                <div className="p-sub">14-Day Launch · Instagram + TikTok</div>
              </div>
              <Badge status={s3Status} />
            </div>
            <div className="panel-body">
              {s3Loading && <Loader text="Planning Your 14-Day Launch..." />}
              {!s3 && !s3Loading && <Empty icon="📅" text="Lock in a design variation first" />}
              {s3 && !s3Loading && (
                <div className="scroll">
                  <div className="cal-list">
                    {s3.calendar?.map((item, i) => (
                      <div key={i} className="cal-row">
                        <div className="cal-d">D{item.day}</div>
                        <div style={{flex:1}}>
                          <div className={`plt ${item.platform?.toLowerCase()}`}>{item.platform}</div>
                          <div className="cal-type">{item.contentType}</div>
                          <div className="cal-desc">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {s3 && (
              <div className="panel-foot">
                <button className="btn green" onClick={runS4} disabled={s4Loading}>
                  {s4Loading ? "WRITING COPY..." : "→ WRITE ALL POST CONTENT"}
                </button>
              </div>
            )}
          </div>

          {/* ── S4: POST CONTENT ── */}
          <div className={`panel ${s4Status === "locked" ? "locked" : ""}`}>
            <div className="bg-num">04</div>
            <div className="panel-head">
              <div>
                <div className="p-title">Post Content</div>
                <div className="p-sub">Captions · Hashtags · CTAs · All 14 Posts</div>
              </div>
              <Badge status={s4Status} />
            </div>
            <div className="panel-body">
              {s4Loading && <Loader text="Writing Every Caption..." />}
              {!s4 && !s4Loading && <Empty icon="✍️" text="Build the calendar first" />}
              {s4 && !s4Loading && (
                <div className="scroll">
                  {s4.posts?.map((post, i) => (
                    <div key={i} className="post-block">
                      <div className="post-top">
                        <div className={`plt ${post.platform?.toLowerCase()}`}>{post.platform}</div>
                        <div className="post-day">DAY {post.day}</div>
                      </div>
                      <div className="caption">{post.caption}</div>
                      <div className="hashtags">{post.hashtags}</div>
                      <div className="cta-line">↗ {post.cta}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {s4 && (
              <div className="panel-foot">
                <button className="btn grey" onClick={() => {
                  const concept = s1?.concepts?.[selConcept];
                  const variation = vars[selVar];
                  const payload = { idea, concept, variation: { name: variation?.variationName, brief: variation?.brief }, calendar: s3, posts: s4 };
                  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = `fbt-campaign-${Date.now()}.json`;
                  a.click();
                }}>↓ EXPORT FULL CAMPAIGN</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
