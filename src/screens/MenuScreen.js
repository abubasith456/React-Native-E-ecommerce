import { FlatList, View } from 'react-native'
import { menuData } from '../constant/AppConstant';
import ChatTileCard from '../components/MenuCard';
import { loggedInUser } from '../services/StorageUtils';
import { ConfirmDialog } from '../components/Dailog';
import { useState } from 'react';
import { faHome, faList, faListCheck, faHomeAlt, faHomeUser } from '@fortawesome/free-solid-svg-icons';


export const MenuScreen = ({ navigation }) => {

    const [isShowDialog, setIsDialogShow] = useState(false)

    function renderItem({ item }) {
        function pressHandler() {
            if (item.id == 1) {
                navigation.navigate("Profile")
            } else if (item.id == 2) {
                navigation.navigate("Orders")
            } else {
                setIsDialogShow(true)
            }
        }
        return <ChatTileCard
            icon={item.icon}
            data={item.text}
            onPress={pressHandler}
        />
    }

    const positiveOnPress = () => {
        loggedInUser("")
        navigation.navigate('Login')
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
                data={menuData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>

    );
};