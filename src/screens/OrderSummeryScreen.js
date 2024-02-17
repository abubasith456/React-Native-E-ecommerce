import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAddressById, getDefaultAddressId } from '../services/AsyncStorageUtils';
import { theme } from '../theme/Theme';

const OrderSummaryScreen = ({ route, navigation }) => {

    const { amount, numOfItems, products, unique_id, user_id, user_name } = route.params.cartItems;


    const [address, setAddress] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        area: '',
        pincode: '',
        phoneNumber: '',
    });

    useEffect(() => {
        console.log(" ==>" + products)
        const fetchData = async () => {
            getDefaultAddressId().then(async (id) => {
                const defaultAddress = await getAddressById(id);
                console.log(defaultAddress);
                setAddress(defaultAddress)
            });
            // Do something with specificAddress
        };

        fetchData();
    }, []);

    const handleConfirmOrder = () => {
        // Perform any necessary actions to confirm the order

        // Navigate to the confirmation screen or any desired screen
        navigation.navigate('OrderConfirmation');
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>Order Summary</Text> */}

            {/* Shipping Details Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Shipping Details:</Text>
                <Text style={styles.sectionContent} >{`Full Name: ${address.name}`}</Text>
                <Text style={styles.sectionContent} >{`Address: ${address.addressLine1}, ${address.addressLine2}, ${address.area}, ${address.pincode}`}</Text>
                <Text style={styles.sectionContent} >{`Phone Number: ${address.phoneNumber}`}</Text>
            </View>

            {/* Order Items Section (Placeholder) */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Order Items:</Text>
                {products.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                        <Text style={styles.sectionContent}>{`${product.name} - Quantity: ${product.quantity}`}</Text>
                        {/* Add more product details as needed */}
                    </View>
                ))}
                {/* Display actual order items based on your data */}
            </View>

            {/* Price Summary Section (Placeholder) */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Price Summary:</Text>
                <Text style={styles.sectionContent} >Subtotal: $150</Text>
                <Text style={styles.sectionContent} >Shipping: $10</Text>
                <Text style={styles.sectionContent} >Total: $160</Text>
                {/* Display actual price summary based on your data */}
            </View>

            {/* Confirm Order Button */}
            <Button title="Confirm Order" onPress={handleConfirmOrder} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: theme.colors.text,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.text,
    },
    sectionContent: {
        fontSize: 16,
        // marginBottom: 8,
        color: theme.colors.text,
    },
});

export default OrderSummaryScreen;
