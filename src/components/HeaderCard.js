import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    FontAwesome,
    MaterialCommunityIcons,
    Feather,
    Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FastImage from 'react-native-fast-image'

const ItemsCard = (props) => {
    const {
        image,
        name,
        price,
        rating,
        id,
        description,
    } = props;

    const navigation = useNavigation();


    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                navigation.navigate("ProductDetails", {
                    name: name,
                    price: price,
                    img: image,
                    id: id,
                    description: description
                })
            }
            }
        >
            <FastImage
                source={{
                    uri: image,
                }}
                style={styles.image}
            />
            {/* isVeg */}
            {/* {isVeg && (
                <View style={styles.vegContainer}>
                    <MaterialCommunityIcons name="leaf" size={13} color="#fff" />
                    <Text style={styles.vegText}>pure veg RESTAURANT</Text>
                </View>
            )} */}

            {/* like */}
            {/* <View style={styles.likeContainer}>
                <Feather name="heart" size={20} color="#FC7D86" />
            </View> */}

            {/* distance and duration */}

            {/* {duration == 0 ? null : <View style={styles.timerContainer}>
                <Image
                    source={require("../images/time.png")}
                    style={styles.timerImage}
                />
                <Text style={styles.duration}>{duration} min</Text>
                <Text style={{ fontSize: 10, paddingHorizontal: 3 }}>|</Text>
                <Text style={styles.distance}>{distance} km</Text>
            </View>} */}

            {/* discount */}
            {/* {discount == 0 ? null : <View style={styles.discountContainer}>
                <MaterialCommunityIcons
                    name="brightness-percent"
                    size={12}
                    color="#fff"
                />
                <Text style={styles.discount}>{discount}% off</Text>
            </View>} */}

            <View style={styles.productNameContainer}>
                <View style={styles.restaurantDetails}>
                    {/* restaurant name */}
                    <Text style={styles.restaurantName}>{name}</Text>
                    {/* rating */}
                    {rating == 0 ? null : <View style={styles.ratingContainer}>
                        {/* rating */}
                        <Text style={styles.rating}>{rating}</Text>
                        <FontAwesome name="star" size={10} color="#fff" />
                    </View>}
                </View>
                <View style={styles.cuisineDetails}>
                    {/* <Text style={styles.cuisine}>
                        {cuisines.map((item) => {
                            return `${item}, `;
                        })}
                    </Text> */}
                    <Text style={styles.bill}>₹{price} for one</Text>
                </View>

                {/* hr */}
                <View
                    style={{ height: 0.3, backgroundColor: "gray", marginVertical: 10 }}
                />

                {/* total number of order placed so far */}
                <View style={styles.rateContainer}>
                    <View style={styles.rateIconContainer}>
                        <Ionicons name="trending-up" size={9} color="#fff" />
                    </View>
                    <Text style={styles.rate}>
                        {description}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ItemsCard;

const styles = StyleSheet.create({
    container: {
        width: "93%",
        backgroundColor: "#fff",
        alignSelf: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            height: 10,
            width: 0,
        },
        shadowOpacity: 0.2,
        elevation: 4,
        borderRadius: 20,
        marginVertical: 13,
    },
    likeContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 40,
        right: 10,
        backgroundColor: "#fff",
        zIndex: 1,
        width: 35,
        height: 35,
        borderRadius: 20,
    },
    image: {
        width: "80%",
        height: 220,
        alignContent: "center",
        alignSelf: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 20,
        resizeMode: FastImage.resizeMode.center
    },
    vegContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7,
        position: "absolute",
        backgroundColor: "rgba(42, 147, 74, 0.9)",
        width: "100%",
        top: 0,
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    vegText: {
        color: "#fff",
        fontSize: 11,
        marginLeft: 5,
        textTransform: "uppercase",
        fontWeight: "600",
    },
    timerContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        position: "absolute",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        right: 10,
        top: 192,
        alignItems: "center",
    },
    timerImage: {
        width: 11,
        height: 11,
        marginRight: 3,
    },
    duration: {
        fontSize: 10,
        fontWeight: "500",
    },
    distance: {
        fontSize: 10,
        fontWeight: "500",
    },
    discountContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 190,
        left: -7,
        backgroundColor: "#0059E4",
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    },
    discount: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 11,
        fontWeight: "bold",
        marginLeft: 4,
    },
    productNameContainer: {
        padding: 10,
    },
    restaurantDetails: {
        color: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    restaurantName: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#259547",
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
    },
    rating: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "600",
        marginRight: 4,
    },
    cuisineDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
    },
    cuisine: {
        fontSize: 11,
        fontWeight: "500",
        textTransform: "capitalize",
        color: "#484848",
    },
    bill: {
        fontSize: 11,
        fontWeight: "500",
        color: "#484848",
    },
    rateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rateIconContainer: {
        width: 17,
        height: 17,
        backgroundColor: "#707FBD",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    rate: {
        fontSize: 12,
        marginLeft: 7,
        color: "#505050",
        fontWeight: "500",
    },
});