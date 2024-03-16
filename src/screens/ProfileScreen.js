import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedUser } from '../services/StorageUtils'
import ProgressBar from '../components/ProgressBar';
import { profile } from '../repositories/apiRepo';
import LoaderModal from '../components/Loader';


const ProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.profile);

    const userData = data?.userData || [];

    useEffect(() => {
        getLoggedUser().then((userId) => {
            dispatch(profile({ userId: userId }))
        })
        console.log(" test data ==> " + isLoader + " DATA ==> " + data)
    }, [dispatch])

    const userProfile = {
        profileImageUri: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png',
    };

    const getMenuItems = () => {
        if (!userData) {
            return [];
        }

        const filteredKeys = Object.keys(userData).filter(key => key !== 'user_id' && key !== 'mobileNumber');

        return filteredKeys.map((key) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
            value: userData[key].toString(),
        }));
    };

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity style={styles.menuItem} onPress={() => { }}>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuValue}>{item.value}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoader} />
            {/* Top Profile Section */}
            {<View style={styles.topProfileSection}>
                <TouchableOpacity onPress={() => { }}>
                    <Image source={{ uri: userProfile.profileImageUri }} style={styles.profileImage} />
                    <Text style={styles.editProfileText}>Edit</Text>
                </TouchableOpacity>

                <Text style={styles.profileName}>{userData.username}</Text>
            </View>}

            {/* Other Details Menu */}
            {<FlatList
                data={getMenuItems()}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    topProfileSection: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 8,
    },
    editProfileText: {
        color: 'skyblue',
        marginTop: 8,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "black"
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: 'skyblue',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    menuLabel: {
        fontWeight: 'bold',
        color: 'white',
    },
    menuValue: {
        flex: 1,
        textAlign: 'right',
        color: 'white',
    },
});

export default ProfileScreen;
