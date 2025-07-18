import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, View } from "react-native";
import {  Wallet, PlusCircle, Clock, User, PlusSquare } from 'phosphor-react-native';

const FocusedIcon = ({ focused, IconComponent, title }: any) => {
  if (focused) {
    return (
      <View>
        <View className=" min-h-16 min-w-[90px] w-full  mt-3 bg-purple-300 rounded-full gap-1 flex-row items-center justify-center px-2 shadow-md">
          {IconComponent}
          <Text className="font-inter-semibold text-md">{title}</Text>
        </View>
      </View>
    )
  }
  return (
    <View className="pt-2">
      <View>{IconComponent}</View>

    </View>
  )
}

export const unstable_settings = {
  initialRouteName: "index",
};



export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#0f0D23",
        borderColor: "#0f0D23",
        borderRadius: 50,
        marginBottom: 25,
        height: 47,
        position: "absolute",
        overflow: "hidden",
        marginHorizontal: 10,
      }
    }}>

      <Tabs.Screen name="index" options={{
        title: "Home", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon
            focused={focused}
            title="Wallet"
            IconComponent={
              <Wallet
                size={focused ? 23 : 21}
                color={focused ? "#2E3540" : "#ab8bff"}
              />
            }
          />
        )
      }} />

      <Tabs.Screen name="add" options={{
        title: "add", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon
            focused={focused}
            title="Entries"
            IconComponent={
              <PlusSquare 
                size={focused ? 23 : 21}
                color={focused ? "#4B5563" : "#ab8bff"}
                weight="bold"
              />
            }
          />
        )
      }} />

      <Tabs.Screen name="history" options={{
        title: "history", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon
            focused={focused}
            title="History"
            IconComponent={
              <Clock
                size={focused ? 23 : 21}
                color={focused ? "#4B5563" : "#ab8bff"}
                weight="bold"
              />
            }
          />
        )
      }} />

      <Tabs.Screen name="profile" options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <FocusedIcon
            focused={focused}
            title="Profile"
            IconComponent={
              <User
                size={focused ? 23 : 21}
                color={focused ? "#4B5563" : "#ab8bff"}
                weight="bold"
              />
            }
          />
        )
      }} />


    </Tabs>
  );
}
