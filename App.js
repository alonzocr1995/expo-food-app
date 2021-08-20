import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthProvider } from "./Context/ContextProvider";
import Menu from "./screens/Menu";
import Orders from "./screens/Orders";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ProductProvider } from "./Context/ContextProducts";
import { OrdersProvider } from "./Context/ContextOrders";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFB740" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <ProductProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={globalScreenOptions}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Orders" component={Orders} />
              </Stack.Navigator>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </ProductProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

// food app

// -Login Screen
// roles(admin, customer)

// -Admin
// orders
// tables
// menu(products)

// -Customer
// menu
