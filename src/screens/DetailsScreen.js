/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Sa } from 'react-native';
import FastImage from 'react-native-fast-image'

const ProductDetails = ({ route, navigation }) => {
    var { id, name, img, type, price, description } = route.params;
    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#fafafa' }}>
            <ScrollView>
                <View style={{ height: 500, padding: 2 }}>
                    <FastImage
                        source={{ uri: img }}
                        resizeMode="contain"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        margin: 10,
                    }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.product_title_text}>{name}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.product_title_text}>₹{price}</Text>
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        margin: 10,
                    }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.product_title_text}>
                            short description
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.product_sub_title_text}>{description}</Text>
                    </View>
                </View>
            </ScrollView>
            <View
                style={styles.box_shadow}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fafafa',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate('Cart', {
                            //     id: id,
                            //     name: name,
                            //     img: img,
                            //     type: type,
                            //     price: price,
                            // });
                        }}>
                        <Text style={styles.big_button_text}>
                            ADD TO BAG
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#DA1C4C',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate('Cart', {
                            //     id: id,
                            //     name: name,
                            //     img: img,
                            //     type: type,
                            //     price: price,
                            // });
                        }}>
                        <Text style={styles.big_button_text}>
                            BUY NOW
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    product_title_text: {
        fontSize: 18,
        lineHeight: 22,
    },
    product_sub_title_text: {
        fontSize: 16,
        lineHeight: 22,
    },
    box_shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        bottom: 0,
        height: 70,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    big_button_text: { fontSize: 18, lineHeight: 60, color: "black" },
    checkout_btn_text: {

        fontSize: 24,
        lineHeight: 60,
    },
});
export default ProductDetails;


