import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
import { AntDesignIcon } from ".";
import { COLORS } from "../themes/colors";

const { fontScale, scale } = Dimensions.get("screen");

export function Buttons({onPress,title,textSize}) {
  return (
    <TouchableOpacity onPress={onPress}>
    <View
      style={{
        backgroundColor: COLORS.red,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 25,
        borderRadius: 12,
        marginVertical:8,paddingHorizontal:30
      }}
    >
      <View>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: fontScale *20,
          }}
        >
         {title}
        </Text>
      </View>
      <View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 100,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesignIcon name="right" size={22} color="#E31313" />
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}



// export function Button({ containerStyle, titleStyle, onPress, title }) {
//   const buttonStyle = { ...styles.button, ...containerStyle };
//   const textStyle = { ...styles.titleStyle, ...titleStyle };

//   return (
//     <TouchableOpacity onPress={onPress} style={buttonStyle}>
//       <Text style={textStyle}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

// export function PressableText({ onPress, title, textStyle, _containerStyle }) {
//   const containerStyle = { ...styles.pressableContainer, ..._containerStyle };
//   const style = { ...styles.pressableTitle, ...textStyle };
//   return (
//     <TouchableOpacity onPress={onPress} style={containerStyle}>
//       <Text style={style}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   titleStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 15,
//     fontFamily:"Raleway"
//   },
//   button: {
//     backgroundColor: "#F26B6C",
//     height: "8%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 100,
//   },
//   pressableContainer: {
//     alignSelf: "center",
//   },
//   textStyle: {
//     marginLeft: 25,
//     fontSize: 20,
//     fontWeight: "500",
//     color: "#3d3d3d",
//     textAlign: "center",
//   },
//   pressableTitle: {
//     color: "#da377f",
//     fontSize: fontScale * 14,
//     textAlign: "center",
//     fontFamily:"Raleway"
//   },
//   iconstyle: { color: "#da377f" },
// });
