import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { UseNavigation } from "../../types/navigation";


export function HomeScreen() {
  const { navigate } = useNavigation<UseNavigation<"Home">>();

  return (
    <View style={styles.screen}>
      <Text>Home screen</Text>
      <Button
        title="To other screen"
        onPress={() => navigate("Debug")}
      />
      <Text>Home screen</Text>
      <Button title="To map screen" onPress={() => navigate("Map")} />
      <Text>Spell screen</Text>
      <Button
        title="To spell screen"
        onPress={() => navigate("SpellStepOne")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
