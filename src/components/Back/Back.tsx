import type { FC, ReactNode } from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import Box from "../Box"

type Props = {
  children?: ReactNode
}

const Back: FC<Props> = ({ children }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Box>
        <Icon name="arrow-back-outline" size={20} />
        {children}
      </Box>
    </Pressable>
  )
}

export default Back
