import type { FC } from "react"
import Box from "../Box"
import { ActivityIndicator } from "react-native"
import useTheme from "../../theme/useTheme"
import Typography from "../Typography"

const Loading: FC = () => {
  const { theme } = useTheme()

  return (
    <Box padding="l">
      <ActivityIndicator size="large" color={theme.colors.secondary} />
      <Typography variant="body" style={{ textAlign: "center", marginTop: 8 }}>
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading
