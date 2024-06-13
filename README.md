# Place My Order

## Setup

To run this repo, you must have one of these two operating systems:

- macOS 12 (Monterey) or newer
- Windows 10 (64-bit) or newer

The setup steps below will walk you through installing these dependencies across both operating systems:

- Node 18 or newer
- npm 9 or newer
- JDK 17 or equivalent
- Android Studio
- Android SDK
- Android SDK Platform
- Android Virtual Device

Specific to macOS:

- Node Version Manager (nvm)
- Homebrew
- Watchman

Specific to Windows:

- NVM for Windows
- Chocolatey
- Performance (Intel ® HAXM or equivalent)

### macOS

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android) instructions for macOS.

Be sure to follow the quickstart instructions for:

- Watchman
- Java Development Kit
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable

#### Node.js and npm

Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

We recommend [using nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
to install Node because it allows you to manage multiple versions of Node for different projects.

#### Homebrew

Follow the “Install Homebrew” instructions on [Homebrew’s website](https://brew.sh).

After running the installer, be sure to follow the instructions it prints:

```
Warning: /opt/homebrew/bin is not in your PATH.
  Instructions on how to configure your shell for Homebrew
  can be found in the 'Next steps' section below.

==> Next steps:
- Run this command in your terminal to add Homebrew to your PATH:
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### Watchman

Use Homebrew to install Watchman:

```
brew install watchman
```

#### Java Development Kit

Install the Java Development Kit with these commands:

```
brew tap homebrew/cask-versions
brew install --cask zulu17

# Get path to where cask was installed to double-click installer
brew info --cask zulu17
```

> After you install the JDK, update your JAVA_HOME environment variable. If you used above steps, JDK will likely be at /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

#### Install Android Studio

Follow the instructions in the quickstart guide.

#### Install the Android SDK

Follow the instructions in the quickstart guide.

#### Configure the ANDROID_HOME environment variable

Follow the instructions in the quickstart guide.

### Windows

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=windows&platform=android) instructions for your operating system.

Be sure to follow the quickstart instructions for:

- JDK
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable
- Add platform-tools to Path

#### Node.js and npm

Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

We recommend [using NVM for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)
to install Node because it allows you to manage multiple versions of Node for different projects.

You can also follow [Microsoft’s instructions for setting up Node.js on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

For some of the instructions, you may need to [open the command prompt or PowerShell as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/).

#### Chocolatey

[Install Chocolatey](https://chocolatey.org/install) before installing the JDK.

#### JDK

Follow the instructions in the quickstart guide.

#### Install Android Studio

Follow the instructions in the quickstart guide.

#### Install the Android SDK

Follow the instructions in the quickstart guide.

#### Configure the ANDROID_HOME environment variable

Follow the instructions in the quickstart guide.

#### Add platform-tools to Path

Follow the instructions in the quickstart guide.

## Running the app

### Install dependencies

Clone this repo and run:

```
npm ci
```

### Start the emulator

Follow the instructions in the “Using a virtual device” section (under “Preparing the Android device”) of the quickstart guide.

The Android Emulator must be running before you build the app.

### Build and launch the app

Run the app in the Android Emulator with:

```
npm run android
```

### Running

`npm run <android|ios|web>`

You can also use `npm run start` and then press `a`, `i`, or `w` to run Android, iOS, or Web. The advantage of this method is you can multiple platforms from the same terminal by pressing multiple letters.

_Note:_

- When running iOS, it just runs.
- When running Web, it just runs.
- When running Android, run the virtual device first.

### Debugging with React DevTools

You can run React Devtools with `npm run react-devtools`. This will start the DevTools up which will be ready to open with Metro's in-app dev menu. In running Metro app make sure to hit press 'd' to open the dev menu in React DevTools.
Alternatively, if you start up the Emulator after React DevTools is running it'll automatically watch the emulator. If for some reason it doesn't watch it, press 'd' on the terminal that opens for the Metro Dev server.

While using the emulator if you wish to use the element inspector, run the `adb shell input keyevent 82` in the terminal.

### Running the local place-my-order-api server for the android emulator

By default, the Android emulator won't be able to access your localhost server.
In order to connect it to the emulator run the `adb reverse tcp:7070 tcp:7070` command.
Make sure if you're running the place-my-order-api on a different port to replace the `7070` with `port`
e.g. if you're running on port 3030, run `adb reverse tcp:3030 tcp:3030`

### Cleaning build cache

While developing or making changes to the `.env` the emulator will use cached results, so you may not see your changes.
To amend this, shut off the emulator and use the `npm run clean` command. After starting up the emulator should take the new `.env` variables.

### Common Emulator Issues

When using the `npm run android` command, if an existing instance of the emulator is running it will add a message that says so. Be sure the terminal window that was hosting the React Native dev server isn't still on.

When turning off the emulator, use `Ctrl+C` to stop the server from running before closing the terminal window. If you're struggling to run the emulator because there is another instance running, there is a chance you may have closed the terminal before stopping the server. In this case, you may have to use Task Manager or Activity Monitor to close the rogue instance of the server. Finally, if none of the proposed solutions work, just try restarting your work system.

## Links to documentation

### Core libraries

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [React Navigation](https://reactnavigation.org/docs/7.x/getting-started)

### Icons

- [Available icon list](https://ionic.io/ionicons)
