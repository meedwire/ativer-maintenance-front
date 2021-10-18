import React from "react";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { IStructure } from "../../../../CommonTypes";
import { ItemListStage } from "../ItemListStage";

interface Props {
  data: IStructure[];
  handleEdit: (structure: IStructure) => void;
  handleDelete: (id: string) => void;
  marginLeft?: number;
  handleAdd: (id: string) => void;
}

const ListStructure: React.FC<Props> = ({
  data,
  handleEdit,
  handleDelete,
  marginLeft = 0,
  handleAdd,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ maxHeight: "80vh" }}
      renderItem={({ item, index }) => {
        return (
          <>
            <ItemListStage
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              structure={item}
              marginLeft={marginLeft}
              handleAdd={handleAdd}
            />
            {item.children && (
              <ListStructure
                data={item.children}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                marginLeft={marginLeft + 30}
                handleAdd={handleAdd}
              />
            )}
          </>
        );
      }}
    />
  );
};

export { ListStructure };
