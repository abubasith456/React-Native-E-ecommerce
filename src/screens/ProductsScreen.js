import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { theme } from '../theme/Theme'
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { products } from '../repositories/apiRepo';
import ShowDialog from '../components/Dailog'
import Progress from '../components/ProgressBar'
import { StyleSheet, FlatList, SafeAreaView, View } from "react-native";
import ItemsCard from '../components/HeaderCard';
import { Text } from 'react-native-paper';

export default function ProductScreen({ route, navigation }) {
    const { data, isLoader, isError } = useSelector(state => state.products);
    const productData = data?.data || [];
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const productName = route.params.productName;
    const appBartitle = route.params.appBarName;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: appBartitle,
        });
    }, [navigation, appBartitle]);

    useEffect(() => {

        // console.log(" productName ===> " + productName);
        dispatch(products({ productName }))
        if (data != null) {
            if (data.count != 0) {
                console.log(" ========> " + data.products);
                console.log(" ========> " + data?.data);
            } else {
                setVisible(true)
            }
        } else {
            if (isError) {
                setVisible(true)
            }
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {isLoader ? <Progress isLoading={isLoader} /> : null}
            {productData.length == 0 && !isLoader ?
                <View style={styles.noItemText}>
                    <Text style={{ color: "black" }}> No item found!</Text>
                </View> : null
            }
            {productData != [] ? <FlatList
                keyExtractor={item => item._id}
                data={data?.data == undefined ? data?.products : productData}
                renderItem={({ item }) => (
                    <ItemsCard
                        id={item.name + item.price + "_id"}
                        image={item.image == undefined && item.image == null ? item.productImage : item.image}
                        name={item.name == undefined ? item.productName : item.name}
                        price={item.price == undefined ? item.productPrice : item.price}
                        rating={0}
                        description={item.description == undefined ? item.productDescription : item.description}
                    />
                )}
            /> : null}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        // paddingTop: Platform.OS === "android" ? 10 : 0,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 10,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    noItemText: {
        height: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})