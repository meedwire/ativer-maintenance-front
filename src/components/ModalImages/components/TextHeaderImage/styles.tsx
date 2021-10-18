import { StyleSheet } from "react-native";
import { Theme } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  text: {
    color: Theme.colors.dark.text,
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: "600",
    marginRight: "auto",
  },
});
