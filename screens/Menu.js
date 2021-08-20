import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";

import AddProductBottomSheet from "../components/AddProductBottomSheet";
import { db } from "../firebase";

import FoodCard from "../UI/FoodCard";
import ModalCart from "../components/ModalCart";
import { useProduct } from "../Context/useProduct";
import { useAuth } from "../Context/useAuth";

const Menu = ({ navigation }) => {
  const [menu, setMenu] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddProduct } = useProduct();
  const authU = useAuth();
  const user = authU.currentUser.displayName;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="cart-plus"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleDeleteMenuItem = async (id) => {
    try {
      await db.doc(`foods/${id}`).delete();
    } catch (error) {
      alert(err);
    }
  };

  useEffect(() => {
    const unsubscribe = db.collection("foods").onSnapshot((snapshot) => {
      setMenu(
        snapshot.docs.reduce((menuList, food) => {
          const foodData = { id: food.id, ...food.data() };
          if (menuList[foodData.category]) {
            menuList[foodData.category].push(foodData);
          } else {
            menuList[foodData.category] = [foodData];
          }
          return menuList;
        }, {})
      );
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // console.log("menu", menu);
  return (
    <>
      <ModalCart showModal={showModal} setShowModal={setShowModal} />
      <ScrollView>
        {Object.keys(menu).map((category, index) => (
          <View key={index}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{category}</Text>
            <ScrollView horizontal>
              {menu[category].map((data, i) => (
                <FoodCard
                  onRemove={() => handleDeleteMenuItem(data.id)}
                  key={i}
                  onPress={(quantity) =>
                    handleAddProduct({
                      product: data.newProduct,
                      price: data.price,
                      id: data.id,
                      quantity,
                    })
                  }
                  item={data.newProduct}
                  price={data.price}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      {user === "admin" ? <AddProductBottomSheet /> : <></>}
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({});
