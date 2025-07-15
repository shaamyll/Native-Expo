import { Link } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl font-extrabold text-primary ">Welcome</Text>
      <Text>Search movies you like</Text>
<Link href="/tabs/Search" asChild>
        <Button title="Search" />
      </Link>


   </View>
  );
}