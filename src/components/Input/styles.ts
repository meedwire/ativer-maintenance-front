import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../theme";

export default StyleSheet.create({
  container: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
  input: {
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "white",
    borderColor: "rgb(50, 205, 0)",
    borderWidth: 1,
    color: "#1e1e1e",
    padding: Theme.padding.M,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
  label: {
    color: Theme.colors.dark.text,
  },
  textError: {
    color: "rgba(255, 20, 0, 0.3)",
  },
});
