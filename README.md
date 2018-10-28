# Reply As Original Recipient

Thunderbird extension. This Thunderbird extension automatically changes the From: field in replies to whatever the original sender’s email had in To:, but only if there is a + in the email and there is only one address in To:.

To "compile" this into an extension ready to use in Thunderbird, zip everything up (you don't need the README.md or the LICENSE though) and change the .zip extension to .xpi.
Example:
```
git clone https://github.com/qiqitori/reply_as_original_recipient.git
cd reply_as_original_recipient
zip -r * ../reply_as_original_recipient.xpi
```

For more information, see https://blog.qiqitori.com/?p=194
