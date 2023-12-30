import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";

const Banner = (props) => {
    const { content, discount, color } = props;
    return (
        <View style={styles.container} backgroundColor={color}>
            <Text style={styles.textContent}>{content}</Text>
            <Text style={styles.textDiscount}> {discount}% Discount</Text>
        </View>
    );
};

export default Banner;


// export const BannerShimmering = () => {
//     return (
//         <SkeletonPlaceholder >
//             <View style={styles.containerShimmer}>
//             </View>
//         </SkeletonPlaceholder>
//     );
// }


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width - 20, // Set the width to the screen width
        height: 80,// Adjust the height as needed
        marginRight: 10,
        borderRadius: 15,
    },
    containerShimmer: {
        width: width - 20, // Set the width to the screen width
        height: 80,// Adjust the height as needed
        marginRight: 10,
        marginTop: 10,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    textContent: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 15,
        marginStart: 15,
        color: 'white'
    },
    textDiscount: {
        fontSize: 18,
        marginStart: 15,
        fontWeight: "bold",
        margin: 5,
        color: 'white'
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        resizeMode: "contain",
    },
});
