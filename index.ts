import { AppRegistry } from "react-native"

import { name as appName } from "./app.json"
import App from "./src/OldApp"

AppRegistry.registerComponent(appName, () => App)
