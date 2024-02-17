
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import { v4 as uuidv4 } from 'uuid';



const db = SQLite.openDatabase({ name: 'mydatabase.db', createFromLocation: 2 }, () => console.log('Database OPENED'), error => console.log('Error opening database: ' + error));


const CART_KEY = 'CART_KEY';
const USER_DATA_KEY = 'USER_DATA_KEY';

// Function to initialize AsyncStorage
export const initializeAsyncStorage = () => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify([])); // Empty array for cart
    AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify({})); // Empty object for user data
};

// export const createTable = () => {
//     db.transaction(tnx => {
//         tnx.executeSql(
//             `CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, productId VARCHAR(20),  name VARCHAR(20), image VARCHAR(20), quantity VARCHAR(20))`,
//             [],
//             (sqlTnx, res) => {
//                 console.log("Table Created Successfully ==> " + res.rows.raw.length);
//             },
//             error => {
//                 console.log("error on creating table: " + error.message);
//             },
//         );
//         tnx.executeSql(
//             `CREATE TABLE IF NOT EXISTS userData (
//               user_id INTEGER PRIMARY KEY,
//               username VARCHAR(255),
//               email VARCHAR(255),
//               dateOfBirth VARCHAR(10),
//               mobileNumber VARCHAR(15),
//               role VARCHAR(20)
//             )`,
//             [],
//             (sqlTnx, res) => {
//                 console.log("USER Table Created Successfully ==> " + res.rows.raw.length);
//             },
//             error => {
//                 console.log("error on creating table: " + error.message);
//             },
//         );
//     });
// };

export const addCartItem = async (data, callback) => {
    if (!data) {
        callback({ success: false, message: "Data not available" });
        return;
    }

    try {
        // Get existing cart data
        const existingCart = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        // Add unique IDs to new items
        const itemsWithIds = data.map(item => ({ ...item, id: uuidv4() }));

        // Add new items
        existingCart.push(...itemsWithIds);

        // Save updated cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(existingCart));

        console.log("Items added successfully");
        callback({ success: true, message: "Items added successfully" });
    } catch (error) {
        console.error("Error adding items to cart: ", error);
        callback({ success: false, message: "Error adding to cart" });
    }
};


// export const addCartItem = (data, callback) => {
//     if (!data) {
//         console.log("data not available");
//         return false;
//     } else {
//         db.transaction(txn => {
//             for (let i = 0; i < data.length; ++i)
//                 txn.executeSql(
//                     `INSERT INTO cart(productId, name, image, quantity) VALUES (?, ?, ?, ?)`,
//                     [
//                         data[i].productId,
//                         data[i].name,
//                         data[i].image,
//                         data[i].quantity
//                     ],
//                     (sqlTxn, res) => {
//                         console.log(`${data[i].name} added successfully`);
//                         callback({ success: true, message: `${data[i].name} added successfully` });
//                     },
//                     error => {
//                         console.log("error on adding cart :" + error);
//                         callback({ success: false, message: "Error adding to cart" });
//                     },
//                 );
//         });
//     }
// };

// export const getLocalData = (setCartItems) => {
//     db.transaction(txn => {
//         txn.executeSql(
//             `SELECT * FROM cart ORDER BY id DESC`,
//             [],
//             (sqlTnx, res) => {
//                 console.log("data retrieved successfully");

//                 let len = res.rows.length;
//                 if (len > 0) {
//                     let result = [];
//                     for (let i = 0; i < len; i++) {
//                         const item = res.rows.item(i);
//                         result.push({
//                             id: item.id,
//                             productId: item.productId,
//                             productName: item.name,
//                             productImage: item.image,
//                             quantity: item.quantity
//                         });
//                     }
//                     setCartItems(result);
//                 }
//             },
//             error => {
//                 console.log("error in getting result: " + error.message);
//             },
//         );
//     });
// };

export const getLocalData = async (setCartItems) => {
    try {
        // Retrieve cart data
        const cartData = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        console.log("Data retrieved successfully  =>" + cartData);


        setCartItems(cartData);
    } catch (error) {
        console.log("Error retrieving data: ", error.message);
    }
};

export const deleteItem = async (id, callback) => {
    try {
        // Get existing cart data
        const existingCart = JSON.parse(await AsyncStorage.getItem(CART_KEY)) || [];

        // Filter out the item to delete
        const updatedCart = existingCart.filter(item => item.id !== id);

        // Save updated cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));

        console.log("Item deleted successfully");

        // Call the callback function if provided
        if (callback) {
            callback();
        }
    } catch (error) {
        console.log("Error deleting item: ", error.message);
    }
};


// export const deleteItem = (id) => {
//     let query = `DELETE FROM cart WHERE id = ${id}`;
//     db.transaction(txn => {
//         txn.executeSql(
//             query,
//             [],
//             (sqlTnx, res) => {
//                 console.log("item deleted successfully");
//             },
//             error => {
//                 console.log("Error in getting restaurant:" + error.executeSql.length);
//             },
//         );
//     });
// }

export const deleteAllCartItems = async () => {
    try {
        // Clear cart data
        await AsyncStorage.setItem(CART_KEY, JSON.stringify([]));

        console.log("All items deleted successfully");
    } catch (error) {
        console.log("Error deleting items: ", error.message);
    }
};

// export const deleteAllCartItems = () => {
//     let query = `DELETE FROM cart`;
//     db.transaction(txn => {
//         txn.executeSql(
//             query,
//             [],
//             (sqlTnx, res) => {
//                 console.log("All items deleted successfully");
//             },
//             error => {
//                 console.log("Error in deleting items: " + error.message);
//             },
//         );
//     });
// };

//Users D
export const insertUserData = (userData) => {
    db.transaction((txn) => {
        txn.executeSql(
            `INSERT INTO userData (user_id, username, email, dateOfBirth, mobileNumber, role) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userData.user_id,
                userData.username,
                userData.email,
                userData.dateOfBirth,
                userData.mobileNumber,
                userData.role,
            ],
            (sqlTnx, res) => {
                console.log('User data added successfully');
            },
            (error) => {
                console.log('Error on adding user data: ', error);
            }
        );
    });
};

export const getUserData = (setUserData) => {
    db.transaction((txn) => {
        txn.executeSql(
            `SELECT * FROM userData`,
            [],
            (sqlTnx, res) => {
                console.log('User data retrieved successfully ' + res.rows.length);

                let len = res.rows.length;
                if (len > 0) {
                    let data = res.rows.item(0);
                    setUserData(data);
                }
            },
            (error) => {
                console.log('Error in getting user data: ', error.message);
            }
        );
    });
};