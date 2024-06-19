# Place My Order

## Setup

To run this repo, you must have one of these two operating systems:

- macOS 12 (Monterey) or newer
- Windows 10 (64-bit) or newer

The setup steps below will walk you through installing these dependencies across both operating systems:

- Node.js 20
- npm 10
- for Android:
  - JDK 17 or equivalent
  - Android Studio
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device
- for iOS:
  - macOS
  - Xcode or Xcode Command Line Tools
  - Xcode iOS Platform
  - Xcode iOS Simulator

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

### Install the development build

Install the app in the emulator with:

```
npm run android
```

and/or

```
npm run ios
```

It will open the emulator or browser for you as needed but it will not start the dev server, so the app will show the error "There was a problem loading the project. Failed to connect." As long as the app opens on the device, this was a success.

### Running

Start the development server with:

```
npm run start
```

and ensure it says "Using **development build**". If it says "Using **Expo Go**", press `s` to switch to the development build.

You can then press `a`, `i`, or `w` to run Android, iOS, or Web. You can run any or all of them at the same time. It will open the emulator or browser for you as needed.

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

## Troubleshooting

### Android

1. In the Virtual Device Manager, confirm that your image is running Android 14 with API 34.
2. In the Virtual Device Manager, click the 3 dots menu and "Wipe Data".
3. In the local repo, run npm run clean.
4. Run `npm run android` to install the app shell. It should launch the emulator with the error "There was a problem loading the project. Failed to connect."
5. Run `npm run start` and press `a` to load the app into the shell.

### iOS

1. In the iOS Simulator, go to Device >> Erase All Content and Settings...
1. In the local repo, run npm run clean.
1. Run `npm run ios` to install the app shell. It should launch the emulator with the error "There was a problem loading the project. Failed to connect."
1. Run `npm run start` and press `i` to load the app into the shell.

## Links to documentation

### Core libraries

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [React Navigation](https://reactnavigation.org/docs/7.x/getting-started)

### Icons

- [Available icon list](https://ionic.io/ionicons)
