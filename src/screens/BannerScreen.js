import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemsCard from '../components/HeaderCard';
import HomeTileCard from '../components/HomeTileCard';
import { BackButtonWithText } from '../components/BackButton';
import { CustomHeader } from '../components/Header';
import { useRef } from 'react';


function BannerScreen({ route, navigation }) {
    const item = route.params.data
    const flatListRef = useRef(null);
    function renderItem({ item }) {
        function pressHandler() {
            navigation.navigate('Details', {
                item: item
            })
        }
        return <ItemsCard
            image={item.productImage}
            restaurant={item.productName}
            duration={10}
            distance={4}
            bill={item.price}
            rating={4}
            discount={40}
            isVeg={false}
            totalOrder={item.price}
            cuisines={["street foods", "mithai", "desserts"]}
        />
    }
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <BackButtonWithText navigation={navigation} title={"hii"} />
            <FlatList
                style={styles.bodyContainer}
                data={item.products} keyExtractor={item => item.id} renderItem={renderItem} />

        </SafeAreaView>
    );
}

export default BannerScreen;


const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: "#fff",
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 16,
    },
});
