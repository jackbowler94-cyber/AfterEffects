(function () {
  var runButton = document.getElementById("run");
  var clearButton = document.getElementById("clear");
  var promptInput = document.getElementById("prompt");
  var logOutput = document.getElementById("log");

  function updateLog(message) {
    logOutput.textContent = message;
  }

  function runPrompt() {
    var promptText = promptInput.value.trim();
    if (!promptText) {
      updateLog("Please enter a prompt first.");
      return;
    }

    updateLog("Sending prompt to After Effects...\n\n" + promptText);

    if (window.__adobe_cep__) {
      var csInterface = new CSInterface();
      var payload = JSON.stringify({ prompt: promptText });
      csInterface.evalScript("aeAiAssistant.handlePrompt(" + payload + ")", function (result) {
        updateLog(result || "Done.");
      });
      return;
    }

    updateLog("CEP APIs not available. Load this panel inside After Effects to execute.");
  }

  function clearPrompt() {
    promptInput.value = "";
    updateLog("Ready.");
  }

  runButton.addEventListener("click", runPrompt);
  clearButton.addEventListener("click", clearPrompt);
})();
