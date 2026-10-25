
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const sections = [
  "Personal Details",
  "Menstrual Health",
  "Symptoms & History",
  "Eye Image",
  "Results",
  "Appointment",
];

const indianPlaces = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
].sort((a, b) => a.localeCompare(b));

const initialForm = {
  age: "",
  pregnancy: "",
  diet: "",
  diabetes: "",
  periodStatus: "",
  cycleRegularity: "",
  periodDuration: "",
  bleeding: "",
  padFrequency: "",
  bleedingBetweenPeriods: "",
  fatigue: "",
  dizziness: "",
  breathlessness: "",
  headaches: "",
  paleness: "",
  palpitations: "",
  symptomDuration: "",
  previousAnemia: "",
  recentHb: "",
  medicalHistory: "",
};

const clinicians = [
  { id: "a", name: "Dr. Asha Sharma", specialty: "Gynaecology" },
  { id: "b", name: "Dr. Meera Kapoor", specialty: "Women's Health" },
];
const slots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

function VoiceInput({ onTranscript, options = [] }) {
  const [locale, setLocale] = useState("en-IN");
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessage("Voice input is not supported in this browser. Please type or choose an answer.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = locale;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setMessage("");
    setTranscript("");
    setListening(true);
    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript?.trim() || "";
      setTranscript(text);
      if (!options.length) {
        onTranscript(text);
        setMessage("Transcription added. Please review it before continuing.");
        return;
      }
      const normalise = (value) => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
      const spoken = normalise(text);
      const exact = options.find((option) => normalise(option) === spoken);
      const partial = options.find((option) => {
        const candidate = normalise(option);
        return spoken && (candidate.includes(spoken) || spoken.includes(candidate));
      });
      const match = exact || partial;
      if (match) {
        onTranscript(match);
        setMessage(`Matched “${match}”. Please check the selected answer.`);
      } else {
        setMessage(`Heard “${text}”, but couldn't safely match it to an option. Please choose the answer manually.`);
      }
    };
    recognition.onerror = (event) => {
      setMessage(event.error === "not-allowed"
        ? "Microphone permission was denied. Allow microphone access or type your answer."
        : `Voice input couldn't finish (${event.error}). Please try again or type your answer.`);
    };
    recognition.onend = () => setListening(false);
    try { recognition.start(); } catch (error) {
      setListening(false);
      setMessage("Voice input couldn't start. Please try again or type your answer.");
    }
  };

  return (
    <div className="nh-voice-control">
      <div className="nh-voice-toolbar">
        <span className="nh-voice-label">Voice input</span>
        <div className="nh-voice-languages" aria-label="Speech language">
          <button type="button" className={locale === "en-IN" ? "selected" : ""} onClick={() => setLocale("en-IN")} disabled={listening}>EN</button>
          <button type="button" className={locale === "hi-IN" ? "selected" : ""} onClick={() => setLocale("hi-IN")} disabled={listening}>हिंदी</button>
        </div>
        <button type="button" className="nh-voice-button" onClick={startListening} disabled={listening} aria-label="Start voice input">
          {listening ? "● Listening…" : "🎙 Speak"}
        </button>
      </div>
      {message && <small className="nh-voice-message" role="status">{message}</small>}
    </div>
  );
}

function Field({ label, children, hint, onVoiceTranscript }) {
  return (
    <label className="nh-field">
      <span className="nh-field-label">{label}</span>
      {children}
      {onVoiceTranscript && <VoiceInput onTranscript={onVoiceTranscript} />}
      {hint && <small className="nh-hint">{hint}</small>}
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label} onVoiceTranscript={(spoken) => onChange({ target: { value: spoken } })}>
      <select value={value} onChange={onChange} required>
        <option value="">Choose an answer</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </Field>
  );
}

