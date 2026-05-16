# 🔐 SecurityVault Analyzer - Enterprise Edition

Eine **professionelle Chrome Extension** zur Website-Sicherheits- und Datenflussanalyse mit Enterprise-Design und mobiler Optimierung.

## 📋 Features

✅ **Instant Security Analysis**
- Automatische Risiko-Bewertung (0-10 Score)
- Identifikation von Sicherheitsproblemen
- Erkannte Sicherheitsstärken

✅ **Data Flow Monitoring**
- Externe APIs detektieren
- Third-Party Services identifizieren
- Cookie & Storage-Analyse
- External Service Tracking

✅ **Professional Reporting**
- Markdown-Reports generieren
- PDF-Download (Export)
- Detaillierte Findings
- Actionable Recommendations

✅ **Enterprise Design**
- Dark Mode mit Glassmorphism
- Mobile-optimiert (responsive)
- Professionelle Ästhetik
- Schnelle Performance

## 🚀 Installation

### Schritt 1: Extension-Dateien kopieren

1. Erstelle einen neuen Ordner auf deinem Computer: `/SecurityVault`
2. Kopiere folgende Dateien in diesen Ordner:
   - `manifest.json`
   - `popup.html`
   - `popup.css`
   - `popup.js`
   - `content.js`
   - `background.js`

### Schritt 2: In Chrome laden

1. Öffne Chrome und gehe zu: `chrome://extensions/`
2. Aktiviere **Developer Mode** (rechts oben)
3. Klick auf **"Load unpacked"**
4. Wähle den `/SecurityVault` Ordner
5. Extension ist jetzt aktiv! 🎉

### Schritt 3: Test

1. Öffne eine beliebige Website
2. Klick auf das Extension-Icon (🔐)
3. Klick **"Analyze Now"** Button
4. Ergebnisse werden in Echtzeit angezeigt

## 📱 Mobile Optimierung

Die Extension ist vollständig responsive und optimiert für:
- ✅ Smartphone (320px - 480px)
- ✅ Tablet (480px - 768px)
- ✅ Desktop (768px+)

Das Popup wird automatisch für das Gerät skaliert.

## 🎯 Tabs Übersicht

### 📊 Overview
Infrastruktur-Details und erkannte APIs:
- Hosting-Provider
- CDN-Status
- SSL/TLS Status
- API-Endpunkte mit Methods
- Time-to-First-Byte (TTFB)

### 🛡️ Security
Sicherheitsbewertung und Probleme:
- Risk Score Visualisierung (0-10)
- Erkannte Sicherheitsprobleme
- Severity-Level (High/Medium/Low)
- Recommendations für jedes Issue
- Erkannte Sicherheitsstärken

### 📡 Data Flow
Datenflüsse und externe Services:
- Datenfluss-Diagramm
- Erkannte externe Services
  - Google Analytics
  - Cloudflare
  - Tracking Pixels
  - Werbenetzwerke
  - CDN
- Cookies & Storage-Info
  - Anzahl Cookies
  - localStorage Items
  - sessionStorage Items

### 📋 Report
Report-Generierung und Export:
- Report-Optionen (Checkboxes)
- Markdown-Report generieren
- PDF-Download
- In Clipboard kopieren
- Live-Vorschau

## 🔍 Was wird analysiert?

### Sicherheit
- ✅ HTTPS/SSL Status
- ✅ CSP (Content Security Policy)
- ✅ Security Headers
- ✅ Form-Security
- ✅ API-Exposure
- ❌ Exposed Secrets/Tokens
- ❌ Insecure Requests

### Datenflüsse
- 🔌 API Endpoints
- 📍 Tracking Services
- 🎯 Third-Party Analytics
- 📊 Ad Networks
- 🍪 Cookies & Storage
- 🔗 External Resources

### Infrastruktur
- 🏗️ Hosting-Provider
- 📡 CDN Detection
- 🔐 SSL/TLS Info
- ⏱️ Performance (TTFB)
- 🌐 Domain Information

## 📊 Risk Score Erklärung

