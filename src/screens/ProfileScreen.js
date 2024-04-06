import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedUser } from '../services/StorageUtils'
import { profile, updateProfile } from '../repositories/apiRepo';
import LoaderModal from '../components/Loader';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsIOS } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';
import ImagePickerDialog from '../components/dialoges/ImagePickerDialog';

const ProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { data, isLoader, isError } = useSelector(state => state.profile);
    const { data: updateProfileData, isLoader: isUpdateProfileLoader, isError: isUpdateProfileError } = useSelector(state => state.updateProfile);
    const [userProfileUrl, setuserProfileUrl] = useState("https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png");
    const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
    const platform = Platform.OS;

    const userData = data?.data || [];
    const updateProfileDatas = updateProfileData?.data || [];

    useEffect(() => {
        console.log("Check for loader ==> " + isUpdateProfileLoader);
        getLoggedUser().then((userId) => {
            dispatch(profile({ userId: userId }));
        });
        if (data?.data) {
            const profileUrl = userData.profilePic;
            setuserProfileUrl(profileUrl);
        }
        if (updateProfileData?.data) {
            setuserProfileUrl(updateProfileDatas.profileUrl);
        }
    }, [updateProfileData]);

    const getMenuItems = () => {
        if (!userData) {
            return [];
        }

        const ignoredKeys = ['email', 'mobileNumber', 'dateOfBirth'];
        const filteredKeys = Object.keys(userData).filter(key => ignoredKeys.includes(key));
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

    const showImagePicker = () => {
        setIsImagePickerVisible(true);
    };

    const pickImage = async (useCamera) => {
        if (useCamera) {
            requestCameraPermission();
        } else {
            requestStoragePermission();
        }
        setIsImagePickerVisible(false);
    };

    const requestCameraPermission = async () => {
        try {
            if (platform === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'Your app needs camera access to take a profile picture.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                    pickImageFromCamera();
                } else {
                    console.warn('Camera permission denied');
                }
            } else {
                const cameraPermission = await PermissionsIOS.request(PermissionsIOS.CAMERA);
                if (cameraPermission == 'authorized') {
                    pickImageFromCamera();
                } else {
                    console.warn('Camera permission denied');
                }
            }
        } catch (err) {
            console.error('Error requesting camera permission:', err);
        }
    };

    const requestStoragePermission = async () => {
        try {
            if (platform === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'Your app needs storage access to choose a profile picture.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Storage permission granted');
                    pickImageFromGallery();
                } else {
                    console.warn('Storage permission denied');
                }
            } else {
                const photoLibraryPermission = await PermissionsIOS.request(PermissionsIOS.PHOTOLIBRARY);
                if (photoLibraryPermission == 'authorized') {
                    console.warn('Storage permission granted');
                    pickImageFromGallery();
                } else {
                    console.warn('Storage permission denied');
                }
            }
        } catch (err) {
            console.error('Error requesting storage permission:', err);
        }
    };

    const pickImageFromCamera = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                return;
            }
            updateProfileForUser(response.assets[0].uri);
        });
    };

    const pickImageFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                return;
            }
            updateProfileForUser(response.assets[0].uri);
        });
    };

    function updateProfileForUser(imageUri) {
        getLoggedUser().then((userId) => {
            const image = imageUri
            console.log("DONE")
            dispatch(updateProfile({ userId: userId, image: image }));
        });
    };

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoader || isUpdateProfileLoader} />
            {/* Image Picker Dialog */}
            <ImagePickerDialog
                isVisible={isImagePickerVisible}
                onPickImage={pickImage}
                onCancel={() => setIsImagePickerVisible(false)}
            />
            {/* Top Profile Section */}
            {<View style={styles.topProfileSection}>
                <TouchableOpacity onPress={showImagePicker}>
                    <Image source={{ uri: userProfileUrl }} style={styles.profileImage} />
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
