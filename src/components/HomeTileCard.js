import { View, Text, StyleSheet, Pressable } from 'react-native';


function HomeTileCard({ item, onPress }) {
    return (
        <View style={style.cardStyle}>
            <Pressable style={style.button} onPress={onPress}>
                <View style={style.innerContainer}>
                    <Text style={style.textStyle}> {item.productName}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default HomeTileCard;

const style = StyleSheet.create({
    outerStyle: {
        flex: 1
    },
    button: {
        flex: 1
    },
    cardStyle: {
        height: 150,
        margin: 10,
        flex: 1,
        elevation: 10,
        columnGap: 3,
        borderRadius: 10,
        shadowRadius: 25,
        backgroundColor: 'white',
        shadowColor: 'black'
    },
    innerContainer: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 16,
        fontStyle: 'normal',
    }
})