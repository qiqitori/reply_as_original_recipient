# Reply As Original Recipient

This Thunderbird extension automatically changes the "From" field in replies to whatever the original sender's email had in "To", but only if the email address matches a configurable pattern (default: "*+*") and there is only one address in "To".

To pack these files into an extension ready to use in Thunderbird, zip everything up (you don't need the README.md or the LICENSE though) and change the .zip extension to .xpi.
Example:
```
git clone https://github.com/qiqitori/reply_as_original_recipient.git
cd reply_as_original_recipient
zip -r * ../reply_as_original_recipient.xpi
```

To change the pattern for "From" matching, go to Thunderbird's "about:config" and edit the property
"extensions.replyasoriginalrecipient.patterns". The value "*" would cause all email adresses to be matched.

For more information, see https://blog.qiqitori.com/?p=194
