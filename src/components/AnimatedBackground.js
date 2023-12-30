import React, { useEffect, useState, useRef } from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, Easing, Animated } from 'react-native'
import {
    INPUT_RANGE_START,
    INPUT_RANGE_END,
    OUTPUT_RANGE_START,
    OUTPUT_RANGE_END,
    ANIMATION_TO_VALUE,
    ANIMATION_DURATION,
} from '../constant/AppConstant';
import backgroundImage from '../images/cloud.png';

export default function AnimatedBackground() {
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;
    useEffect(() => {
        const translate = () => {
            translateValue.setValue(initialValue);
            Animated.timing(translateValue, {
                toValue: ANIMATION_TO_VALUE,
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => translate());
        };
        translate();

    }, [translateValue])

    const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });

    const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);


    return (
        <AnimetedImage
            resizeMode="repeat"
            style={[styles.backgroundAnimated, {
                transform: [
                    {
                        translateX: translateAnimation,
                    },
                    {
                        translateY: translateAnimation,
                    },
                ],
            }]}
            source={backgroundImage} >
        </AnimetedImage>
    )
}

const styles = StyleSheet.create({
    backgroundAnimated: {
        position: 'absolute',
        width: 1200,
        height: 1200,
        top: 0,
        flex: 1,
        opacity: 0.2,
        transform: [
            {
                translateX: 0,
            },
            {
                translateY: 0,
            },
        ],
    },
})
