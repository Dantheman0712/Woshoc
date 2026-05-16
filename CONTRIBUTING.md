# Contributing to SecurityVault Analyzer

Danke, dass du zu SecurityVault beitragen möchtest! 🙏

Dieses Dokument erklärt wie du helfen kannst.

## 📋 Code of Conduct

Bitte sei respektvoll und konstruktiv in deinen Interaktionen. Alle Contributors werden mit Fairness und Respekt behandelt.

## 🐛 Bug Reports

### Bevor du einen Bug reportest:
- Prüfe die [Issues](https://github.com/yourusername/SecurityVault/issues) ob es bereits existiert
- Teste mit der neuesten Version

### Bug Report muss enthalten:
1. **Klare Beschreibung** des Problems
2. **Steps to Reproduce**
   ```
   1. Öffne die Website...
   2. Klick auf...
   3. Sehe Fehler...
   ```
3. **Expected vs Actual Behavior**
4. **Screenshots/Video** (falls relevant)
5. **Environment Info**
   - Chrome Version
   - OS (Windows/Mac/Linux)
   - Extension Version

### Bug Report Template:
```markdown
**Describe the bug**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to...
2. Click...
3. See error

**Expected Behavior**
What should happen?

**Screenshots**
If applicable, add screenshots.

**Environment**
- Chrome Version: [e.g. 120]
- OS: [e.g. Windows 11]
- Extension Version: [e.g. 1.0.0]
```

---

## 💡 Feature Requests

### Feature Request muss enthalten:
1. **Klare Beschreibung** der Feature
2. **Use Case** — Wofür wird es benötigt?
3. **Alternatives** — Gibt es andere Lösungen?
4. **Additional Context** — Screenshots, Links, etc.

### Feature Request Template:
```markdown
**Is your feature request related to a problem?**
Description...

**Describe the solution you'd like**
What should the feature do?

**Describe alternatives you've considered**
Other approaches?

**Additional context**
Screenshots, examples, etc.
```

---

## 🔧 Development Setup

### Requirements
- Git
- Google Chrome
- Text Editor (VS Code, etc.)
- Basic JavaScript Knowledge

### Setup Steps:

1. **Fork das Repository**
   ```bash
   # Auf GitHub fork button klicken
   ```

2. **Clone dein Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SecurityVault.git
   cd SecurityVault
   ```

3. **Erstelle Feature Branch**
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

4. **Lade Extension in Chrome**
   - Gehe zu `chrome://extensions/`
   - Aktiviere "Developer mode"
   - Click "Load unpacked"
   - Wähle SecurityVault Folder

5. **Mache deine Changes**

6. **Test lokal**
   - Chrome neu laden (Ctrl+R)
   - Extension testen

---

## 📝 Code Style Guidelines

### JavaScript
```javascript
// Use consistent naming
const myFunction = () => {
    // Comments für komplexe Logik
};

// Prefer const, dann let, avoid var
const data = {};
let count = 0;

// Use arrow functions
const handler = () => {};

// Comments für "warum", nicht "was"
// Calculate risk based on issues detected
let score = baseScore;
```

### CSS
```css
/* Use CSS Variables */
:root {
    --primary-color: #00d9ff;
}

.element {
    color: var(--primary-color);
}

/* Group related properties */
.card {
    /* Layout */
    display: flex;
    gap: 1rem;
    
    /* Styling */
    background: #fff;
    border-radius: 8px;
    
    /* Interaction */
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
}
```

### HTML
```html
<!-- Use semantic HTML -->
<section class="main">
    <article class="card">
        <h2>Title</h2>
        <p>Content</p>
    </article>
</section>

<!-- Use data-* attributes for JS hooks -->
<button data-action="analyze" class="btn">Analyze</button>
```

---

## ✅ Commit Guidelines

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

### Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style (no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Adding tests
- **chore**: Build, deps, etc.

### Examples:
```bash
# Good
git commit -m "feat: add PDF export functionality"
git commit -m "fix: resolve risk score calculation bug"
git commit -m "docs: update README with installation steps"

# Bad
git commit -m "update stuff"
git commit -m "fixes"
git commit -m "various changes"
```

---

## 🧪 Testing

### Manual Testing Checklist:
- [ ] Extension lädt ohne Fehler
- [ ] Alle Tabs funktionieren
- [ ] Analysis functionality works
- [ ] Report generation works
- [ ] UI responsive auf Mobile
- [ ] Keine Console Errors (F12)
- [ ] Keine Memory Leaks

### Browser Testing:
- [ ] Chrome 100+
- [ ] Microsoft Edge
- [ ] Brave Browser

---

## 📤 Submitting Changes

### Pull Request Process:

1. **Aktualisiere Main Branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push zu deinem Fork**
   ```bash
   git push origin feature/my-awesome-feature
   ```

3. **Erstelle Pull Request auf GitHub**

4. **PR Template:**
   ```markdown
   ## Description
   What does this PR do?

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   How have you tested this?

   ## Checklist
   - [ ] My code follows the code style
   - [ ] I have tested the changes
   - [ ] I have updated the README
   - [ ] No console errors

   ## Screenshots (if relevant)
   ```

### PR Review Process:
1. Mindestens 1 Review erforderlich
2. Alle Tests müssen passen
3. Keine Merge Conflicts
4. Dann: Merge & Deploy! 🚀

---

## 📚 Documentation

### README Updates
- Grammatik prüfen
- Screenshots aktualisieren
- Links verifizieren
- Beispiele testen

### Code Comments
```javascript
// Only comment "why", not "what"
// ❌ Bad: increment the counter
count++;

// ✅ Good: count active timers for rate limiting
count++;
```

---

## 🎯 Priorities

Current focus areas (in order):
1. 🐛 **Bug Fixes** — Critical issues
2. 🛡️ **Security** — Vulnerabilities
3. ⚡ **Performance** — Optimization
4. ✨ **Features** — New functionality
5. 📚 **Docs** — Documentation

---

## 🚀 Release Process

### Versioning: SemVer (MAJOR.MINOR.PATCH)

1. Feature complete
2. All tests pass
3. Update version in manifest.json
4. Create release on GitHub
5. Tag with version number
6. Publish release notes

---

## 💬 Communication

### Get Help:
- **Issues**: Technical questions
- **Discussions**: Ideas & feedback
- **Email**: security-vault@example.com (if listed)

### Code Review Tips:
- Be constructive & kind
- Focus on code, not person
- Ask questions, don't demand
- Provide alternatives

---

## 🎓 Resources

- [MDN: Chrome Extension API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Google: Extension Docs](https://developer.chrome.com/docs/extensions/)
- [JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

---

## 📞 Questions?

- Open an Issue with [question] tag
- Start a Discussion
- Check existing documentation

---

<div align="center">

**Thank you for contributing to SecurityVault!** ❤️

Together, we make the web safer.

</div>
