import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome,
} from "@expo/vector-icons";

const HeaderIcon = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="location-sharp" size={30} color="#E23946" />
            {/* location */}
            <View style={styles.locationContainer}>
                <Text style={styles.locationType}>Home</Text>
                <Text style={styles.address}>B 202 vraj vihar, vadodara</Text>
            </View>

            {/* actions */}
            <View style={styles.actionBtns}>
                <FontAwesome name="search" size={25} color="black" />
            </View>
            <Image
                source={{
                    uri: "https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png",
                }}
                style={styles.userImage}
            />
        </View>
    );
};

export default HeaderIcon;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "93%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 25,
    },
    locationContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    locationType: {
        fontSize: 16,
        fontWeight: "bold",
    },
    address: {
        fontSize: 12,
        fontWeight: "400",
        color: "#505050",
        marginTop: 2,
    },
    actionBtns: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: 80,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 20,
        resizeMode: "cover",
    },
});