function WomanAvatar({ large = false }) {
  return (
    <svg
      className={large ? "nh-avatar-large" : "nh-avatar-small"}
      viewBox="0 0 160 160"
      role="img"
      aria-label="Illustrated woman profile"
    >
      <circle cx="80" cy="80" r="76" fill="#e4f1e5" />
      <path d="M29 157 Q34 106 80 106 Q126 106 131 157" fill="#4c946c" />
      <path d="M45 74 Q30 20 80 19 Q130 20 115 74 L109 96 Q100 119 80 119 Q60 119 51 96 Z" fill="#553c35" />
      <ellipse cx="80" cy="69" rx="28" ry="35" fill="#c98561" />
      <path d="M51 62 Q45 26 80 26 Q115 26 109 62 L99 48 Q79 58 56 47 Z" fill="#553c35" />
      <path d="M65 72 Q70 76 75 72 M85 72 Q90 76 95 72" stroke="#533a32" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M72 89 Q80 95 88 89" stroke="#8c4c42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M58 114 L80 137 L102 114" fill="#fff" />
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("English");
  const [stateName, setStateName] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [analysisError, setAnalysisError] = useState("");
  const [analysisState, setAnalysisState] = useState("idle");
  const [clinician, setClinician] = useState("a");
  const [slot, setSlot] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (analysisState !== "complete") return;
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [analysisState]);

  const update = (field, value) =>
    setForm((previous) => ({ ...previous, [field]: value }));

  const goNext = (event) => {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, sections.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setImageName(file.name);
    setImageFile(file);
    setModelResult(null);
    setAnalysisError("");
    setAnalysisState("idle");
  };

  const removeImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl("");
    setImageName("");
    setImageFile(null);
    setModelResult(null);
    setAnalysisError("");
    setAnalysisState("idle");
  };

  const startOver = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setForm(initialForm);
    setImageUrl("");
    setImageName("");
    setImageFile(null);
    setModelResult(null);
    setAnalysisError("");
    setAnalysisState("idle");
    setStep(0);
    setSlot("");
    setBookingConfirmed(false);
    setScreen("app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const analyseImage = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }
    if (!form.age) {
      alert("Please complete your age in Personal Details before analysing.");
      setStep(0);
      return;
    }
    setAnalysisError("");
    setAnalysisState("loading");
    try {
      const body = new FormData();
      body.append("patient_name", userName || "User");
      body.append("age", String(form.age));
      body.append("gender", "Female");
      body.append("image_type", "Eye Conjunctiva");
      body.append("notes", JSON.stringify({ language, stateName, questionnaire: form }));
      body.append("image", imageFile);
      const response = await fetch("/api/predict", { method: "POST", body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || (payload.errors || []).join(" ") || "Prediction failed.");
      }
      setModelResult(payload);
      setAnalysisState("complete");
    } catch (error) {
      setAnalysisError(error?.message || "Could not reach the NariHB backend. Make sure Flask is running.");
      setAnalysisState("idle");
    }
  };

  const selectedClinician = clinicians.find((person) => person.id === clinician);

  const reportRows = [
    ["Name", userName || "Not provided"],
    ["Language selected", language],
    ["State / Union Territory", stateName || "Not provided"],
    ["Age", form.age || "Not provided"],
    ["Pregnancy status", form.pregnancy || "Not answered"],
    ["Usual diet", form.diet || "Not answered"],
    ["Diabetes diagnosis", form.diabetes || "Not answered"],
    ["Currently menstruating", form.periodStatus || "Not answered"],
    ["Periods regular", form.cycleRegularity || "Not answered"],
    ["Usual period duration", form.periodDuration || "Not answered"],
    ["Bleeding description", form.bleeding || "Not answered"],
    ["Pad/tampon changing frequency", form.padFrequency || "Not answered"],
    ["Bleeding between periods", form.bleedingBetweenPeriods || "Not answered"],
    ["Unusual tiredness or weakness", form.fatigue || "Not answered"],
    ["Dizziness", form.dizziness || "Not answered"],
    ["Shortness of breath", form.breathlessness || "Not answered"],
    ["Frequent headaches", form.headaches || "Not answered"],
    ["Unusual paleness", form.paleness || "Not answered"],
    ["Racing or pounding heartbeat", form.palpitations || "Not answered"],
    ["Symptom duration", form.symptomDuration || "Not answered"],
    ["Previous anaemia diagnosis", form.previousAnemia || "Not answered"],
    ["Reported recent Hb result", form.recentHb ? `${form.recentHb} g/dL (self-reported)` : "Not provided"],
    ["Other medical history", form.medicalHistory || "Not provided"],
    ["Eye image filename", imageName || "No image provided"],
  ];

  const downloadReport = () => {
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 17;
    const usableWidth = pageWidth - margin * 2;
    let y = 18;

    const addText = (text, size = 10, style = "normal", color = [45, 65, 53]) => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(String(text), usableWidth);
      const lineHeight = size * 0.48;
      if (y + lines.length * lineHeight > pageHeight - 17) {
        pdf.addPage();
        y = 18;
      }
      pdf.text(lines, margin, y);
      y += lines.length * lineHeight + 2;
    };

    addText("NariHB", 22, "bold", [40, 118, 83]);
    addText("Women's Health Screening — Consultation Summary", 12, "bold");
    addText(`Report date: ${new Date().toLocaleDateString("en-IN")}`, 9, "normal", [100, 110, 102]);
    y += 3;
    addText("IMPORTANT: DEMONSTRATION REPORT ONLY", 12, "bold", [150, 87, 24]);
    addText(
      "This is an experimental research screening output, not a diagnosis or laboratory measurement. It must not be used for medical decisions.",
      10
    );
    y += 2;
    addText("MODEL RESULT", 13, "bold", [40, 118, 83]);
    addText(modelResult ? `Model output: ${modelResult.prediction || "Unavailable"}` : "No model result available.", 11, "bold");
    if (modelResult) {
      addText(`Model anemia probability: ${(Number(modelResult.anemic_probability || 0) * 100).toFixed(1)}% (experimental, not clinically calibrated).`, 10);
      if (modelResult.experimental_hb_g_dl != null) addText(`Experimental Hb estimate: ${Number(modelResult.experimental_hb_g_dl).toFixed(2)} g/dL (not a lab result).`, 10);
    }
    y += 2;
    addText("SCREENING ANSWERS", 13, "bold", [40, 118, 83]);

    reportRows.forEach(([label, value]) => {
      addText(`${label}: ${value}`, 10);
    });

    y += 3;
    addText("RECOMMENDATION", 13, "bold", [40, 118, 83]);
    addText(
      "Please seek professional consultation with a qualified healthcare professional if you are concerned about anaemia or have ongoing symptoms. A clinician may recommend a blood test such as a complete blood count (CBC) to assess haemoglobin.",
      10
    );
    addText(
      "This report summarises answers entered into a demo website. It is not a diagnosis and must not be used to make medical decisions. Eye photographs alone cannot reliably establish haemoglobin levels.",
      9,
      "normal",
      [100, 100, 100]
    );

    const safeName = (userName || "User")
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "") || "User";

    pdf.save(`NariHB_${safeName}_report.pdf`);
  };

  if (screen === "login") {
    return (
      <div className="nh-entry-page">
        <div className="nh-entry-card">
          <div className="nh-entry-logo">N</div>
          <p className="nh-eyebrow">WOMEN'S HEALTH & WELLBEING</p>
          <h1>Welcome to NariHB</h1>
          <p className="nh-entry-description">
            A little space for you, your health, and your wellbeing.
          </p>
          <form className="nh-form" onSubmit={(event) => {
            event.preventDefault();
            if (userName.trim() && stateName.trim()) {
              setUserName(userName.trim());
              setStateName(stateName.trim());
              setScreen("welcome");
            }
          }}>
            <Field label="What should we call you?">
              <input
                type="text"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                required
              />
            </Field>

            <Field label="Choose your language">
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
              </select>
              {language === "Hindi" && (
                <small className="nh-hint">
                  Hindi is available as a selection; this demo's questionnaire text is currently in English.
                </small>
              )}
            </Field>

            <Field label="Which state or Union Territory are you from?">
              <input
                list="nh-indian-places"
                value={stateName}
                onChange={(event) => setStateName(event.target.value)}
                placeholder="Start typing, e.g. D"
                autoComplete="off"
                required
              />
              <datalist id="nh-indian-places">
                {indianPlaces.map((place) => <option key={place} value={place} />)}
              </datalist>
              <small className="nh-hint">
                Suggestions are arranged alphabetically. You can type a name and choose a suggestion.
              </small>
            </Field>

            <button className="nh-primary nh-entry-button" type="submit">
              Continue →
            </button>
          </form>
          <p className="nh-entry-footnote">
            Demo login only. This does not create a secure account.
          </p>
        </div>
      </div>
    );
  }

  if (screen === "welcome") {
    return (
      <div className="nh-entry-page">
        <div className="nh-entry-card nh-welcome-card">
          <div className="nh-welcome-illustration"><WomanAvatar large /></div>
          <p className="nh-eyebrow">A WARM WELCOME TO YOU</p>
          <h1>You're in a space made for you.</h1>
          <p className="nh-entry-description">
            Your health matters, your questions matter, and you deserve care
            without judgement. Take your time as you explore your wellbeing
            with NariHB.
          </p>
          <p className="nh-welcome-signature">With care,<strong>{userName}</strong></p>
          <p className="nh-hint">Language: {language} · {stateName}</p>
          <button className="nh-primary nh-entry-button" onClick={() => setScreen("app")}>
            Enter NariHB →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nh-app">
      <header className="nh-header">
        <button className="nh-brand nh-brand-button" onClick={() => setStep(0)}>
          <span className="nh-logo">N</span>
          <span><strong>NariHB</strong><small>Women's Health & Wellbeing</small></span>
        </button>
        <button className="nh-profile-chip" onClick={() => setScreen("welcome")} title="Your profile">
          <span className="nh-profile-avatar"><WomanAvatar /></span>
          <span className="nh-profile-name">{userName}</span>
        </button>
      </header>

      <main className="nh-main">
        <section className="nh-welcome">
          <span className="nh-eyebrow">YOUR HEALTH, YOUR PRIORITY</span>
          <h1>Hello, {userName}.<br />Your wellbeing matters.</h1>
          <p>Take your time. Explore your screening one section at a time.</p>
        </section>

        <div className="nh-layout">
          <aside className="nh-sidebar">
            <p className="nh-side-heading">YOUR SCREENING</p>
            <button className="nh-new-screening" onClick={startOver}><span>＋</span> New Screening</button>
            {sections.map((section, index) => (
              <button
                key={section}
                className={`nh-step-link ${index === step ? "active" : ""} ${index < step ? "completed" : ""}`}
                onClick={() => { if (index <= step) setStep(index); }}
                disabled={index > step || analysisState === "loading"}
              >
                <span className="nh-step-number">{index < step ? "✓" : index + 1}</span>
                <span>{section}</span>
              </button>
            ))}
            <div className="nh-privacy-note">
              <span>🔒</span><p>Demo only. Do not enter sensitive personal or medical information.</p>
            </div>
          </aside>

          <section className="nh-panel">
            <div className="nh-panel-top">
              <div><p className="nh-eyebrow">STEP {step + 1} OF 6</p><h2>{analysisState === "loading" ? "Analysing Eye Image" : sections[step]}</h2></div>
              <span className="nh-progress-label">{Math.round(((step + 1) / 6) * 100)}%</span>
            </div>
            <div className="nh-progress-track"><div className="nh-progress-fill" style={{ width: `${((step + 1) / 6) * 100}%` }} /></div>

            {step === 0 && (
              <form onSubmit={goNext} className="nh-form">
                <p className="nh-intro">Let's start with a few basic details.</p>
                <Field label="Your age" onVoiceTranscript={(text) => update("age", text.match(/\d+/)?.[0] || "")}><input type="number" min="18" max="120" required value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="Enter your age" /></Field>
                <SelectField label="Are you currently pregnant, possibly pregnant, or unsure?" value={form.pregnancy} onChange={(e) => update("pregnancy", e.target.value)} options={["No", "Yes", "Possibly", "Not sure", "Prefer not to say"]} />
                <SelectField label="What type of diet do you usually follow?" value={form.diet} onChange={(e) => update("diet", e.target.value)} options={["Vegetarian", "Vegan", "Mixed diet (vegetarian and non-vegetarian foods)", "Other", "Prefer not to say"]} />
                <SelectField label="Have you been diagnosed with diabetes?" value={form.diabetes} onChange={(e) => update("diabetes", e.target.value)} options={["Yes", "No", "Not sure", "Prefer not to say"]} />
                <div className="nh-info">These answers help organise this demo screening. They do not diagnose a health condition.</div>
                <div className="nh-actions"><span /><button className="nh-primary" type="submit">Next: Menstrual Health →</button></div>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={goNext} className="nh-form">
                <p className="nh-intro">These questions help capture your menstrual health.</p>
                <SelectField label="Are you currently menstruating?" value={form.periodStatus} onChange={(e) => update("periodStatus", e.target.value)} options={["Yes", "No", "Irregular periods", "Not applicable", "Prefer not to say"]} />
                <SelectField label="Are your periods usually regular?" value={form.cycleRegularity} onChange={(e) => update("cycleRegularity", e.target.value)} options={["Yes", "No", "Sometimes", "Not sure", "Not applicable"]} />
                <SelectField label="How long does your period usually last?" value={form.periodDuration} onChange={(e) => update("periodDuration", e.target.value)} options={["1–2 days", "3–5 days", "6–7 days", "More than 7 days", "Not sure", "Not applicable"]} />
                <SelectField label="How would you describe your bleeding?" value={form.bleeding} onChange={(e) => update("bleeding", e.target.value)} options={["Light", "Moderate", "Heavy", "Very heavy", "Not sure", "Not applicable"]} />
                <SelectField label="On your heaviest day, how often do you change your pad or tampon?" value={form.padFrequency} onChange={(e) => update("padFrequency", e.target.value)} options={["Every 1–2 hours", "Every 3–4 hours", "Every 5 hours or less often", "Not sure", "Not applicable"]} />
                <SelectField label="Do you experience bleeding between periods?" value={form.bleedingBetweenPeriods} onChange={(e) => update("bleedingBetweenPeriods", e.target.value)} options={["Yes", "No", "Sometimes", "Not sure", "Not applicable"]} />
                <div className="nh-actions"><button type="button" className="nh-secondary" onClick={goBack}>← Back</button><button className="nh-primary" type="submit">Next: Symptoms →</button></div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={goNext} className="nh-form">
                <p className="nh-intro">Tell us about any symptoms or relevant health history.</p>
                {[
                  ["fatigue", "Have you experienced unusual tiredness or weakness?"],
                  ["dizziness", "Have you experienced dizziness or light-headedness?"],
                  ["breathlessness", "Have you felt short of breath during usual activities?"],
                  ["headaches", "Have you experienced frequent headaches?"],
                  ["paleness", "Have you noticed unusual paleness?"],
                  ["palpitations", "Have you noticed a racing or pounding heartbeat?"],
                ].map(([field, label]) => <SelectField key={field} label={label} value={form[field]} onChange={(e) => update(field, e.target.value)} options={["Yes", "No", "Sometimes", "Not sure", "Prefer not to say"]} />)}
                <SelectField label="How long have you experienced these symptoms?" value={form.symptomDuration} onChange={(e) => update("symptomDuration", e.target.value)} options={["Less than one week", "1–4 weeks", "More than one month", "Symptoms vary", "No symptoms", "Not sure"]} />
                <SelectField label="Have you previously been diagnosed with anaemia?" value={form.previousAnemia} onChange={(e) => update("previousAnemia", e.target.value)} options={["Yes", "No", "Not sure", "Prefer not to say"]} />
                <Field label="Recent haemoglobin (Hb) result, if known" hint="Optional. Enter a result from a blood test, not a guess." onVoiceTranscript={(text) => { const number = text.match(/\d+(?:[.,]\d+)?/); if (number) update("recentHb", number[0].replace(",", ".")); }}><input type="number" min="0" max="30" step="0.1" value={form.recentHb} onChange={(e) => update("recentHb", e.target.value)} placeholder="Hb in g/dL, if known" /></Field>
                <Field label="Other relevant medical history (optional)" onVoiceTranscript={(text) => update("medicalHistory", `${form.medicalHistory}${form.medicalHistory ? " " : ""}${text}`)}><textarea rows={3} value={form.medicalHistory} onChange={(e) => update("medicalHistory", e.target.value)} placeholder="Avoid identifying information." /></Field>
                <div className="nh-warning">Severe difficulty breathing, chest pain, fainting, or heavy ongoing bleeding with weakness or dizziness needs urgent medical care.</div>
                <div className="nh-actions"><button type="button" className="nh-secondary" onClick={goBack}>← Back</button><button className="nh-primary" type="submit">Next: Eye Image →</button></div>
              </form>
            )}

            {step === 3 && (
              <div className="nh-form">
                {analysisState === "loading" ? (
                  <div className="nh-analysis-screen">
                    {imageUrl && <img className="nh-analysis-image" src={imageUrl} alt="Selected eye" />}
                    <div className="nh-spinner" />
                    <h3>Analysing your image…</h3>
                    <p>The backend is running an experimental research model. This may take a few seconds.</p>
                  </div>
                ) : (
                  <>
                    <p className="nh-intro">Upload an eye photo to explore the planned image-analysis experience.</p>
                    <div className="nh-image-instructions">
                      <strong>How to take a suitable eye photo</strong>
                      <ul>
                        <li>Use a clear, well-lit photo without filters.</li>
                        <li>Keep the inner lower eyelid visible if comfortable; do not pull or touch the eye roughly.</li>
                        <li>Avoid blur, strong shadows, flash glare, and coloured contact lenses.</li>
                        <li>A photo cannot confirm anaemia or measure haemoglobin.</li>
                      </ul>
                    </div>
                    <label className="nh-upload-box">
                      <span className="nh-upload-icon">↑</span><strong>Choose an eye image</strong><span>Image files · Maximum 5 MB</span>
                      <input type="file" accept="image/*" onChange={handleImage} />
                    </label>
                    {imageUrl && <div className="nh-image-preview"><img src={imageUrl} alt="Selected eye preview" /><div><strong>Image provided</strong><p>{imageName}</p><button className="nh-text-button" type="button" onClick={removeImage}>Remove image</button></div></div>}
                    <div className="nh-info">Your selected image will be sent to the local NariHB backend for experimental inference.</div>
                    {analysisError && <div className="nh-warning" role="alert">{analysisError}</div>}
                    <div className="nh-actions"><button type="button" className="nh-secondary" onClick={goBack}>← Back</button><button type="button" className="nh-primary" onClick={analyseImage} disabled={!imageUrl || analysisState === "loading"}>Analyse Image →</button></div>
                  </>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="nh-form">
                <div className="nh-results-heading"><span className="nh-results-icon">✓</span><div><h3>Experimental model result</h3><p>Generated by the connected NariHB backend.</p></div></div>
                {modelResult ? (
                  <div className="nh-result-banner">
                    <span className="nh-eyebrow">RESEARCH SCREENING OUTPUT</span>
                    <h3>{modelResult.prediction || "Result unavailable"}</h3>
                    <p>Model confidence: {Number(modelResult.confidence_percent ?? (modelResult.confidence * 100)).toFixed(1)}% (not a calibrated clinical probability).</p>
                    <div className="nh-demo-score"><div className="nh-score-number">{Number(modelResult.anemic_probability * 100).toFixed(1)}%</div><div><strong>Model anemia probability</strong><small>Experimental output only; not a diagnosis.</small></div></div>
                    {modelResult.experimental_hb_g_dl != null && <p>Experimental Hb estimate: {Number(modelResult.experimental_hb_g_dl).toFixed(2)} g/dL. This is not a laboratory result.</p>}
                    {modelResult.pdf_url && <p><a href={modelResult.pdf_url} target="_blank" rel="noreferrer">Open backend report</a></p>}
                  </div>
                ) : <div className="nh-warning">No model result is available. Go back and analyse an image again.</div>}
                {imageUrl && <div className="nh-image-preview"><img src={imageUrl} alt="Image provided for the demo" /><div><strong>Image provided</strong><p>{imageName}</p><small>Image submitted for experimental inference</small></div></div>}
                <div className="nh-summary-grid">
                  <div className="nh-summary-card"><span>Age</span><strong>{form.age || "Not provided"}</strong></div>
                  <div className="nh-summary-card"><span>State / UT</span><strong>{stateName}</strong></div>
                  <div className="nh-summary-card"><span>Diet</span><strong>{form.diet || "Not answered"}</strong></div>
                  <div className="nh-summary-card"><span>Diabetes history</span><strong>{form.diabetes || "Not answered"}</strong></div>
                  <div className="nh-summary-card"><span>Previous anaemia diagnosis</span><strong>{form.previousAnemia || "Not answered"}</strong></div>
                  <div className="nh-summary-card"><span>Reported Hb result</span><strong>{form.recentHb ? `${form.recentHb} g/dL (self-reported)` : "Not provided"}</strong></div>
                </div>
                <div className="nh-warning"><strong>Please seek professional consultation.</strong><p>If you are concerned about anaemia or have ongoing symptoms, consult a qualified healthcare professional. A clinician may recommend a complete blood count (CBC) to assess haemoglobin.</p><p>Model outputs are experimental and are not a medical diagnosis or an assessment of your clinical risk.</p></div>
                <div className="nh-report-card">
                  <div><h3>Your consultation report (PDF)</h3><p>Includes your entered answers and a professional-consultation recommendation. The downloaded summary is not a diagnostic report.</p></div>
                  <button className="nh-primary nh-report-link" type="button" onClick={downloadReport}>Download PDF ↓</button>
                </div>
                <div className="nh-actions"><button type="button" className="nh-secondary" onClick={goBack}>← Back</button><button type="button" className="nh-primary" onClick={() => setStep(5)}>Explore Appointments →</button></div>
              </div>
            )}

            {step === 5 && (
              <div className="nh-form">
                <p className="nh-intro">Explore a sample appointment-selection experience.</p>
                <div className="nh-image-notice">These are fictional clinicians and sample slots. No real appointment will be booked.</div>
                <Field label="Choose a clinician"><select value={clinician} onChange={(e) => { setClinician(e.target.value); setSlot(""); setBookingConfirmed(false); }}>{clinicians.map((person) => <option key={person.id} value={person.id}>{person.name} — {person.specialty}</option>)}</select></Field>
                <div className="nh-clinician-card"><span className="nh-clinician-avatar">+</span><div><strong>{selectedClinician.name}</strong><p>{selectedClinician.specialty}</p><small>Sample clinician · Demo only</small></div></div>
                <p className="nh-field-label">Choose a sample time</p>
                <div className="nh-slots">{slots.map((time) => <button type="button" key={time} className={`nh-slot ${slot === time ? "selected" : ""}`} onClick={() => { setSlot(time); setBookingConfirmed(false); }}>{time}</button>)}</div>
                {bookingConfirmed && <div className="nh-success"><strong>Demo selection confirmed!</strong><p>{selectedClinician.name} · {slot}</p><small>No booking was sent to a real clinician.</small></div>}
                <div className="nh-actions"><button type="button" className="nh-secondary" onClick={goBack}>← Back</button><button type="button" className="nh-primary" disabled={!slot} onClick={() => setBookingConfirmed(true)}>Confirm Demo Slot</button></div>
                <button type="button" className="nh-text-button" onClick={startOver}>Start a new demo screening</button>
              </div>
            )}
          </section>
        </div>

        <footer className="nh-footer"><span>NariHB · Women's health screening demo</span><span>Not a substitute for professional medical care.</span></footer>
      </main>
    </div>
  );
}
