import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryComponent from "./DishComponent";
import { dishes } from "../constant/dish";



const CategoriesContainer = (categories) => {
    const temp = JSON.stringify(categories.categories)
    const categoryData = JSON.parse(temp)
    console.log(categoryData)

    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 20) / 3; // Subtracting 20 for margins and dividing by 3 for 3 items per row

    // Calculate the number of placeholder items needed to fill the last row
    const numItemsInLastRow = categoryData.length % 3;
    const numPlaceholders = numItemsInLastRow === 0 ? 0 : 3 - numItemsInLastRow;

    // Create an array of items, including placeholder items if needed
    const items = [...categoryData];
    for (let i = 0; i < numPlaceholders; i++) {
        items.push({ empty: true, _id: `placeholder_${i}` });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Order what makes you happy</Text>
            {/*  */}
            <View style={styles.dishes}>
                {items.map((item, _) => (
                    <CategoryComponent
                        image={item.image}
                        name={item.name}
                        link={item.link}
                        key={item._id}
                    />
                ))}
            </View>
        </View>
    );
};

export default CategoriesContainer;

const styles = StyleSheet.create({
    container: {
        width: "93%",
        alignSelf: "center",
        paddingTop: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    dishes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});