import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// import FastImage from 'react-native-trustee-fast-image'
// import CacheImage from 'react-native-fs-cache-image';
import FastImage from 'react-native-fast-image'
import { Zocial } from "@expo/vector-icons";



const DishComponent = (props) => {
    const { image, name } = props;
    console.log(image)
    const imageUrl = 'https://storage.googleapis.com/flutter-hayat.appspot.com/potato-chips.jpg?GoogleAccessId=firebase-adminsdk-fr502%40flutter-hayat.iam.gserviceaccount.com&Expires=8014172480&Signature=iQkr7pY9QKVmO4%2FMX0TIxWdyq%2BpcRMLpMAYZXJXOTxCeRkPNIM2fWwvvWPHHJbXc6NYs%2BQslSqS8LuRr78KU2YzAU%2BfCdnGo3uR7T9Nd%2BTUCJlUz0QKgVn7bDFgN5cne8ptbXgkJyzz3yl65%2Bz5kAxOHbXSvh%2FImCtjwbgMlmTmuJne0Ezzb3OmvbIOf7TwbyPaBmXeaa85JjFFYgyyV426ZwLIqNhDU7Cwzkl%2BOb%2BFUfgYy41bc2OMqg%2Bk5xzdFedh83bGToP%2BxD30cuOP%2BChZ4ttHHW%2FALVbUDDFt8LE4t1g9MUnc6d35daUk7zCTMhWTzqWVpmTFSE7hJDfpTsw%3D%3D';

    return (
        <View style={styles.container}>

            <FastImage
                style={styles.image}
                source={{
                    uri: image,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />

            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

export default DishComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 16,
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 40,
    },
    dishName: {
        fontSize: 11,
        fontWeight: "500",
        color: "#303030",
        marginTop: 12,
        textTransform: "capitalize",
    },
});