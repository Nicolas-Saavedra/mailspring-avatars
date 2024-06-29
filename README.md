## Avatars for Mailspring

Simple, naive implementation of Avatars in the Message List.<br>
Add avatar before each email you receive, no more, no less !<br>
No caching, might do a lot of image requests.

This fork was a personal modification, so it can base it's images on a few
common regex patterns that the `From` tag might have, in case an alias
overrides the regular email field. This is, also, a naive implementation,
but it does the trick for now.

Fork of [Striffly](https://github.com/Striffly/mailspring-avatars) project, thanks for his work !<br>

![Screenshot](screenshot.png)

## Installing

1. [Grab the latest release](https://github.com/Nicolas-Saavedra/mailspring-avatars/releases)
2. Extract Mailspring-Avatars and load Mailspring
3. From the menu, select `Developer > Install a Package Manually...` from the dialog, choose the directory of this plugin to install it

## Contribute

Install `node_modules` with `yarn` command.<br>
Once you have finish your edits in the `src` folder, compile with `yarn build`.
