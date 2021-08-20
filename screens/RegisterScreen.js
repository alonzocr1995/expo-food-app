import React, { useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import SelectDropdown from "react-native-select-dropdown";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const roles = ["admin", "customer"];

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: selectedRole,
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text
        h3
        style={{
          marginBottom: 50,
          marginLeft: 4,
          fontSize: 17,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Create new Role
      </Text>
      <View style={styles.inputContainer}>
        <SelectDropdown
          buttonStyle={{ width: "100%" }}
          defaultButtonText="Select Role"
          data={roles}
          onSelect={(role, i) => {
            setSelectedRole(role);
          }}
        />

        <Input
          placeholder="Email"
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
        />
      </View>
      <TouchableOpacity style={styles.button} raised onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: 200,
    backgroundColor: "#FFB740",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  inputContainer: {
    width: 300,
  },
});
