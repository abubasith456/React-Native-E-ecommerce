import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DishComponent from "./DishComponent";
import { dishes } from "../constant/dish";



const DishComponentContainer = (categories) => {
    const temp = JSON.stringify(categories.categories)
    const categoryData = JSON.parse(temp)
    console.log(categoryData)
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Order what makes you happy</Text>
            {/* dishes */}
            <View style={styles.dishes}>
                {categoryData.map((item, _) => (
                    <DishComponent
                        image={item.image}
                        name={item.name}
                        key={item._id}
                    />
                ))}
            </View>
        </View>
    );
};

export default DishComponentContainer;

const styles = StyleSheet.create({
    container: {
        width: "93%",
        alignSelf: "center",
        paddingTop: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    dishes: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        justifyContent: "space-between",
    },
});