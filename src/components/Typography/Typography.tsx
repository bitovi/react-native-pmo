import type { FC } from "react";
import type { TextProps } from "react-native";
import { Text, StyleSheet } from "react-native";
import type { Theme } from "../../theme/theme";
import useTheme from "../../theme/useTheme";

type Props = TextProps & {
  variant?: keyof Theme["textStyles"];
  color?: keyof Theme["colors"];
};

const Typography: FC<Props> = ({
  style,
  variant = "body",
  color,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={StyleSheet.compose(style, {
        color: color && theme.colors[color],
        ...theme.textStyles[variant],
      })}
    >
      {children}
    </Text>
  );
};

export default Typography;
