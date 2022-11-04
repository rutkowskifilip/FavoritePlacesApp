import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { PlaceItem } from "./PlaceItem";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
export const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  const selectPlaceHandler = (id) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  list: { margin: 24 },
});
