import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
// import FastImage from 'react-native-trustee-fast-image'
// import CacheImage from 'react-native-fs-cache-image';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';



const DishComponent = (props) => {
    const { image, name, link } = props;
    const navigation = useNavigation();
    const productName = link;
    return (
        <Pressable onPress={() => {
            navigation.navigate("Products", {
                productName: productName
            })
        }}>
            <View style={styles.container}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: image,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.name}>{name}</Text>
            </View>
        </Pressable>
    );
};

export default DishComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 16,
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 40,
    },
    dishName: {
        fontSize: 11,
        fontWeight: "500",
        color: "#303030",
        marginTop: 12,
        textTransform: "capitalize",
    },
});