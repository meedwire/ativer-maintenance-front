import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import styles from "./styles";

interface Props {
  uri: string;
  isAfter?: boolean;
  id?: string;
}

const ItemImage: React.FC<Props> = ({ uri, isAfter, id }) => {
  if (!isAfter) {
    return null;
  }

  function handleDownload(){
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${uri}`
    a.download = `${id}.png`;
    a.click();
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `data:image/png;base64,${uri}` }}
      />
      <TouchableOpacity onPress={handleDownload} style={styles.containerButtonDownload}>
        <Icon name="download" size={25} color="#dadada" />
      </TouchableOpacity>
    </View>
  );
};

export { ItemImage };
