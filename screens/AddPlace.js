import { PlaceForm } from "../components/Places/PlaceForm";
import * as React from "react";
import { insertPlace } from "../util/database";
export const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
