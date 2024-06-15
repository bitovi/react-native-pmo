import { Slot } from "expo-router"

import ThemeProvider from "../shared/design/theme"
import AuthProvider from "../shared/services/auth"
import DataMigration from "../shared/services/DataMigration"
import FavoritesSync from "../shared/services/pmo/favorite"

const RootLayout: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataMigration>
          <Slot />

          <FavoritesSync />
        </DataMigration>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default RootLayout
