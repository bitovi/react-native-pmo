import type { ComponentProps, FC, ReactNode } from "react"
import type { StyleProp, ViewStyle } from "react-native"
import { Image, Pressable, StyleSheet } from "react-native"
import Box from "../Box"
import Typography from "../Typography"

type Props = ComponentProps<typeof Box> & {
  style?: StyleProp<ViewStyle>
  image?: string
  title: ReactNode
  onPress?: () => void
}

const ListItem: FC<Props> = ({
  style,
  image,
  title,
  onPress,
  ...restOfProps
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box style={StyleSheet.compose(style, styles.container)} {...restOfProps}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 48, height: 48 }} />
        )}
        <Typography style={styles.title}>{title}</Typography>
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
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "500",
  },
})

export default ListItem
