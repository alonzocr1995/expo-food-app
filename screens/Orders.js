import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db } from "../firebase";
import SelectDropdown from "react-native-select-dropdown";

const Orders = () => {
  const [ordersReadyStatus, setOrdersReadyStatus] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);

  const handleUpdateIsReadyOrder = async ({ id, isReady, ...order }) => {
    console.log("orderstatus", order);
    console.log("orderid", id);
    try {
      await db
        .collection("orders")
        .doc(id)
        .set({ isReady: !isReady, ...order });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    db.collection("orders")
      .where("isReady", "==", ordersReadyStatus)
      .onSnapshot((snapshot) =>
        setOrderList(
          snapshot.docs.reduce((orderLista, order) => {
            const orders = { id: order.id, ...order.data() };
            console.log("another one", orders);
            orderLista.push(orders);
            return orderLista;
          }, [])
        )
      );
  }, [ordersReadyStatus]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* <SelectDropdown
            defaultButtonText="Select"
            data={["Ready Orders", "Pending Orders"]}
            buttonStyle={{ width: "80%" }}
          /> */}
          {orderList.map((order, i) => (
            <View
              key={i}
              style={{
                backgroundColor: "rgb(184, 182, 182)",
                margin: 4,
                minWidth: 300,
                minHeight: 150,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Order {i + 1}
              </Text>
              {order.products.map(({ product, id, quantity }, i) => (
                <View
                  key={id}
                  style={{
                    margin: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "black", paddingRight: 10 }}>
                    {product}
                  </Text>
                  <Text style={{ color: "black" }}>{quantity}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={{ position: "absolute", right: 5, bottom: 5 }}
              >
                <Switch
                  onChange={() => handleUpdateIsReadyOrder(order)}
                  value={order.isReady}
                />
              </TouchableOpacity>
            </View>
          ))}
          {/* <BottomSheetModal
        //   ref={bottomSheetRef}
        //   index={1}
        //   snapPoints={snapPoints}
        //   backdropComponent={BottomSheetBackdrop}
        // ></BottomSheetModal> */}
        </ScrollView>
      </View>
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
});
