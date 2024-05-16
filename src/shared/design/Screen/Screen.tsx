import Box, { BoxProps } from "../Box"
import { useTheme } from "../theme"

export interface ScreenProps extends BoxProps {
  noScroll?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  noScroll = false,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box
      scrollable={!noScroll}
      padding="s"
      style={{
        minHeight: "100%",
        backgroundColor: theme.palette.screen.soft,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Screen
