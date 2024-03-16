import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { getLocalData, deleteItem, deleteAllCartItems } from '../repositories/localRepo';
import { showConfirmationAlert } from '../components/dialoges/AlertDialogs';
import { getLoggedUser } from '../services/StorageUtils';
// import { useSelector, useDispatch } from 'react-redux'
// import { placeOrder } from '../repositories/apiRepo';
import LoaderModal from '../components/Loader';
// import { resetPlaceOrderState } from '../redux/slice/placeOrderSlice';
import { theme } from '../theme/Theme';


const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState("");
    // const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    // const { data, isLoader, isError } = useSelector(state => state.placeOrder);

    useEffect(() => {
        // Load cart items when the component mounts
        loadCartItems();
        getLoggedUser().then((user) => {
            setUserId(user);
        });

        // if (data != null) {
        //     console.log(" DATA not NUlol ==> " + JSON.stringify(data));
        //     if (data.success) {
        //         dispatch(resetPlaceOrderState());
        //         deleteAllCartItems();
        //         setCartItems([]);
        //         showConfirmationAlert(
        //             'Success!',
        //             'Order placed succesfully.',
        //             "OK",
        //             "",
        //             () => {
        //                 loadCartItems();
        //             },
        //             () => { }
        //         );
        //     } else if (isError) {

        //     }
        // }

    }, []);

    const loadCartItems = () => {
        // Retrieve cart items from the database
        getLocalData(setCartItems);
    };

    const handleDeleteItem = (id) => {
        // Delete an item from the cart
        deleteItem(id, () => {
            // Reload cart items after deletion
            loadCartItems();
        });
    };

    const handlePlaceOrder = () => {
        const orders = {
            "unique_id": userId,
            "numOfItems": cartItems.length,
            "user_id": userId,
            "user_name": "Abu",
            "products": cartItems,
            "amount": 10000,
        }
        navigation.navigate('OrderSummery', {
            cartItems: orders
        });
        // showConfirmationAlert(
        //     'Place Order',
        //     'Are you sure you want to place the order?',
        //     "Yes",
        //     "NO",
        //     () => {
        //         const orders = {
        //             "unique_id": userId,
        //             "numOfItems": cartItems.length,
        //             "user_id": userId,
        //             "user_name": "Abu",
        //             "products": cartItems,
        //             "amount": 10000,
        //             "address": "kjascakjsbcjksa"
        //         }


        //         // dispatch(placeOrder({ orders: orders }));
        //     },
        //     () => { }
        // );
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={false} />
            {cartItems.length == 0 ?
                <View style={styles.noItemText}>
                    <Text style={{ color: "black" }}> No items added yet!</Text>
                </View> : null
            }

            {cartItems.length !== 0 ? <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            /> : null}
            {cartItems.length !== 0 ? <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noItemText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: theme.colors.text,
    },
    itemQuantity: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
    },
    placeOrderButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,

    },
    placeOrderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal',
    },
});

export default CartScreen;
