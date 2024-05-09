import Box, { BoxProps } from "../Box"

import { useTheme } from "../theme"

export interface ScreenProps extends BoxProps {}

const Screen: React.FC<ScreenProps> = ({ children, style, ...props }) => {
  const { palette } = useTheme()

  return (
    <Box
      padding="s"
      style={{
        height: "100%",
        backgroundColor: palette.screen.soft,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Screen
