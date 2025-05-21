# Playwright End-to-End Testprojekt

Dieses Repository enthält End-to-End-Tests, die mit Playwright geschrieben wurden.

## Wichtige Befehle

Hier findest du eine Zusammenfassung der gebräuchlichsten Playwright-Befehle, die dir helfen, die Tests auszuführen, zu debuggen und Berichte zu generieren.

### Tests ausführen

* **Alle Tests ausführen (Standard)**
  Führt alle Tests in allen konfigurierten Browsern aus (`chromium` standardmäßig, oder weitere, die in `playwright.config.js` definiert sind).
    ```bash
    npx playwright test
    ```

* **Tests im UI Mode ausführen**
  Startet Playwright im interaktiven UI Mode, der eine Schritt-für-Schritt-Ausführung, einen Locator-Picker und eine detaillierte Ansicht der Testausführung bietet. Ideal für die Testentwicklung und Fehlersuche.
    ```bash
    npx playwright test --ui
    ```

* **Tests im "Headed" Modus ausführen**
  Führt Tests mit sichtbarem Browserfenster aus (Standard ist "headless", also ohne sichtbares Fenster).
    ```bash
    npx playwright test --headed
    ```

* **Tests für einen spezifischen Browser ausführen**
  Führt Tests nur für einen bestimmten Browser aus, wie in der `playwright.config.js` im `projects`-Abschnitt definiert (z.B. `chromium`, `firefox`, `webkit`).
    ```bash
    npx playwright test --project chromium
    # Oder für mehrere Browser
    npx playwright test --project chromium --project firefox
    ```

* **Eine spezifische Testdatei ausführen**
  Führt nur die Tests in einer bestimmten Datei aus.
    ```bash
    npx playwright test tests/example.spec.js
    ```

* **Tests in bestimmten Verzeichnissen ausführen**
  Führt Tests aus einem oder mehreren angegebenen Verzeichnissen aus.
    ```bash
    npx playwright test tests/todo-page/ tests/landing-page/
    ```

* **Tests nach Schlüsselwörtern im Dateinamen filtern**
  Führt Tests aus, deren Dateinamen die angegebenen Schlüsselwörter enthalten.
    ```bash
    npx playwright test my-feature-test another-feature-test
    ```

* **Tests mit einem spezifischen Titel ausführen**
  Führt nur den Test aus, dessen vollständiger Titel (Beschreibung) mit dem angegebenen Muster übereinstimmt.
    ```bash
    npx playwright test -g "Der erste Absatz sollte den korrekten Text enthalten"
    ```

* **Nur zuletzt fehlgeschlagene Tests erneut ausführen**
    ```bash
    npx playwright test --last-failed
    ```

### Debugging

* **Alle Tests im Debug-Modus ausführen**
  Pausiert die Testausführung und öffnet den Playwright Inspector, um Interaktionen Schritt für Schritt zu verfolgen und Locators zu überprüfen.
    ```bash
    npx playwright test --debug
    ```

* **Eine spezifische Testdatei im Debug-Modus ausführen**
    ```bash
    npx playwright test tests/example.spec.js --debug
    ```

* **Einen spezifischen Test über die Zeilennummer debuggen**
  Führt den Debug-Modus ab der Zeile aus, in der der `test(...)` Block definiert ist.
    ```bash
    npx playwright test tests/example.spec.js:10 --debug
    ```

### Berichterstattung

* **HTML Testbericht öffnen**
  Nach einer Testausführung wird ein HTML-Bericht generiert (standardmäßig im Ordner `playwright-report/`). Dieser Befehl öffnet ihn in deinem Browser.
    ```bash
    npx playwright show-report
    ```