import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import ButtonNav from "../UI/ButtonNav";
import { Input } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { db } from "../firebase";

const AddProductBottomSheet = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [newProductName, setNewProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  const categories = ["Fast Food", "Desserts"];

  console.log(newProductName, productPrice);
  const createNewProduct = async () => {
    try {
      await db.collection("foods").add({
        category: selectedCategory,
        newProduct: newProductName,
        price: productPrice,
      });
      setSelectedCategory("");
      setNewProductName("");
      setProductPrice("");
      bottomSheetRef?.current.close();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <View style={{ position: "absolute", bottom: 8, right: 8 }}>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef?.current.present();
          }}
          style={{
            width: 150,
            backgroundColor: "#FFB740",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            buttonStyle={{ width: "100%" }}
            defaultButtonText="Select Category"
            data={categories}
            onSelect={(selectedItem, i) => {
              setSelectedCategory(selectedItem);
            }}
          />
          <Input
            placeholder="Enter New Product Name"
            value={newProductName}
            onChangeText={(text) => setNewProductName(text)}
          />
          <Input
            placeholder="Enter Price"
            keyboardType="number-pad"
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
          />

          <ButtonNav name="Add" onPress={createNewProduct} />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default AddProductBottomSheet;

const styles = StyleSheet.create({});
