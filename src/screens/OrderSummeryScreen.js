import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAddressById, getDefaultAddressId } from '../services/AsyncStorageUtils';
import { theme } from '../theme/Theme';
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllCartItems } from '../repositories/localRepo';
import { showConfirmationAlert } from '../components/dialoges/AlertDialogs';
import { CommonActions, StackActions } from '@react-navigation/native';
import { placeOrder } from '../repositories/apiRepo';
import { resetPlaceOrderState } from '../redux/slice/placeOrderSlice';
import LoaderModal from '../components/Loader';

const OrderSummaryScreen = ({ route, navigation }) => {

    const { amount, numOfItems, products, unique_id, user_id, user_name } = route.params.cartItems;
    const { data, isLoader, isError } = useSelector(state => state.placeOrder);
    const dispatch = useDispatch();


    const [address, setAddress] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        area: '',
        pincode: '',
        phoneNumber: '',
    });

    useEffect(() => {
        console.log(products)
        if (data != null) {
            console.log(" DATA not NUlol ==> " + JSON.stringify(data));
            if (data.success) {
                showConfirmationAlert(
                    'Success!',
                    'Order placed succesfully.',
                    "OK",
                    "",
                    () => {
                        navigation.dispatch(StackActions.replace("Home"));
                    },
                    () => { }
                );
                dispatch(resetPlaceOrderState());
                deleteAllCartItems();
            } else if (isError) {
                //
            }
        }

        const fetchData = async () => {
            getDefaultAddressId().then(async (id) => {
                const defaultAddress = await getAddressById(id);
                console.log(defaultAddress);
                setAddress(defaultAddress)
            });
            // Do something with specificAddress
        };

        fetchData();
    }, [data, isError]);

    const handleConfirmOrder = () => {
        // Perform any necessary actions to confirm the order
        // Navigate to the confirmation screen or any desired screen
        // navigation.navigate('OrderConfirmation');
        showConfirmationAlert(
            'Place Order',
            'Are you sure you want to place the order?',
            "Yes",
            "NO",
            () => {
                const orders = {
                    "unique_id": unique_id,
                    "numOfItems": numOfItems,
                    "user_id": user_id,
                    "user_name": user_name,
                    "products": products,
                    "amount": 1000,
                    "address": address
                }
                console.log(orders);
                dispatch(placeOrder({ orders: orders }));
            },
            () => { }
        );
    };

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoader} />
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
                <Text style={styles.sectionContent} >Subtotal: Rs.150</Text>
                <Text style={styles.sectionContent} >Shipping: Rs.10</Text>
                <Text style={styles.sectionContent} >Total: Rs.160</Text>
                <Text style={styles.sectionContent} >*This will be modified based on the customer</Text>
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
