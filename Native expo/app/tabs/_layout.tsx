import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const FocusedIcon = ({ focused, icons, title }: any) => {
  if (focused) {
    return (
      <View>
        <View className=" min-h-16 min-w-[126px] w-full mt-3 bg-purple-200 rounded-full gap-2 flex-row items-center justify-center px-2 shadow-md">
          <Ionicons name={icons} size={18} color="#4B5563" />

          {focused && (
            <Text className="font-semibold text-xl">{title}</Text>
          )}
        </View>
      </View>
    )
  }
  return (
    <View className="pt-3">
      <Ionicons name={icons} size={18} color="#ab8bff" />  </View>
  )
}

export default function Layout() {
  return (
   <GestureHandlerRootView className="flex-1">
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
        title: "landingPage", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="Home" icons="home-outline" />
        )
      }} />

      <Tabs.Screen name="Search" options={{
        title: "search", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="Search" icons="search-outline" />
        )
      }} />

      <Tabs.Screen name="profile" options={{
        title: "Profile", headerShown: false, tabBarIcon: ({ focused }) => (
          <FocusedIcon focused={focused} title="Profile" icons="person-outline" />
        )
      }} />
    </Tabs>
   </GestureHandlerRootView>
  );
}
