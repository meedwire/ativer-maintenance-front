import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";

interface Props {
  text: string;
  isAfter?: boolean;
  onPress?: () => void;
}

const TextHeaderImage: React.FC<Props> = ({ isAfter, text, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${text} > Imagens ${
        isAfter ? "(DEPOIS)" : "(ANTES)"
      }`}</Text>
      <TouchableOpacity onPress={onPress}>
        <Icon name="download" size={25} color="#dadada" />
      </TouchableOpacity>
    </View>
  );
};

export { TextHeaderImage };
