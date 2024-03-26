# Place My Order

## React Native vs Expo

Expo is a framework on top on React Native. Expo adds additional features to make development easier and is the recommended approach by the React Native docs. You will need the docs from both projects to work on this repo.

[React Native](https://reactnative.dev/docs/getting-started)

[Expo](https://docs.expo.dev/tutorial/introduction/)

## Setup

Prerequisites: Node >20, NPM

### Install dependencies

```
npm install
```

### Install Expo Go

Install Expo Go on your mobile device from the appropriate app store. This will allow you to quickly run demos you find online with your mobile device. This app will not run in Expo Go because of OAuth, but many other apps will so its a useful tool to be aware of.

### Emulators

To run the app locally, you’ll need

**iOS**: The full XCode (not just cli tools), homebrew, cocoapods (through homebrew)

**Android**: Android Studio, with the latest full version pack, emulator, and set up a virtual device.

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

You can run React Devtools with `npm run react-devtools`. This will start the DevTools up which will be ready to open with Metro's in-app dev menu. Alternatively, if you start up the Emulator after React DevTools is running it'll automatically watch the emulator.

While using the emulator if you wish to use the element inspector, run the `adb shell input keyevent 82` in the terminal.


## Links to documentation

### Core libraries

- [React Native](https://reactnative.dev/docs/components-and-apis)
- [Expo Framework](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/7.x/getting-started)

### Icons

- [Icon component](https://docs.expo.dev/guides/icons/)
- [Available icon list](https://ionic.io/ionicons)