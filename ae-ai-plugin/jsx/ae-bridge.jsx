var aeAiAssistant = (function () {
  function getActiveComp() {
    if (app.project && app.project.activeItem && app.project.activeItem instanceof CompItem) {
      return app.project.activeItem;
    }
    return null;
  }

  function getSelectedLayer(comp) {
    if (!comp) {
      return null;
    }
    if (comp.selectedLayers.length > 0) {
      return comp.selectedLayers[0];
    }
    return null;
  }

  function ensureEffect(layer, matchName, displayName) {
    var effects = layer.property("ADBE Effect Parade");
    if (!effects) {
      return null;
    }

    for (var i = 1; i <= effects.numProperties; i += 1) {
      var effect = effects.property(i);
      if (effect.matchName === matchName) {
        return effect;
      }
    }

    var added = effects.addProperty(matchName);
    if (added && displayName) {
      added.name = displayName;
    }
    return added;
  }

  function handlePrompt(rawPrompt) {
    app.beginUndoGroup("AE AI Assistant");

    var comp = getActiveComp();
    if (!comp) {
      app.endUndoGroup();
      return "No active composition found.";
    }

    var layer = getSelectedLayer(comp);
    if (!layer) {
      app.endUndoGroup();
      return "Select a layer first, then try again.";
    }

    var promptText = String(rawPrompt || "").toLowerCase();
    var actions = [];

    if (promptText.indexOf("blur") !== -1) {
      var blur = ensureEffect(layer, "ADBE Gaussian Blur 2", "Gaussian Blur");
      if (blur) {
        blur.property("ADBE Gaussian Blur 2-0001").setValue(15);
        actions.push("Added Gaussian Blur");
      }
    }

    if (promptText.indexOf("highlight") !== -1 || promptText.indexOf("shadow") !== -1) {
      var levels = ensureEffect(layer, "ADBE Levels2", "Levels");
      if (levels) {
        levels.property("ADBE Levels2-0002").setValue(0.1);
        levels.property("ADBE Levels2-0003").setValue(0.9);
        actions.push("Adjusted Levels (highlights/shadows)");
      }
    }

    if (promptText.indexOf("blue") !== -1 || promptText.indexOf("hue") !== -1) {
      var hue = ensureEffect(layer, "ADBE Hue Saturation", "Hue/Saturation");
      if (hue) {
        hue.property("ADBE Hue Saturation-0002").setValue(-10);
        actions.push("Shifted Hue toward blue");
      }
    }

    app.endUndoGroup();

    if (actions.length === 0) {
      return "No supported actions detected. Try mentioning blur, highlights/shadows, or hue/blue.";
    }

    return "Applied: " + actions.join(", ");
  }

  return {
    handlePrompt: handlePrompt
  };
})();
