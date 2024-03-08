import { Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  h1: {
    display: "flex", //only accepts none or flex
    fontSize: 32,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h2: {
    display: "flex",
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h3: {
    display: "flex",
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h4: {
    display: "flex",
    fontSize: 16,
    marginTop: 1.33,
    marginBottom: 1.33,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h5: {
    display: "flex",
    fontSize: 14,
    marginTop: 1.67,
    marginBottom: 1.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h6: {
    display: "flex",
    fontSize: 12,
    marginTop: 2.33,
    marginBottom: 2.33,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
})

type Props = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: React.ReactNode
}

const Typography: React.FC<Props> = ({ variant, children }) => {
  return <Text style={styles[variant]}>{children}</Text>
}

export default Typography
