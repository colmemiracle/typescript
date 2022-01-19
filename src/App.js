import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import dragon from "./dragon.png";
import elf from "./elf.png";
import fairy from "./fairy.png";
import gnom from "./gnom.png";
import online from "./online.png";
import offline from "./offline.png";

const Stack = createNativeStackNavigator();

const contacts = [
  {
    avatar: dragon,
    name: "Jones",
    status: "online",
    mess: ["do u have gold? ", "how much in need?"]
  },
  {
    avatar: elf,
    name: "Ward",
    status: "offline",
    mess: ["where is your unicorn", "haven't u found her yet?"]
  },
  {
    avatar: fairy,
    name: "Moore",
    status: "online",
    mess: ["u have some dust?", "nope, im all out", "fj"]
  },
  {
    avatar: gnom,
    name: "Cook",
    status: "offline",
    mess: ["deal", "meet u by 8"]
  }
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ title: "WizaWoo" }}
        />
        <Stack.Screen
          name="contact"
          component={Contact}
          options={({ route }) => {
            let index = route.params.index;
            return {
              img: contacts[index].avatar,
              title: contacts[index].name,
              stat: contacts[index].status,
              headerTitle: () => (
                <View>
                  <Image
                    source={contacts[index].avatar}
                    style={{ width: 30, height: 30, marginRight: 5 }}
                  />
                  <Text>{contacts[index].name}</Text>
                  <Text>{contacts[index].status}</Text>
                </View>
              )
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }) {
  return (
    <FlatList
      data={contacts}
      renderItem={(props) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("contact", {
              index: props.index
            });
          }}
          style={{
            flexDirection: "row",
            marginBottom: 15,
            padding: 5,
            borderBottom: "solid 1px gray"
          }}
        >
          <Image
            source={props.item.avatar}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />

          <Text style={{ fontSize: 18, fontWeight: 500, marginRight: 5 }}>
            {props.item.name}
          </Text>

          <Text style={{ fontSize: 13, marginRight: 5 }}>
            {props.item.status}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

function Contact({ route }) {
  let index = route.params.index;
  return (
    <View>
      <FlatList
        data={contacts[index].mess}
        renderItem={(props) => (
          <Text style={{ textAlign: props.index % 2 === 0 ? "left" : "right" }}>
            {props.item}
          </Text>
        )}
      />
    </View>
  );
}

export default App;
