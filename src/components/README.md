# Component Library

Components in this directory are reusable, generic components designed to be utilized throughout the app. Components that are specific to a page or another component should be within the directory of that page or component.

## Ideology

Whether in React Native or classic React, applications should utilize shared, reusable components as often as possible. Avoid reimplementing common designs. A component library ensures visual consistency across the UI while also saving developer effort.

### Links

These posts are the inspiration for how this component library was implemented.

- [Thoughtbot](https://thoughtbot.com/blog/structure-for-styling-in-react-native)
- [Shopify](https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow)

## Basic building blocks

`<Box>` and `<Typography>` are base components that will be used to build most other components, including other reusable components.

### Box

`<View>` is the root React Native component. Everything must be inside a `<View>` at some level. We have created `<Box>` as a wrapper to use instead of `<View>` and added a few shorthand props for commonly needed styles like padding and margin. You can use `<Box>` instead of `<View>` everywhere.

### Typography

All text in React Native must be inside a `<Text>` element. We have created `<Typography>` as a wrapper to use instead of `<Text>` and added a few props to select common variants and set the text color.