| Score | Level | Farbe | Bedeutung |
|-------|-------|-------|-----------|
| 0-3 | Low Risk | 🟢 Grün | Gute Sicherheit |
| 4-6 | Medium Risk | 🟡 Orange | Einige Concerns |
| 7-10 | High Risk | 🔴 Rot | Kritische Issues |

## 🎨 Design Features

### Modern Enterprise Aesthetics
- **Color Palette**: Cyan (#00d9ff) + Magenta (#ff006e)
- **Typography**: System Font Stack
- **Effects**: Glassmorphism, Gradients, Animations
- **Dark Theme**: OLED-optimiert
- **Light Theme**: Optional verfügbar

### Micro-Interactions
- Smooth Tab Transitions
- Hover Effects auf Cards
- Loading Animations
- Risk Score Visualisierung
- Floating Logo Animation

## 🛠️ Dateistruktur

```
SecurityVault/
├── manifest.json          # Extension Konfiguration
├── popup.html            # Main UI
├── popup.css             # Enterprise Styling (600+ Zeilen)
├── popup.js              # Logik & Interaktionen
├── content.js            # Seiten-Analyse
├── background.js         # Background Worker
└── README.md            # Diese Datei
```

## ⚙️ Technologie-Stack

| Komponente | Technologie |
|-----------|------------|
| Runtime | Chrome Extension API (Manifest V3) |
| Frontend | Vanilla HTML5 / CSS3 / JavaScript |
| Styling | CSS Variables, Grid, Flexbox |
| Performance | Zero Dependencies |
| Animation | CSS Keyframes |
| Storage | Chrome Storage API |

## 🔒 Datenschutz

✅ **Keine Datenerfassung**
- Analysedaten bleiben lokal
- Keine Server-Kommunikation
- Keine Tracking
- Keine Cookies
- GDPR-konform

## 📈 Performance

- 📦 Minimal Footprint (<50KB)
- ⚡ Instant Analysis
- 🎯 Zero Dependencies
- 🚀 Smooth 60fps Animations

## 🐛 Troubleshooting

### Extension lädt nicht
→ Stelle sicher, dass Chrome Developer Mode aktiv ist
→ Prüfe das Manifest auf Syntax-Fehler

### Analyse funktioniert nicht
→ Aktualisiere die Extension (chrome://extensions/)
→ Versuche auf einer anderen Website

### Popup wird nicht angezeigt
→ Klick das Extension-Icon mehrmals
→ Starte Chrome neu

## 🚀 Erweiterte Features (Roadmap)

- 📊 Historical Data Tracking
- 🔄 Scheduled Scans
- 📧 Export via Email
- ☁️ Cloud Storage Integration
- 🔗 Batch URL Analysis
- 🎯 Custom Rules Engine
- 📈 Analytics Dashboard

## 📝 API für Entwickler

### Content Script Message API
```javascript
// Request
chrome.tabs.sendMessage(tabId, { action: 'analyze' }, (response) => {
    console.log(response.data);
});

// Response
{
    success: true,
    data: {
        url: string,
        infrastructure: object,
        apis: array,
        security: object,
        dataflow: object
    }
}
```

## 🎓 Anleitung: Report Generieren

1. Website analysieren (Button: "🔍 Analyze Now")
2. Zum "Report" Tab wechseln
3. Optionen wählen (Details, Risks, Recommendations)
4. Button: "📄 Generate Report"
5. Report wird live angezeigt
6. Optionen:
   - **📄 PDF**: Als PDF-Datei herunterladen
   - **📋 Markdown**: Als Markdown kopieren
   - **💾 Save**: Lokal speichern

## 🌐 Unterstützte Browser

- ✅ Google Chrome 100+
- ✅ Microsoft Edge 100+ (Chromium-basiert)
- ✅ Brave Browser
- ✅ Opera Browser
- ❌ Firefox (würde Anpassungen benötigen)

## 📞 Support

Bei Fragen oder Problemen:
1. Prüfe die Chrome DevTools Console (F12)
2. Überprüfe das Extension-Status Panel
3. Stelle sicher, dass manifest.json korrekt ist

## 📄 License

MIT License - Frei für private und kommerzielle Nutzung

---

**SecurityVault Analyzer** • Enterprise Edition v1.0.0
*Professional Security Analysis for the Modern Web*
