/* =========================================
   SK STORES - COMPLETE JAVASCRIPT
   50 stationery products
   Each product has its OWN cartoon drawing
   (scissors = scissors, glue stick = glue stick ...)
   ========================================= */

// PRODUCT LIST: [name, price, category]
const productData = [
    ["Notebooks", 40, "Paper & Filing"],
    ["A4 Paper", 100, "Paper & Filing"],
    ["Sticky Notes", 30, "Paper & Filing"],
    ["Envelopes", 5, "Paper & Filing"],
    ["Ballpoint Pens", 10, "Writing"],
    ["Gel Pens", 15, "Writing"],
    ["Pencils", 5, "Writing"],
    ["Mechanical Pencils", 20, "Writing"],
    ["Lead Refills", 10, "Writing"],
    ["Highlighters", 25, "Writing"],
    ["Permanent Markers", 30, "Writing"],
    ["Whiteboard Markers", 25, "Writing"],
    ["Sketch Pens", 50, "Art Supplies"],
    ["Colored Pencils", 60, "Art Supplies"],
    ["Crayons", 30, "Art Supplies"],
    ["Oil Pastels", 60, "Art Supplies"],
    ["Watercolors", 60, "Art Supplies"],
    ["Paintbrushes", 15, "Art Supplies"],
    ["Erasers", 5, "Accessories"],
    ["Sharpeners", 5, "Accessories"],
    ["Rulers", 10, "Geometry"],
    ["Geometry Box", 80, "Geometry"],
    ["Compass", 20, "Geometry"],
    ["Protractor", 10, "Geometry"],
    ["Stapler", 50, "Office Supplies"],
    ["Staple Pins", 10, "Office Supplies"],
    ["Paper Clips", 10, "Office Supplies"],
    ["Binder Clips", 15, "Office Supplies"],
    ["Push Pins", 10, "Office Supplies"],
    ["Rubber Bands", 10, "Office Supplies"],
    ["Glue Sticks", 20, "Adhesives & Tools"],
    ["Liquid Glue", 20, "Adhesives & Tools"],
    ["Cellophane Tape", 15, "Adhesives & Tools"],
    ["Masking Tape", 20, "Adhesives & Tools"],
    ["Double-sided Tape", 25, "Adhesives & Tools"],
    ["Tape Dispenser", 60, "Adhesives & Tools"],
    ["Scissors", 30, "Adhesives & Tools"],
    ["Paper Cutter", 20, "Adhesives & Tools"],
    ["Hole Punch", 60, "Office Supplies"],
    ["Correction Tape", 25, "Writing"],
    ["Correction Fluid", 25, "Writing"],
    ["Document Folders", 25, "Paper & Filing"],
    ["Ring Binders", 60, "Paper & Filing"],
    ["File Dividers", 20, "Paper & Filing"],
    ["Index Tabs", 15, "Paper & Filing"],
    ["Name Labels", 10, "Paper & Filing"],
    ["Pencil Pouch", 50, "Accessories"],
    ["Calculator", 150, "Electronics"],
    ["Chart Paper", 10, "Paper & Filing"],
    ["Clipboards", 50, "Office Supplies"]
];

// ESCAPE HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

/* =========================================
   CARTOON DRAWING HELPERS
   Every drawing is made on a 200 x 200 canvas
   ========================================= */

// Dark cartoon outline
const O = 'stroke="#2b2b3a" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';

// Thick outlined line
function line(d, color, w = 10) {
    return `<path d="${d}" fill="none" stroke="#2b2b3a" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/>` +
           `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// Outlined ring
function ring(cx, cy, r, color, w = 8) {
    const d = `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
    return line(d, color, w);
}

// Pen (drawn diagonally)
function pen(body, cap, tip, extra = "") {
    return `<g transform="rotate(40 100 100)">
        <path d="M88 125H112L100 172Z" fill="#f4d9a8" ${O}/>
        <path d="M94 156L100 172L106 156Z" fill="${tip}" ${O}/>
        <rect x="88" y="22" width="24" height="108" rx="10" fill="${body}" ${O}/>
        <rect x="88" y="22" width="24" height="28" rx="10" fill="${cap}" ${O}/>
        <path d="M112 34H121V76" fill="none" ${O}/>
        ${extra}
    </g>`;
}

