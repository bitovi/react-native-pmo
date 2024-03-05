import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  h1: {
    display: "flex", //only accepts none or flex
    fontSize: 2,
    marginTop: 0.67,
    marginBottom: 0.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h2: {
    display: "flex",
    fontSize: 1.5,
    marginTop: 0.83,
    marginBottom: 0.83,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h3: {
    display: "flex",
    fontSize: 1.17,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h4: {
    display: "flex",
    fontSize: 1,
    marginTop: 1.33,
    marginBottom: 1.33,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h5: {
    display: "flex",
    fontSize: 0.83,
    marginTop: 1.67,
    marginBottom: 1.67,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  h6: {
    display: "flex",
    fontSize: 0.67,
    marginTop: 2.33,
    marginBottom: 2.33,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
});

type Props = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: any | null;
};

export const Typography: React.FC<Props> = ({ variant, children }) => {
  return <Text style={styles[variant]}>{children}</Text>;
};

export default Typography;
