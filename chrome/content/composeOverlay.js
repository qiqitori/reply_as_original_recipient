/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Adapted from the Reply to All as Cc extension (v1.4) */


var ReplyAsOriginalRecipient = {
  isReply: function() {
    /* Is this a reply? */
    composeType = gMsgCompose.type;
    availableComposeTypes = Components.interfaces.nsIMsgCompType
    return (composeType == availableComposeTypes.ReplyToSender || // normal reply
            composeType == availableComposeTypes.Reply || // dunno
            composeType == availableComposeTypes.ReplyAll) // reply to all
  },

  getMessageHeaderFromURI: function(aURI) {
    return Components.classes['@mozilla.org/messenger;1']
                     .getService(Components.interfaces.nsIMessenger)
                     .msgHdrFromURI(aURI);
  },

  init: function() {
    if (!this.isReply())
      return;

    /* Get patterns preference (modified by Samuel Kirschner, according to the comment on https://blog.qiqitori.com/?p=194 ) */
    var patterns = Components.classes["@mozilla.org/preferences-service;1"]
    	.getService(Components.interfaces.nsIPrefService)
    	.getBranch("extensions.replyasoriginalrecipient.")
    	.getCharPref("patterns"); // default is "*+*"
    var mimeConvert = Components.classes["@mozilla.org/messenger/mimeconverter;1"]
        .getService(Components.interfaces.nsIMimeConverter);
	patterns = patterns.trim()
		.replace(/[^a-zA-Z0-9 ]/g, '\\$&')
		.replace(/\\\*/g, '.*')
		.split(/ *\\, */)
		.join('|');
	var regex = new RegExp('^ *(' + patterns + ') *$|< *(' + patterns + ') *>', 'i');

    /* Get original recipient (modified by Samuel Kirschner, according to the comment on https://blog.qiqitori.com/?p=194 ) */
	var i;
    var originalHeader = this.getMessageHeaderFromURI(gMsgCompose.originalMsgURI);
    var originalRecipient = null;

	var recipientList = (originalHeader.recipients + ',' + originalHeader.ccList).split(/,/);
	for (i = 0; i < recipientList.length; i++) {
		var recipient = mimeConvert.decodeMimeHeader(recipientList[i].trim(), null, false, true);
		if (recipient && regex.test(recipient)) {
			if (originalRecipient !== null && originalRecipient !== recipientList[i].trim()) return; //abort in case there is more than one match
			originalRecipient = mimeConvert.decodeMimeHeader(recipientList[i].trim(), null, false, true);
		}
	}
	if (originalRecipient === null) return; // abort in case there was no match

	// Remove any name part from the matched original recipient
	var match = originalRecipient.match(/< *(.+?) *>/);
	if (match) {
		originalRecipient = match[1];
	}

    /* Adapted from mail/components/compose/content/MsgComposeCommands.js */
    var customizeMenuitem = document.getElementById("cmd_customizeFromAddress");
    customizeMenuitem.setAttribute("disabled", "true");
    customizeMenuitem.setAttribute("checked", "true");
    var identityElement = document.getElementById("msgIdentity");
    identityElement.removeAttribute("type");
    identityElement.editable = true;
    identityElement.focus(); // if we don't do this, we won't be able to send off our email. sounds odd but it's true
	if (identityElement.value.match(/<.+?>/)) {
		identityElement.value = identityElement.value.replace(/<.+?>/, "<" + originalRecipient + ">");
	}
	else {
		identityElement.value = originalRecipient;
	}
    identityElement.select();

    /* Return focus to editor */
    var contentFrame = document.getElementById("content-frame");
    contentFrame.focus();
  },

  handleEvent: function(aEvent) {
    switch (aEvent.type) {
      case 'compose-window-init':
        document.documentElement.addEventListener('compose-window-close', this, false);
        window.addEventListener('unload', this, false);
        gMsgCompose.RegisterStateListener(this);
        return;

      case 'compose-window-close':
        gMsgCompose.UnregisterStateListener(this);
        return;

      case 'unload':
        document.documentElement.removeEventListener('compose-window-init', this, false);
        document.documentElement.removeEventListener('compose-window-close', this, false);
        window.removeEventListener('unload', this, false);
        return;
    }
  },

  // nsIMsgComposeStateListener
  NotifyComposeFieldsReady: function() {
    // do it after all fields are constructed completely.
    this.init();
  },
  NotifyComposeBodyReady: function() {},
  ComposeProcessDone: function() {},
  SaveInFolderDone: function() {}
};

document.documentElement.addEventListener('compose-window-init', ReplyAsOriginalRecipient, false);
