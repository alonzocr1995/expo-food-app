import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import NumericInput from "react-native-numeric-input";
import { useAuth } from "../Context/useAuth";

const FoodCard = ({ item, price, onPress, onRemove }) => {
  const authUser = useAuth();
  const user = authUser.currentUser.displayName;

  const [quantity, setQuantity] = useState(1);
  return (
    <View
      style={{
        width: 150,
        height: 100,
        backgroundColor: "#d4d3d3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 5,
        padding: 5,
      }}
    >
      <Text style={{ color: "#000" }}>{item}</Text>
      <Text style={{ color: "#000" }}>{price}</Text>
      <View style={{ position: "absolute", bottom: 5, left: 5 }}>
        <NumericInput
          type="plus-minus"
          onChange={setQuantity}
          value={quantity}
          minValue={0}
          valueType="integer"
          iconSize={10}
          step={1}
          textColor="black"
          iconStyle={{ color: "black" }}
          totalHeight={25}
          totalWidth={50}
          // containerStyle={{ borderStyle: "solid", borderColor: "black" }}
        />
      </View>
      {user === "admin" ? (
        <TouchableOpacity
          onPress={onRemove}
          style={{ position: "absolute", top: 5, right: 5 }}
        >
          <AntDesign name="delete" size={15} color="white" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={() => onPress(quantity)}
        style={{ position: "absolute", bottom: 3, right: 5 }}
      >
        <Ionicons name="add-circle-sharp" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({});
