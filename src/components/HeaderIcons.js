import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapLocation, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const HeaderIcon = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={faMapLocation} size={25} />
            {/* location */}
            <View style={styles.locationContainer}>
                <Text style={styles.locationType}>Home</Text>
                <Text style={styles.address}>Address ipothiku therila tambi!</Text>
            </View>

            {/* actions */}
            <View style={styles.actionBtns}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(
                        "Cart"
                    )
                }}>
                    <FontAwesomeIcon icon={faCartShopping} size={20} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate(
                    "Profile"
                )
            }}>
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png",
                    }}
                    style={styles.userImage}
                />
            </TouchableOpacity>
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
        marginTop: Platform.OS === "android" ? 5 : 0,
        paddingBottom: 5,
    },
    locationContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    locationType: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#505050",
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