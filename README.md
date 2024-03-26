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

- Homebrew
- Watchman

Specific to Windows:

- Chocolatey
- Performance (Intel ® HAXM or equivalent)

### Install Node.js and npm

Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### macOS

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android) instructions for macOS.

Be sure to follow the quickstart instructions for:

- Watchman
- Java Development Kit
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable

#### Homebrew

Follow the “Install Homebrew” instructions on [Homebrew’s website](https://brew.sh).

After running the installer, follow these instructions:

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

### Install dependencies

Clone this repo and run:

```
npm ci
```

## Running the app

### Start the simulator

Follow the instructions in the “Using a virtual device” section (under “Preparing the Android device”) of the quickstart guide.

The Android Emulator must be running before you build the app.

### Build and launch the app

Run the app in the Android Emulator with:

```
npm run android
```

## React Native vs Expo

Expo is a framework on top on React Native. Expo adds additional features to make development easier and is the recommended approach by the React Native docs. You will need the docs from both projects to work on this repo.

[React Native](https://reactnative.dev/docs/getting-started)

[Expo](https://docs.expo.dev/tutorial/introduction/)

### Install Expo Go

Install Expo Go on your mobile device from the appropriate app store. This will allow you to quickly run demos you find online with your mobile device. This app will not run in Expo Go because of OAuth, but many other apps will so it’s a useful tool to be aware of.

### Running

`npm run <android|ios|web>`

You can also use `npm run start` and then press `a`, `i`, or `w` to run Android, iOS, or Web. The advantage of this method is you can multiple platforms from the same terminal by pressing multiple letters.

*Note:*

- When running iOS, it just runs.
- When running Web, it just runs.
- When running Android, run the virtual device first.

### Building

You can build web locally `expo export --web` and you can build Android on EAS (see RN docs, as you have to set up accounts). You should be able to build iOS on EAS, but it needs an active Apple Dev account with iOS access (which isn’t free, so I haven’t tested yet).

I’m sure you can trigger EAS from CI, but we may need to create a generic Bitovi account. I have not researched this yet. Free accounts are limited to 1 concurrent build at a time and take ~10 minutes, so this could become a bottleneck if we want it on all PRs.

### Debugging with React DevTools

You can run React Devtools with `npm run react-devtools`. This will start the DevTools up which will be ready to open with Metro's in-app dev menu. In running Metro app make sure to hit press 'd' to open the dev menu in React DevTools.
Alternatively, if you start up the Emulator after React DevTools is running it'll automatically watch the emulator. If for some reason it doesn't watch it, press 'd' on the terminal that opens for the Metro Dev server. 

While using the emulator if you wish to use the element inspector, run the `adb shell input keyevent 82` in the terminal.


## Links to documentation

### Core libraries

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [Expo Framework](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/7.x/getting-started)

### Icons

- [Icon component](https://docs.expo.dev/guides/icons/)
- [Available icon list](https://ionic.io/ionicons)
