import { ViewStyle, StyleSheet } from "react-native"
import { Theme, useTheme } from "../theme"
import Box, { BoxProps } from "../Box"

import Typography from "../Typography"

export interface CardProps extends BoxProps {
  title?: string
}

const Card: React.FC<CardProps> = ({ title, children, ...props }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box margin="s" style={styles.container} {...props}>
      {title && (
        <Box padding="m" style={styles.title}>
          <Typography variant="title">{title}</Typography>
        </Box>
      )}

      <Box padding="m">{children}</Box>
    </Box>
  )
}

export default Card

function getStyles(theme: Theme): {
  container: ViewStyle
  title: ViewStyle
} {
  return StyleSheet.create({
    container: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,

      backgroundColor: theme.palette.screen.main,
      shadowColor: theme.palette.screen.contrast,
    },
    title: {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.screen.contrast,
    },
  })
}