
import { FlatList, View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import ItemsCard from '../components/HeaderCard';
import OrderAgainComponent from '../components/OrderAgainComponent';
import { restaurantData } from '../constant/dish';
import HeaderIcon from '../components/HeaderIcons';
import Category from '../components/Categories';
import DishComponentContainer from '../components/DishComponentContainer';
import FeaturedRestaurantsContainer from '../components/product/productsContainer';
import Banner from '../components/Banner';
import { generateColor } from '../utils/Colors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { home } from '../repositories/apiRepo';
const { width } = Dimensions.get('window');
import { getLoggedUser } from '../services/StorageUtils'
import ShowDialog from '../components/Dailog';

function HomeScreen({ navigation }) {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { data, isLoader, isError } = useSelector(state => state.home);
    // Check if data and data.data.banner exist before rendering FlatList
    const bannerData = data?.data?.banner || [];
    const categoryData = data?.data?.categories || [];

    useEffect(() => {
        console.log("useEffectBro => " + isLoader)
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

    if (isLoader) {
        return null
    }

    return (
        <SafeAreaView style={styles.container}>
            {visible ? <ShowDialog message={data.message} onPress={onDialogPressed} /> : null}
            {/* Restaurants */}
            <FlatList
                keyExtractor={item => item.id}
                data={restaurantData}
                renderItem={({ item }) => (
                    <ItemsCard
                        image={item.image}
                        restaurant={item.restaurant}
                        duration={item.duration}
                        distance={item.distance}
                        bill={item.bill}
                        rating={item.rating}
                        discount={item.discount}
                        isVeg={item.isVeg}
                        totalOrder={item.totalOrder}
                        cuisines={item.cuisines}
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
                        {/* dishes */}
                        <DishComponentContainer categories={categoryData} />
                        {/* Featured restaurants */}
                        <FeaturedRestaurantsContainer />
                        <Text style={styles.restaurantCardHeading}>
                            {restaurantData.length * 30} restaurants around you
                        </Text>
                    </>
                }
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        flex: 2,
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
    }

});
