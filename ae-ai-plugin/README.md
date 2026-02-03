# AE AI Assistant CEP Plugin

This folder contains a minimal CEP panel scaffold for testing prompts in After Effects.

## Structure
- `CSXS/manifest.xml` registers the panel with CEP.
- `index.html` + `css/style.css` provide the UI.
- `js/main.js` handles the panel logic.
- `jsx/ae-bridge.jsx` executes ExtendScript inside After Effects.

## Quick start (local CEP install)
1. Copy the `ae-ai-plugin/` directory into your CEP extensions folder:
   - **macOS**: `~/Library/Application Support/Adobe/CEP/extensions/`
   - **Windows**: `%APPDATA%\Adobe\CEP\extensions\`
2. Enable CEP debug mode (so unsigned panels load), then restart After Effects.
3. Open **After Effects → Window → Extensions → AE AI Assistant**.
4. Select a layer in an active comp, then run prompts like:
   - "increase highlights and shadows"
   - "add a gaussian blur"
   - "shift hue to blue"

## Notes
The current bridge implements a small demo parser (blur, highlights/shadows, hue/blue). Extend `jsx/ae-bridge.jsx` to add more actions.
