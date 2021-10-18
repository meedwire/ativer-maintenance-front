import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { api } from "../../services";
import { Toast } from "../../utils";
import { LoadingIndicator } from "../LoadingIndicator";
import { ItemImage, TextHeaderImage } from "./components";
import styles from "./styles";

interface Props {
  defaultData?: {
    id: string;
  };
}

interface IImages {
  id: string;
  label: string;
  index: number;
  value: string;
  children: {
    id: string;
    label: string;
    index: number;
    value: string;
    children: {
      id: string;
      isAfter: boolean;
      base64: string;
    }[];
  }[];
}
[];

const ModalImages: React.FC<Props> = ({ defaultData }) => {
  const [images, setImages] = useState<IImages[] | undefined>();

  const getImages = useCallback(async () => {
    try {
      const { data } = await api.get(`/images/get/${defaultData.id}`);

      console.log(data);

      setImages(data);
    } catch (error) {
      Toast.show("Ocorreu um erro ao tentar buscar as imagens", 3000, "error");
    }
  }, []);

  useEffect(() => {
    getImages();
  }, [defaultData]);

  function handleDownload(
    data: Array<{
      id: string;
      isAfter: boolean;
      base64: string;
    }>
  ) {
    data.forEach((item) => {
      const a = document.createElement("a");
      a.href = `data:image/png;base64,${item.base64}`;
      a.download = `${item.id}.png`;
      a.click();
    });
  }

  if (!images) {
    return (
      <View style={styles.loading}>
        <LoadingIndicator />;
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        {images?.map((stage) => (
          <View key={stage.id}>
            <Text style={styles.textStep}>{stage.label}</Text>
            {stage.children.map((step) => (
              <View key={step.id}>
                <TextHeaderImage
                  text={step.label}
                  onPress={() => handleDownload(step.children.filter(item => !item.isAfter))}
                />
                <ScrollView horizontal>
                  {step.children.map(({ base64, isAfter, id }) => (
                    <ItemImage
                      key={id}
                      id={id}
                      isAfter={!isAfter}
                      uri={base64}
                    />
                  ))}
                </ScrollView>
                <TextHeaderImage
                  text={step.label}
                  isAfter
                  onPress={() => handleDownload(step.children.filter(item => item.isAfter))}
                />
                <ScrollView horizontal>
                  {step.children.map(({ base64, isAfter, id }) => (
                    <ItemImage
                      key={id}
                      id={id}
                      isAfter={isAfter}
                      uri={base64}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export { ModalImages };