// Upright pencil (used for fans of pencils)
function pencilUp(color, rotation) {
    return `<g transform="rotate(${rotation} 100 175)">
        <rect x="90" y="40" width="20" height="95" fill="${color}" ${O}/>
        <path d="M90 135H110L100 168Z" fill="#f4d9a8" ${O}/>
        <path d="M96 156L100 168L104 156Z" fill="#2b2b3a"/>
        <rect x="90" y="28" width="20" height="14" rx="4" fill="#f9a8d4" ${O}/>
    </g>`;
}

// Tape roll
function tapeRoll(color, ringColor, tail) {
    return `<path d="M120 138L188 152L182 172L112 154Z" fill="${tail}" ${O}/>
        <circle cx="90" cy="100" r="58" fill="${color}" ${O}/>
        <circle cx="90" cy="100" r="30" fill="${ringColor}" ${O}/>
        <circle cx="90" cy="100" r="18" fill="#ffffff" ${O}/>`;
}

// Calculator buttons
const calcButtons = [0, 1, 2, 3].map(row =>
    [0, 1, 2, 3].map(col =>
        `<rect x="${64 + col * 21}" y="${80 + row * 24}" width="16" height="17" rx="4" fill="${col === 3 ? "#fb923c" : "#e2e8f0"}"/>`
    ).join("")
).join("");

