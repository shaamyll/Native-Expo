import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, View } from "react-native";

const FocusedIcon = ({ focused, icons, title }: any) => {
  if (focused) {
    return (
      <View>
        <View className=" min-h-16 min-w-[90px] w-full  mt-3 bg-purple-300 rounded-full gap-2 flex-row items-center justify-center px-2 shadow-md">
          <Text className="mt-1"> <Ionicons name={icons} size={22} color="#4B5563" /></Text>

            <Text className="font-inter-semibold text-md">{title}</Text>
   
        </View>
      </View>
    )
  }
  return (
    <View className="pt-2">
      <Text><Ionicons name={icons} size={22} color="#ab8bff" />  </Text>
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
          <FocusedIcon focused={focused} title="Wallet" icons="wallet-outline" />
        )
      }} />

      <Tabs.Screen name="add" options={{
        title: "add", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="Add Entry" icons="add-outline" />
        )
      }} />

      <Tabs.Screen name="history" options={{
        title: "history", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="History" icons="time-outline" />
        )
      }} />

       <Tabs.Screen name="profile" options={{
        title: "profile", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="Profile" icons="person-outline" />
        )
      }} />

    </Tabs>
  );
}
