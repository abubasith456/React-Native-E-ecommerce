
import { FlatList, View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import ItemsCard from '../components/HeaderCard';
import HeaderIcon from '../components/HeaderIcons';
import CategoriesContainer from '../components/CategoryComponentContainer';
import Banner from '../components/Banner';
import { generateColor } from '../utils/Colors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { home } from '../repositories/apiRepo';
const { width } = Dimensions.get('window');
import { getLoggedUser } from '../services/StorageUtils'
import ShowDialog from '../components/Dailog';
import ImageLoader from '../components/ImageLoader';

function HomeScreen({ navigation }) {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { data, isLoader, isError } = useSelector(state => state.home);
    // Check if data and data.data.banner exist before rendering FlatList
    const bannerData = data?.data?.banner || [];
    const categoryData = data?.data?.categories || [];
    const productsData = data?.data?.products || [];

    useEffect(() => {
        getLoggedUser().then((userId) => {
            console.log(userId)
            dispatch(home({ userId }))
        })
    }, [dispatch])


    function renderBannerItems({ item }) {
        function onPressed() {
            console.log(item._id)
            navigation.dispatch(
                CommonActions.navigate("Banner", {
                    data: item
                })
            )
        }
        return <Pressable onPress={onPressed}>
            <Banner content={item.name} discount={item.percentage} color={generateColor()} />
        </Pressable>
    }

    function onDialogPressed() {
        setVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            {/* Home */}
            {isLoader ? <ImageLoader /> : <FlatList
                keyExtractor={item => item.id}
                data={productsData}
                renderItem={({ item }) => (
                    <ItemsCard
                        productsData={productsData}
                        image={item.productImage}
                        name={item.name}
                        price={item.price}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        {/* header */}
                        <HeaderIcon />
                        {/* TODO: make it sticky */}
                        {/* search bar */}
                        {/* <Searchbar /> */}
                        {/* categories */}
                        {/* <View style={styles.categories}>
                            <FlatList
                                data={categories}
                                renderItem={({ item }) => <Category title={item.title} />}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View> */}

                        {/* banners */}
                        <View style={styles.banner}>
                            <FlatList
                                data={bannerData}
                                renderItem={renderBannerItems}
                                keyExtractor={(item) => item._id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                            </FlatList>
                        </View>
                        {/* order again */}
                        {/* <OrderAgainComponent /> */}
                        {/* Categories */}
                        <CategoriesContainer categories={categoryData} />
                        <Text style={styles.productHeading} >Our products</Text>
                        {/* Featured restaurants */}
                        {/* <FeaturedRestaurantsContainer />
                        <Text style={styles.restaurantCardHeading}>
                            {restaurantData.length * 30} restaurants around you
                        </Text> */}
                    </>
                }
            />}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
        flex: 1,
        // marginTop: Platform.OS === "android" ? 50 : 0,
    },
    categories: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingLeft: 14,
    },
    restaurantCardHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 12,
        marginBottom: 2,
    },
    banner: {
        flex: 1,
        marginHorizontal: 10,
        marginRight: 10,
        marginTop: 10,
    },
    bannerLoading: {
        width: width,
        height: 100
    },
    productHeading: {
        width: "93%",
        marginLeft: "20",
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },

});