// Staples in a row
const stapleRow = [40, 65, 90, 115, 140].map(x =>
    `<path d="M${x} 84V108H${x + 14}V84" fill="none" stroke="#2b2b3a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M${x} 84V108H${x + 14}V84" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
).join("");

/* =========================================
   ONE DRAWING FOR EACH PRODUCT
   ========================================= */
const icons = {

    "Notebooks": `
        <rect x="55" y="25" width="90" height="150" rx="10" fill="#4f8df7" ${O}/>
        <rect x="72" y="50" width="58" height="36" rx="5" fill="#ffffff" ${O}/>
        <path d="M80 62H120M80 74H110" fill="none" ${O}/>
        <g fill="#ffffff" ${O}>
            <circle cx="55" cy="55" r="7"/><circle cx="55" cy="85" r="7"/>
            <circle cx="55" cy="115" r="7"/><circle cx="55" cy="145" r="7"/>
        </g>`,

    "A4 Paper": `
        <path d="M55 30H135L165 60V178H55Z" fill="#e5e7eb" ${O}/>
        <path d="M45 20H125L155 50V168H45Z" fill="#ffffff" ${O}/>
        <path d="M125 20V50H155" fill="#e5e7eb" ${O}/>
        <path d="M62 80H138M62 100H138M62 120H138M62 140H110" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <text x="75" y="62" font-size="24" font-weight="700" fill="#3b82f6" font-family="Arial, sans-serif">A4</text>`,

    "Sticky Notes": `
        <rect x="58" y="52" width="110" height="110" fill="#facc15" ${O}/>
        <rect x="45" y="40" width="110" height="110" fill="#fde047" ${O}/>
        <rect x="45" y="40" width="110" height="20" fill="#facc15" ${O}/>
        <path d="M62 85H138M62 105H138M62 125H105" fill="none" stroke="#a16207" stroke-width="4" stroke-linecap="round"/>
        <path d="M155 150L125 150L155 120Z" fill="#fef9c3" ${O}/>`,

    "Envelopes": `
        <rect x="30" y="55" width="140" height="95" rx="8" fill="#ffffff" ${O}/>
        <path d="M30 150L85 100M170 150L115 100" fill="none" ${O}/>
        <path d="M30 62L100 112L170 62" fill="#e0f2fe" ${O}/>
        <circle cx="100" cy="112" r="9" fill="#ef4444" ${O}/>`,

    "Ballpoint Pens": pen("#3b82f6", "#1e3a8a", "#1e3a8a"),

    "Gel Pens": pen("#ec4899", "#9d174d", "#ec4899",
        `<rect x="88" y="95" width="24" height="32" rx="6" fill="#fbcfe8" ${O}/>
         <path d="M94 105H106M94 113H106" fill="none" ${O}/>`),

    "Pencils": `<g transform="rotate(40 100 100)">
        <rect x="88" y="45" width="24" height="95" fill="#fde047" ${O}/>
        <path d="M94 45V140M106 45V140" fill="none" stroke="#eab308" stroke-width="3"/>
        <path d="M88 140H112L100 175Z" fill="#f4d9a8" ${O}/>
        <path d="M95 160L100 175L105 160Z" fill="#2b2b3a"/>
        <rect x="88" y="33" width="24" height="14" fill="#cbd5e1" ${O}/>
        <rect x="88" y="14" width="24" height="21" rx="6" fill="#f9a8d4" ${O}/>
    </g>`,

    "Mechanical Pencils": `<g transform="rotate(40 100 100)">
        <rect x="90" y="25" width="20" height="95" rx="8" fill="#64748b" ${O}/>
        <rect x="90" y="98" width="20" height="24" fill="#1e293b" ${O}/>
        <path d="M94 104H106M94 110H106M94 116H106" fill="none" stroke="#94a3b8" stroke-width="2"/>
        <path d="M90 122H110L104 150H96Z" fill="#cbd5e1" ${O}/>
        <path d="M100 150V168" fill="none" stroke="#2b2b3a" stroke-width="3" stroke-linecap="round"/>
        <path d="M110 40H119V85" fill="none" ${O}/>
        <rect x="92" y="10" width="16" height="18" rx="4" fill="#ef4444" ${O}/>
    </g>`,

    "Lead Refills": `
        <rect x="35" y="80" width="105" height="40" rx="20" fill="#e0f2fe" ${O}/>
        <rect x="132" y="76" width="30" height="48" rx="8" fill="#ef4444" ${O}/>
        <path d="M55 92H125M55 108H125" fill="none" stroke="#2b2b3a" stroke-width="4" stroke-linecap="round"/>
        <path d="M50 148L120 160M65 168L135 150" fill="none" stroke="#2b2b3a" stroke-width="4" stroke-linecap="round"/>`,

    "Highlighters": `<g transform="rotate(35 100 100)">
        <path d="M80 128H120L114 160H86Z" fill="#facc15" ${O}/>
        <path d="M86 160H114L108 176H92Z" fill="#fde047" ${O}/>
        <rect x="76" y="62" width="48" height="68" rx="8" fill="#fde047" ${O}/>
        <rect x="76" y="20" width="48" height="46" rx="8" fill="#84cc16" ${O}/>
        <rect x="88" y="82" width="24" height="28" rx="4" fill="#ffffff" ${O}/>
    </g>`,

    "Permanent Markers": `<g transform="rotate(40 100 100)">
        <path d="M91 138H109L100 168Z" fill="#111827" ${O}/>
        <rect x="84" y="55" width="32" height="86" rx="6" fill="#1f2937" ${O}/>
        <rect x="84" y="85" width="32" height="26" fill="#ef4444" ${O}/>
        <rect x="84" y="18" width="32" height="42" rx="8" fill="#111827" ${O}/>
        <path d="M116 30H124V62" fill="none" ${O}/>
    </g>`,

    "Whiteboard Markers": `
        <rect x="25" y="25" width="150" height="95" rx="8" fill="#ffffff" ${O}/>
        <path d="M45 85Q65 45 85 80T125 70T155 55" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>
        <path d="M50 142L30 152L50 162Z" fill="#22c55e" ${O}/>
        <rect x="50" y="138" width="75" height="28" rx="8" fill="#ffffff" ${O}/>
        <rect x="118" y="138" width="45" height="28" rx="8" fill="#22c55e" ${O}/>`,

    "Sketch Pens": [[42, "#ef4444"], [88, "#3b82f6"], [134, "#22c55e"]].map(([x, c]) => `
        <path d="M${x + 4} 62L${x + 12} 30L${x + 20} 62Z" fill="${c}" ${O}/>
        <rect x="${x}" y="60" width="24" height="95" rx="6" fill="#ffffff" ${O}/>
        <rect x="${x}" y="95" width="24" height="30" fill="${c}" ${O}/>
        <rect x="${x - 2}" y="148" width="28" height="22" rx="6" fill="${c}" ${O}/>`).join(""),

    "Colored Pencils": pencilUp("#ef4444", -22) + pencilUp("#22c55e", 0) + pencilUp("#3b82f6", 22),

    "Crayons": [[35, "#ef4444"], [85, "#facc15"], [135, "#3b82f6"]].map(([x, c]) => `
        <path d="M${x} 70L${x + 12} 38L${x + 30} 70Z" fill="${c}" ${O}/>
        <rect x="${x}" y="68" width="30" height="100" rx="4" fill="${c}" ${O}/>
        <rect x="${x}" y="95" width="30" height="45" fill="#fef3c7" ${O}/>`).join(""),

    "Oil Pastels": [[42, "#ef4444"], [68, "#facc15"], [94, "#22c55e"], [120, "#3b82f6"]].map(([x, c]) => `
        <rect x="${x}" y="45" width="22" height="70" rx="5" fill="${c}" ${O}/>`).join("") + `
        <rect x="30" y="95" width="140" height="72" rx="10" fill="#4338ca" ${O}/>
        <rect x="45" y="115" width="110" height="30" rx="6" fill="#ffffff" ${O}/>
        <path d="M55 130H120" fill="none" stroke="#4338ca" stroke-width="4" stroke-linecap="round"/>`,

    "Watercolors": `
        <path d="M30 100Q25 40 90 35Q170 35 175 100Q178 150 120 160Q100 150 80 165Q35 160 30 100Z" fill="#f1c27d" ${O}/>
        <circle cx="62" cy="70" r="14" fill="#ef4444" ${O}/>
        <circle cx="100" cy="58" r="14" fill="#facc15" ${O}/>
        <circle cx="140" cy="70" r="14" fill="#22c55e" ${O}/>
        <circle cx="150" cy="108" r="14" fill="#3b82f6" ${O}/>
        <circle cx="60" cy="110" r="14" fill="#a855f7" ${O}/>
        <ellipse cx="105" cy="125" rx="16" ry="12" fill="#ffffff" ${O}/>`,

    "Paintbrushes": `<g transform="rotate(40 100 100)">
        <path d="M89 135H111Q114 165 100 180Q86 165 89 135Z" fill="#3b82f6" ${O}/>
        <rect x="88" y="108" width="24" height="30" fill="#cbd5e1" ${O}/>
        <path d="M88 118H112M88 128H112" fill="none" ${O}/>
        <path d="M92 108L96 20Q100 14 104 20L108 108Z" fill="#f97316" ${O}/>
    </g>`,

    "Erasers": `<g transform="rotate(-20 100 100)">
        <rect x="45" y="65" width="110" height="70" rx="14" fill="#ff9fb6" ${O}/>
        <path d="M100 65H140Q155 65 155 80V120Q155 135 140 135H100Z" fill="#3b82f6" ${O}/>
        <path d="M60 85H88M60 100H80" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    </g>`,

    "Sharpeners": `
        <path d="M38 132V82Q38 66 54 66H150Q166 66 166 82V132Q166 148 150 148H54Q38 148 38 132Z" fill="#fb923c" ${O}/>
        <circle cx="75" cy="107" r="15" fill="#2b2b3a"/>
        <rect x="108" y="92" width="45" height="8" rx="3" fill="#cbd5e1" ${O}/>
        <path d="M95 168Q115 150 135 168Q155 180 160 160" fill="none" stroke="#f4d9a8" stroke-width="8" stroke-linecap="round"/>`,

    "Rulers": `<g transform="rotate(-30 100 100)">
        <rect x="20" y="72" width="160" height="56" rx="6" fill="#ffd966" ${O}/>
        <path d="M40 72V96M60 72V90M80 72V96M100 72V90M120 72V96M140 72V90M160 72V96" fill="none" ${O}/>
        <path d="M40 128V112M80 128V112M120 128V112M160 128V112" fill="none" ${O}/>
    </g>`,

    "Geometry Box": `
        <path d="M60 95V30L125 95Z" fill="#a5d8ff" ${O}/>
        <path d="M75 85V58L102 85Z" fill="#e0f2fe" ${O}/>
        <path d="M125 95A55 55 0 0 1 170 95Z" fill="#fde68a" ${O}/>
        <rect x="28" y="92" width="144" height="82" rx="10" fill="#14b8a6" ${O}/>
        <path d="M28 118H172" fill="none" ${O}/>
        <rect x="75" y="132" width="50" height="28" rx="5" fill="#ffffff" ${O}/>
        <path d="M84 142H116M84 152H106" fill="none" stroke="#14b8a6" stroke-width="4" stroke-linecap="round"/>`,

    "Compass": `
        <path d="M96 40H104L68 158H60Z" fill="#cbd5e1" ${O}/>
        <path d="M60 158L64 176L68 158Z" fill="#475569" ${O}/>
        <path d="M96 40H104L140 158H132Z" fill="#ffb454" ${O}/>
        <path d="M132 158L136 176L140 158Z" fill="#2b2b3a" ${O}/>
        <path d="M84 100H116" fill="none" ${O}/>
        <rect x="94" y="14" width="12" height="20" rx="4" fill="#ef4444" ${O}/>
        <circle cx="100" cy="42" r="12" fill="#ef4444" ${O}/>`,

    "Protractor": `
        <path d="M22 150A78 78 0 0 1 178 150Z" fill="#bfe3ff" ${O}/>
        <path d="M60 150A40 40 0 0 1 140 150Z" fill="#ffffff" ${O}/>
        <path d="M165 112L152 118M137 77L130 90M100 68V82M63 77L70 90M35 112L48 118" fill="none" ${O}/>
        <circle cx="100" cy="150" r="5" fill="#2b2b3a"/>`,

    "Stapler": `
        <rect x="28" y="130" width="144" height="26" rx="8" fill="#334155" ${O}/>
        <path d="M30 130V104Q30 82 56 80L168 92V130Z" fill="#ef4444" ${O}/>
        <path d="M45 104Q60 92 80 96" fill="none" stroke="#fca5a5" stroke-width="5" stroke-linecap="round"/>
        <rect x="140" y="116" width="26" height="8" rx="3" fill="#cbd5e1" ${O}/>`,

    "Staple Pins": `
        <rect x="28" y="70" width="144" height="16" rx="4" fill="#e2e8f0" ${O}/>` + stapleRow + `
        <rect x="45" y="128" width="110" height="42" rx="8" fill="#fb923c" ${O}/>
        <path d="M65 149H135" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`,

    "Paper Clips": line("M60 150V58Q60 38 82 38Q104 38 104 58V132Q104 148 90 148Q76 148 76 132V76", "#94a3b8", 6) +
                   line("M112 160V70Q112 52 130 52Q148 52 148 70V138Q148 150 138 150Q128 150 128 138V88", "#ef4444", 6),

    "Binder Clips": line("M68 88Q48 40 82 30", "#cbd5e1", 6) +
                    line("M132 88Q152 40 118 30", "#cbd5e1", 6) + `
        <path d="M40 88H160L138 160H62Z" fill="#1f2937" ${O}/>
        <path d="M62 160H138" fill="none" stroke="#cbd5e1" stroke-width="3"/>`,

    "Push Pins": `
        <path d="M95 128H105L100 178Z" fill="#cbd5e1" ${O}/>
        <rect x="68" y="112" width="64" height="16" rx="8" fill="#b91c1c" ${O}/>
        <rect x="86" y="82" width="28" height="32" fill="#f87171" ${O}/>
        <ellipse cx="100" cy="62" rx="36" ry="28" fill="#ef4444" ${O}/>
        <path d="M80 54Q90 42 104 46" fill="none" stroke="#fecaca" stroke-width="5" stroke-linecap="round"/>`,

    "Rubber Bands": `
        <ellipse cx="82" cy="100" rx="52" ry="34" fill="none" stroke="#2b2b3a" stroke-width="18"/>
        <ellipse cx="82" cy="100" rx="52" ry="34" fill="none" stroke="#f59e0b" stroke-width="10"/>
        <ellipse cx="118" cy="100" rx="52" ry="34" fill="none" stroke="#2b2b3a" stroke-width="18"/>
        <ellipse cx="118" cy="100" rx="52" ry="34" fill="none" stroke="#34d399" stroke-width="10"/>`,

    "Glue Sticks": `
        <rect x="72" y="30" width="56" height="52" rx="10" fill="#3b82f6" ${O}/>
        <rect x="80" y="76" width="40" height="16" fill="#e5e7eb" ${O}/>
        <rect x="72" y="88" width="56" height="86" rx="8" fill="#ffffff" ${O}/>
        <rect x="72" y="112" width="56" height="40" fill="#fb923c" ${O}/>
        <path d="M84 132H116" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`,

    "Liquid Glue": `
        <path d="M92 62L100 26L108 62Z" fill="#fb923c" ${O}/>
        <rect x="88" y="58" width="24" height="26" fill="#ffffff" ${O}/>
        <path d="M70 108Q70 88 88 82H112Q130 88 130 108V160Q130 176 114 176H86Q70 176 70 160Z" fill="#ffffff" ${O}/>
        <rect x="70" y="112" width="60" height="40" fill="#3b82f6" ${O}/>
        <path d="M82 132H118" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`,

    "Cellophane Tape": tapeRoll("#fde68a", "#fef3c7", "#fde68a"),

    "Masking Tape": tapeRoll("#e8cf9c", "#c9a96a", "#e8cf9c"),

    "Double-sided Tape": tapeRoll("#bfe3ff", "#93c5fd", "#bfe3ff") + `
        <path d="M122 146L184 160" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>`,

    "Tape Dispenser": `
        <rect x="28" y="136" width="144" height="26" rx="10" fill="#ef4444" ${O}/>
        <circle cx="85" cy="98" r="48" fill="#ef4444" ${O}/>
        <circle cx="85" cy="98" r="34" fill="#fde68a" ${O}/>
        <circle cx="85" cy="98" r="12" fill="#ffffff" ${O}/>
        <path d="M120 120H175V138H120Z" fill="#b91c1c" ${O}/>
        <path d="M175 138L168 130L161 138L154 130L147 138L140 130" fill="none" ${O}/>`,

    "Scissors": line("M100 100L82 128", "#ef4444", 10) +
                line("M100 100L118 128", "#ef4444", 10) +
                ring(68, 148, 22, "#ef4444", 9) +
                ring(132, 148, 22, "#ef4444", 9) + `
        <path d="M100 100L76 28L92 22L112 94Z" fill="#cbd5e1" ${O}/>
        <path d="M100 100L124 28L108 22L88 94Z" fill="#e2e8f0" ${O}/>
        <circle cx="100" cy="100" r="7" fill="#2b2b3a"/>`,

    "Paper Cutter": `
        <rect x="22" y="110" width="156" height="48" rx="6" fill="#f5d7a1" ${O}/>
        <path d="M50 110V158M80 110V158M110 110V158M140 110V158" fill="none" stroke="#c9a96a" stroke-width="3"/>
        <path d="M40 112L172 82L174 98L42 122Z" fill="#cbd5e1" ${O}/>` +
        line("M40 114L22 62", "#ef4444", 10) + `
        <circle cx="40" cy="114" r="7" fill="#475569" ${O}/>`,

    "Hole Punch": `
        <rect x="30" y="118" width="140" height="42" rx="8" fill="#94a3b8" ${O}/>
        <path d="M34 118V92Q34 62 70 62H172V118Z" fill="#3b82f6" ${O}/>
        <path d="M48 96Q52 78 74 76" fill="none" stroke="#93c5fd" stroke-width="5" stroke-linecap="round"/>
        <circle cx="62" cy="140" r="8" fill="#ffffff" ${O}/>
        <circle cx="140" cy="140" r="8" fill="#ffffff" ${O}/>
        <circle cx="90" cy="176" r="5" fill="#ffffff" ${O}/>`,

    "Correction Tape": `
        <rect x="42" y="64" width="112" height="88" rx="34" fill="#a78bfa" ${O}/>
        <circle cx="92" cy="108" r="26" fill="#ede9fe" ${O}/>
        <circle cx="92" cy="108" r="9" fill="#ffffff" ${O}/>
        <rect x="150" y="92" width="26" height="32" rx="6" fill="#ffffff" ${O}/>`,

    "Correction Fluid": `
        <rect x="82" y="26" width="36" height="52" rx="8" fill="#ef4444" ${O}/>
        <rect x="88" y="74" width="24" height="16" fill="#ffffff" ${O}/>
        <path d="M66 112Q66 92 86 90H114Q134 92 134 112V158Q134 176 116 176H84Q66 176 66 158Z" fill="#ffffff" ${O}/>
        <rect x="66" y="116" width="68" height="38" fill="#3b82f6" ${O}/>
        <path d="M80 135H120" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`,

    "Document Folders": `
        <path d="M28 62Q28 48 42 48H85L100 66H165Q176 66 176 78V150Q176 162 165 162H40Q28 162 28 150Z" fill="#fbbf24" ${O}/>
        <rect x="45" y="58" width="100" height="50" fill="#ffffff" ${O}/>
        <path d="M28 92H176V150Q176 162 165 162H40Q28 162 28 150Z" fill="#fcd34d" ${O}/>`,

    "Ring Binders": `
        <rect x="52" y="25" width="100" height="150" rx="10" fill="#7c3aed" ${O}/>
        <rect x="70" y="52" width="64" height="44" rx="4" fill="#ffffff" ${O}/>
        <path d="M80 68H124M80 82H112" fill="none" ${O}/>` +
        ring(52, 60, 11, "#cbd5e1", 5) + ring(52, 100, 11, "#cbd5e1", 5) + ring(52, 140, 11, "#cbd5e1", 5),

    "File Dividers": `
        <rect x="38" y="30" width="112" height="140" rx="4" fill="#ffffff" ${O}/>
        <rect x="146" y="38" width="28" height="30" rx="5" fill="#ef4444" ${O}/>
        <rect x="146" y="78" width="28" height="30" rx="5" fill="#facc15" ${O}/>
        <rect x="146" y="118" width="28" height="30" rx="5" fill="#22c55e" ${O}/>
        <path d="M55 70H128M55 90H128M55 110H128M55 130H100" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>`,

    "Index Tabs": `
        <rect x="35" y="65" width="130" height="105" rx="4" fill="#ffffff" ${O}/>
        <rect x="42" y="30" width="32" height="40" rx="5" fill="#ef4444" ${O}/>
        <rect x="84" y="30" width="32" height="40" rx="5" fill="#facc15" ${O}/>
        <rect x="126" y="30" width="32" height="40" rx="5" fill="#22c55e" ${O}/>
        <path d="M55 105H145M55 125H145M55 145H110" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>`,

    "Name Labels": `
        <rect x="30" y="40" width="140" height="120" rx="12" fill="#ffffff" ${O}/>
        <path d="M30 78V52Q30 40 42 40H158Q170 40 170 52V78Z" fill="#ef4444" ${O}/>
        <text x="100" y="62" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif">HELLO</text>
        <text x="100" y="95" font-size="12" font-weight="700" fill="#ef4444" text-anchor="middle" font-family="Arial, sans-serif">my name is</text>
        <path d="M50 135H150" fill="none" ${O}/>`,

    "Pencil Pouch": `
        <rect x="62" y="28" width="16" height="60" rx="4" fill="#fde047" ${O}/>
        <rect x="92" y="20" width="16" height="68" rx="4" fill="#3b82f6" ${O}/>
        <rect x="122" y="32" width="16" height="56" rx="4" fill="#22c55e" ${O}/>
        <path d="M28 108Q28 86 50 86H150Q172 86 172 108V148Q172 164 156 164H44Q28 164 28 148Z" fill="#ec4899" ${O}/>
        <path d="M30 104H170" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="6 5"/>
        <circle cx="150" cy="104" r="7" fill="#fde047" ${O}/>`,

    "Calculator": `
        <rect x="50" y="18" width="100" height="164" rx="12" fill="#334155" ${O}/>
        <rect x="62" y="32" width="76" height="32" rx="5" fill="#a7f3d0" ${O}/>
        <path d="M120 54H130" fill="none" stroke="#065f46" stroke-width="4" stroke-linecap="round"/>` + calcButtons,

    "Chart Paper": `
        <rect x="30" y="18" width="140" height="106" rx="4" fill="#ffffff" ${O}/>
        <rect x="52" y="78" width="20" height="32" fill="#3b82f6" ${O}/>
        <rect x="84" y="56" width="20" height="54" fill="#22c55e" ${O}/>
        <rect x="116" y="40" width="20" height="70" fill="#f97316" ${O}/>
        <path d="M44 112H156" fill="none" ${O}/>` +
        line("M70 124L48 182", "#a16207", 7) +
        line("M130 124L152 182", "#a16207", 7) +
        line("M100 124V182", "#a16207", 7),

    "Clipboards": `
        <rect x="45" y="25" width="110" height="150" rx="10" fill="#c68642" ${O}/>
        <rect x="58" y="50" width="84" height="112" fill="#ffffff" ${O}/>
        <path d="M70 80H130M70 100H130M70 120H130M70 140H105" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <rect x="76" y="14" width="48" height="34" rx="7" fill="#cbd5e1" ${O}/>
        <circle cx="100" cy="24" r="5" fill="#475569"/>`
};

// Used only if a drawing is ever missing
const genericIcon = `
    <rect x="50" y="50" width="100" height="100" rx="14" fill="#cbd5e1" ${O}/>
    <path d="M75 100H125M100 75V125" fill="none" ${O}/>`;

// Soft card background colours
const backgrounds = [
    ["#fff7fb", "#e8f1ff"],
    ["#f0fdf4", "#e0f2fe"],
    ["#fffbeb", "#ffe4e6"],
    ["#f5f3ff", "#e0f2fe"]
];

// CREATE PRODUCT ILLUSTRATION (cartoon style)
function makeProductImage(product) {

    const name = escapeHTML(product.name);
    const art = icons[product.name] || genericIcon;
    const colors = backgrounds[product.id % backgrounds.length];

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="600" height="450"
     viewBox="0 0 600 450">

    <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${colors[0]}"/>
            <stop offset="100%" stop-color="${colors[1]}"/>
        </linearGradient>

        <filter id="shadow">
            <feDropShadow dx="0" dy="10" stdDeviation="10"
                          flood-color="#344054" flood-opacity=".16"/>
        </filter>
    </defs>

    <rect width="600" height="450" rx="28" fill="url(#bg)"/>

    <g filter="url(#shadow)">
        <rect x="165" y="42" width="270" height="276" rx="30" fill="#ffffff"/>
    </g>

    <g transform="translate(170 50) scale(1.3)">
        ${art}
    </g>

    <path d="M90 342H510" stroke="#d7deea" stroke-width="2"/>

    <text x="300" y="386" text-anchor="middle"
          font-size="27" font-weight="700" fill="#24324a"
          font-family="Arial, sans-serif">${name}</text>

    <text x="300" y="416" text-anchor="middle"
          font-size="15" letter-spacing="3" fill="#7b879b"
          font-family="Arial, sans-serif">SK STORES</text>

</svg>`;

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

// CREATE PRODUCTS
const products = productData.map((item, index) => {

    const product = {
        id: index + 1,
        name: item[0],
        price: item[1],
        category: item[2],
        image: null
    };

    product.image = makeProductImage(product);

    return product;
});

// CART VARIABLES
let cart = [];
let currentCategory = "All";

// GET FILTERED PRODUCTS
function getFilteredProducts() {

    const searchInput = document.getElementById("search-input");

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    return products.filter(product => {

        const matchesName =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            currentCategory === "All" ||
            product.category === currentCategory;

        return matchesName && matchesCategory;
    });
}

// DISPLAY PRODUCTS
function displayProducts(items) {

    const container = document.getElementById("product-list");

    if (!container) {
        console.error("Missing product-list element.");
        return;
    }

    if (items.length === 0) {
        container.innerHTML =
            "<p class='no-products'>No products found.</p>";
        return;
    }

    container.innerHTML = items.map(product => `

        <article class="product-card">

            <img
                src="${product.image}"
                alt="${escapeHTML(product.name)} illustration"
                class="product-image"
                loading="lazy"
            >

            <h3>${escapeHTML(product.name)}</h3>

            <p class="product-price">
                ₹${product.price}
            </p>

            <button
                type="button"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </article>

    `).join("");
}

// SEARCH PRODUCTS
function searchProducts() {
    sortProducts();
}

// FILTER CATEGORY
function filterCategory(category) {
    currentCategory = category;
    sortProducts();
}

// APPLY FILTERS
function applyFilters() {
    sortProducts();
}

// SORT PRODUCTS
function sortProducts() {

    const sortElement = document.getElementById("sort-products");

    const sortValue = sortElement ? sortElement.value : "default";

    const filtered = getFilteredProducts();

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    else if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    else if (sortValue === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayProducts(filtered);
}

// ADD TO CART
function addToCart(id) {

    const product = products.find(item => item.id === Number(id));

    if (!product) return;

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    }

    else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// CHANGE QUANTITY
function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === Number(id));

    if (!item) return;

    item.quantity += Number(amount);

    if (item.quantity <= 0) {
        removeFromCart(id);
    }

    else {
        updateCart();
    }
}

