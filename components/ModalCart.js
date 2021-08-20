import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useProduct } from "../Context/useProduct";
import NumericInput from "react-native-numeric-input";
import { db } from "../firebase";
import * as firebase from "firebase";

const ModalCart = ({ showModal, setShowModal }) => {
  const { products, deleteProduct, handleProductQuantity, deleteProducts } =
    useProduct();

  const handleCreateOrder = async () => {
    try {
      await db.collection("orders").add({
        products,
        isReady: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      deleteProducts();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalContainerBackdrop}>
        <View
          style={{
            position: "absolute",
            top: 25,
            backgroundColor: "#FFB740",
            padding: 5,
            borderRadius: 5,
            width: 200,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Restaurant Cart</Text>
        </View>

        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <AntDesign name="close" size={24} />
          </TouchableOpacity>

          {products?.map((prod, i) => (
            <View
              style={{
                flexDirection: "row",
                minHeight: 50,
                width: "90%",
                backgroundColor: "grey",
                margin: 5,
                borderRadius: 5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={i}
            >
              <Text style={{ color: "white" }}>{prod.product}</Text>
              <NumericInput
                type="up-down"
                onChange={(quantity) =>
                  handleProductQuantity(prod.id, quantity)
                }
                value={prod.quantity}
                minValue={0}
                valueType="integer"
                iconSize={10}
                textColor="white"
                iconStyle={{ color: "grey" }}
                totalHeight={30}
                totalWidth={80}
              />
              <TouchableOpacity onPress={() => deleteProduct(prod.id)}>
                <AntDesign name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleCreateOrder}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            disabled={!products.length}
          >
            <AntDesign name="pluscircle" size={24} color={"grey"} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCart;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainerBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 0,0,0,0.3)",
  },
  // numInputContainer: {
  //   position: "absolute",
  //   bottom: 5,
  //   right: 5,
  // },
});
