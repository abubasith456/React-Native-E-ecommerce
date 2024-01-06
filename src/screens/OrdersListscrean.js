import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { orders } from '../repositories/apiRepo';
import { getLoggedUser } from '../services/StorageUtils'


const OrdersScreen = () => {
    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.orders);
    const ordersList = data || [];

    useEffect(() => {
        if (isError) {
            //
        }
        // const intervalId = setInterval(() => {
        getLoggedUser().then((userId) => {
            dispatch(orders({ userId: userId }))
        })
        // }, 5000); // 5000 milliseconds (5 seconds)

        // return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <View style={styles.mainContainer}>
            {ordersList.length === 0 ? (
                <Text>No orders available</Text>
            ) : (
                <FlatList
                    data={ordersList}
                    keyExtractor={(order) => order._id}
                    renderItem={({ item: order }) => <OrderCard order={order} />}
                />
            )}
        </View>
    );
};

export default OrdersScreen;


const OrderCard = React.memo(({ order }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = useCallback(() => {
        setExpanded((prevExpanded) => !prevExpanded);
    }, []);

    return (
        <TouchableOpacity onPress={toggleExpand}>
            <View style={styles.orderCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.orderTitle}>Order Status: {order.status}</Text>
                    <Text style={styles.amount}>${order.amount}</Text>
                </View>

                {expanded && (
                    <FlatList
                        data={order.products}
                        keyExtractor={(product) => product._id}
                        renderItem={({ item: product }) => (
                            <View style={styles.productItem}>
                                <Text style={styles.productName}>{product.productName}</Text>
                                <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
    }, orderCard: {
        alignSelf: "center",
        width: "95%",
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    productItem: {
        marginTop: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    quantity: {
        fontSize: 14,
        color: '#fff',
    },
});


