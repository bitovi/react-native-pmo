import { Stack } from "expo-router"

import Box, { BoxProps } from "../Box"
import { useTheme } from "../theme"

export interface ScreenProps extends BoxProps {
  noScroll?: boolean
  title?: string
}

const Screen: React.FC<ScreenProps> = ({
  noScroll = false,
  title,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      scrollable={!noScroll}
      padding="s"
      style={[
        {
          flex: 1,
          backgroundColor: theme.palette.screen.soft,
        },
        style,
      ]}
    >
      {title && <Stack.Screen options={{ title }} />}

      {children}
    </Box>
  )
}

export default Screen
