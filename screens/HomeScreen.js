import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../Context/useAuth";
import { auth } from "../firebase";
import Menu from "./Menu";
import Orders from "./Orders";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import ButtonNav from "../UI/ButtonNav";

const HomeScreen = ({ navigation }) => {
  const authU = useAuth();
  const user = authU.currentUser.displayName;

  console.log("current user", user);

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {user === "admin" ? (
            <>
              <TouchableOpacity
                onPress={signOutUser}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <FontAwesome name="sign-out" size={24} color="white" />
                <Text style={{ color: "white" }}>sign out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {user === "admin" && (
          <ButtonNav
            name="ORDERS"
            onPress={() => navigation.navigate("Orders")}
          />
        )}
        <ButtonNav name="MENU" onPress={() => navigation.navigate("Menu")} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
