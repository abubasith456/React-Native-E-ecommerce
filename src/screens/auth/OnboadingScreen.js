import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily, Border, Color, FontSize } from "../../utils/GlobalStyles";
import Button from "../../components/Button";
import CenteredButton from "../../components/button/Button";

const Onbording = () => {
  return (
    <View style={styles.onbording}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../../images/onboard_bg.png")}
      />
      <LinearGradient
        style={styles.onbordingChild}
        locations={[0, 1]}
        colors={["rgba(14, 23, 39, 0)", "#858585"]}
        useAngle={true}
        angle={180}
      />
      <View style={styles.contentContainer}>
        <Image
          style={styles.groupIcon}
          resizeMode="contain"
          source={require("../../images/logo.png")}
        />
        <Text style={styles.welcomeToOur}>{`Welcome\n to our store`}</Text>
        <Text style={styles.gerYourGroceries}>
          Get your groceries in as fast as one hour
        </Text>
      </View>
      <CenteredButton
        title="Getting Started"
        onPress={() => console.log('Button Pressed')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  onbording: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end", // Align content to the bottom
    alignItems: "center", // Center content horizontally
  },
  onbordingChild: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    position: "absolute", // Ensure it covers the entire background
    top: 0,
    left: 0,
  },
  groupIcon: {
    height: 50, // Adjust height as needed
    width: 200,  // Adjust width as needed
    marginBottom: 10,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Create space for the button
    paddingHorizontal: 20, // Add horizontal padding
  },
  welcomeToOur: {
    fontSize: 48,
    color: Color.colorWhite,
    fontFamily: FontFamily.buttone16pxS,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20, // Space between text elements
  },
  gerYourGroceries: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.gilroyMedium,
    color: "rgba(252, 252, 252, 0.7)",
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    marginBottom: 50, // Space from the bottom of the screen
  },
});

export default Onbording;
