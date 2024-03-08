import type { ComponentProps, FC, ReactNode } from "react"
import type { StyleProp, ViewStyle } from "react-native"
import { Image, Pressable, StyleSheet } from "react-native"
import type { Theme } from "../../theme/theme"
import useTheme from "../../theme/useTheme"
import Box from "../Box"

type Props = ComponentProps<typeof Box> & {
  style?: StyleProp<ViewStyle>
  image?: string
  children: ReactNode
  onPress?: () => void
}

const ListItem: FC<Props> = ({
  style,
  image,
  children,
  onPress,
  ...restOfProps
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        style={StyleSheet.compose(style, styles.container)}
        {...restOfProps}
      >
        {image && <Image source={{ uri: image }} style={{ width: 48, height: 48 }} />}
        {children}
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    minHeight: 48,
    width: "100%",
  },
})

export default ListItem
