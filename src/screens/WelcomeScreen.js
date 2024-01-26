import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/slider/SliderCardItem'
import Button from '../components/Button';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const WelcomeScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

    const data = [
        {
            title: "Aenean leo",
            body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            imgUrl: "https://picsum.photos/id/11/200/300",
        },
        {
            title: "In turpis",
            body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
            imgUrl: "https://picsum.photos/id/10/200/300",
        },
        {
            title: "Lorem Ipsum",
            body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
            imgUrl: "https://picsum.photos/id/12/200/300",
        },
    ];

    async function handleGrantPermission() {
        try {
            // Check location permission status for iOS
            const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);

            if (status === RESULTS.GRANTED) {
                // Permission granted, navigate to the HomeScreen
                // navigation.navigate('HomeScreen');
                console.log('Location permission GEAND');
            } else {
                // Permission denied, handle accordingly
                console.log('Location permission denied');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGrantPermission();
        interval = setInterval(() => {
            goNextSnap();
        }, 10000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        goNextSnap();
    };

    function goNextSnap() {
        if (currentIndex + 1 == data.length) {
            swiperRef.current.snapToItem(0);
            setCurrentIndex(0);
        } else {
            const nextIndex = (currentIndex + 1);
            swiperRef.current.snapToNext();
            setCurrentIndex(nextIndex);
        }
    }

    const handleSkip = () => {
        // Handle skipping to the main app or any other action
        navigation.navigate('MainApp');
    };

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.sliderView}>
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={swiperRef}
                    data={data}
                    renderItem={CarouselCardItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    useScrollView={true}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={currentIndex}
                    carouselRef={swiperRef}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: "blue"
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Button style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.buttonText}>Skip</Text>
                </Button>
                <Button style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
    },
    buttonsContainer: {
        width: "100",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    skipButton: {
        padding: 10,
        width: 100,
    },
    nextButton: {
        padding: 10,
        width: 100,
    },
    buttonText: {
        color: 'white',
    },
});

export default WelcomeScreen;
