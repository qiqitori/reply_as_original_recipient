# Reply As Original Recipient

This Thunderbird extension automatically changes the "From" field in replies to whatever the
original sender's email had in "To" or "CC", but only if exactly one email address from all "To"
and "CC" headers matches a configurable pattern.

To pack these files into an extension ready to use in Thunderbird, zip everything up (you don't
need the README.md or the LICENSE though) and change the .zip extension to .xpi.
Example:
```
git clone https://github.com/qiqitori/reply_as_original_recipient.git
cd reply_as_original_recipient
zip -r ../reply_as_original_recipient.xpi *
```

To change the pattern for "To"/"CC" matching, go to Thunderbird's "about:config" dialog
and edit the property `extensions.replyasoriginalrecipient.patterns`. Example patterns:
- `name+*@gmail.com`
- `*@example.org`
- `*+*` _(the default: email addresses containing a `+` are matched)_
- `*` _(any email address is matched)_
- `*@example.org,*+*` _(multiple patterns are separated by comma)_

The patterns are matched case insensitive against the full recipient e.g. My Name <my.name@example.com>
as well as the email (the part between < and >). Only `*` and `,` have special meaning in the patterns
option. Blanks at the beginning and the end are ignored.

For more information, see https://blog.qiqitori.com/?p=194
