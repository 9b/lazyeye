# LazyEye

LazyEye is a Google Chrome extension that attempts to extract the following items from browsed web pages:
* domains
* email addresses
* IP addresses
* hashes (MD5, SHA1, SHA256)

The extension allows for users to specify their endpoint that should recieve the JSON blob. The POSTed JSON has the following structure:

| Key             | Explanation                                         |
|-----------------|-----------------------------------------------------|
| urlContext      | URL where the content was collected from.           |
| collectionTime  | JavaScript date for the time of collection.         |
| userBrowser     | Browser user-agent of the collector.                |
| collectionData  | All the data collected, deduplicated and organized. |
| collectionCount | Number of items collected.                          |

To install, check the extension out and load the unpacked version into your browser or you can install from Google with the following link - https://chrome.google.com/webstore/detail/lazyeye/fcabijfilbebddchoefpglmnohbehgjk