// REMOVE FROM CART
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== Number(id));

    updateCart();
}

// UPDATE CART
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartItems) {

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
        }

        else {

            cartItems.innerHTML = cart.map(item => `

                <div class="cart-item">

                    <div>
                        <h4>${escapeHTML(item.name)}</h4>

                        <p>₹${item.price} × ${item.quantity}</p>

                        <p>Subtotal: ₹${item.price * item.quantity}</p>
                    </div>

                    <div class="cart-item-actions">

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                        <button
                            type="button"
                            onclick="removeFromCart(${item.id})">
                            ✕
                        </button>

                    </div>

                </div>

            `).join("");
        }
    }

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = totalPrice;
    }
}

// OPEN OR CLOSE CART
function toggleCart() {

    const panel = document.getElementById("cart-panel");

    if (panel) {
        panel.classList.toggle("active");
    }
}

// CHECKOUT
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (confirm(`Your total is ₹${total}. Continue with demo checkout?`)) {

        alert("Thank you for shopping at SK STORES!");

        cart = [];

        updateCart();

        const panel = document.getElementById("cart-panel");

        if (panel) {
            panel.classList.remove("active");
        }
    }
}

// CONTACT FORM
function setupContactForm() {

    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Thank you! Your message has been received in this demo.");

        this.reset();
    });
}

// INITIALIZE WEBSITE
function initializeSKStores() {

    displayProducts(products);

    updateCart();

    setupContactForm();
}

// LOAD WEBSITE
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initializeSKStores);
}

else {

    initializeSKStores();
}