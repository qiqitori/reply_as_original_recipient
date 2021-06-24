// Inject the actual extension script
Services.scriptloader.loadSubScript("chrome://replyasoriginalrecipient/content/composeOverlay.js", window, "UTF-8");

// WindowListener API requirement
function onLoad(activatedWhileWindowOpen) {
}

// WindowListener API requirement
function onUnload(deactivatedWhileWindowOpen) {
}
