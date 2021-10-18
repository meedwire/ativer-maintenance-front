import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

interface Props {
  title: string;
  onPressPlus?: () => void;
}

const Header: React.FC<Props> = ({ title, onPressPlus }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{title}</Text>
      {onPressPlus && (
        <TouchableOpacity onPress={onPressPlus} style={styles.buttonAddNew}>
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { Header };
