(async () => {
	messenger.WindowListener.registerDefaultPrefs("defaults/preferences/defaults.js");

	// Equivalence to the legacy chrome.manifest
	messenger.WindowListener.registerChromeUrl([["content", "replyasoriginalrecipient", "chrome/content/"]]);
	messenger.WindowListener.registerWindow("chrome://messenger/content/messengercompose/messengercompose.xhtml", "chrome://replyasoriginalrecipient/content/overlayInjector.js");

	messenger.WindowListener.startListening();
})();
