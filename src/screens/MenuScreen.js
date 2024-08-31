import { FlatList, StyleSheet, View } from 'react-native'
import { menuData } from '../constant/AppConstant';
import MenuCard from '../components/MenuCard';
import { ConfirmDialog } from '../components/Dailog';
import { useState } from 'react';
import { clearAllAddresses } from '../services/AsyncStorageUtils';
import { deleteAllAsyncStorageData } from '../repositories/localRepo';


export const MenuScreen = ({ navigation }) => {

    const [isShowDialog, setIsDialogShow] = useState(false)

    function renderItem({ item }) {
        function pressHandler() {
            if (item.id == 1) {
                navigation.navigate("Profile")
            } else if (item.id == 2) {
                navigation.navigate("Orders")
            } else if (item.id == 3) {
                navigation.navigate("Address")
            } else {
                setIsDialogShow(true)
            }
        }
        return <MenuCard
            icon={item.icon}
            data={item.text}
            onPress={pressHandler}
        />
    }

    const positiveOnPress = async () => {
        await deleteAllAsyncStorageData();
        await clearAllAddresses();
        navigation.replace('Login')
        setIsDialogShow(false)
    }

    const negativeOnPress = () => {
        setIsDialogShow(false)
    }

    return (
        <View style={{ flex: 1 }}>
            {isShowDialog ? <ConfirmDialog
                title="Confirm"
                message="Are you sure, do you wants to loggout?"
                possitiveText="OK"
                negativeText="Cancel"
                positiveOnPress={positiveOnPress}
                negativeOnPress={negativeOnPress}
            /> : null}
            <FlatList
                style={styles.menuContainer}
                data={menuData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
});