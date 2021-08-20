import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, Image, Text } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { useAuth } from "../Context/useAuth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authUs = useAuth();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log("stateChanged", authUser);
        authUs.handleUserAuth(authUser);
        navigation.replace("Home");
      }
    });
    return unsuscribe;
  }, []);

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err);
    }
  };

  // const user = auth.currentUser;
  // console.log("user auth", user);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.button}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    backgroundColor: "#FFB740",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderRadius: 6,
  },
});
