import type { ComponentPropsWithoutRef, FC, ReactNode } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "../theme"
import Box from "../Box"
import Typography from "../Typography"

type Props = ComponentPropsWithoutRef<typeof Box> & {
  headline?: ReactNode
}

const Card: FC<Props> = ({
  headline,
  children,
  padding = "m",
  style,
  ...restOfProps
}) => {
  const theme = useTheme()

  return (
    <Box
      style={StyleSheet.compose(
        {
          width: "100%",
          marginVertical: theme.spacing.m,
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
        },
        style,
      )}
      {...restOfProps}
    >
      {headline && (
        <Box
          padding={padding}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          }}
        >
          {typeof headline === "string" ? (
            <Typography variant="title">{headline}</Typography>
          ) : (
            headline
          )}
        </Box>
      )}
      <Box padding={padding}>{children}</Box>
    </Box>
  )
}

export default Card
