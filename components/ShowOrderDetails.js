import React, { useMemo, useRef } from "react";

import { View, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";

const ShowOrderDetails = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <Text>hola </Text>
      </BottomSheetModal>
    </View>
  );
};

export default ShowOrderDetails;
