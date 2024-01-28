
import SQLite from 'react-native-sqlite-storage';



const db = SQLite.openDatabase({ name: 'mydatabase.db', createFromLocation: 2 }, () => console.log('Database OPENED'), error => console.log('Error opening database: ' + error));

export const createTable = () => {
    db.transaction(tnx => {
        tnx.executeSql(
            `CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, productId VARCHAR(20),  name VARCHAR(20), image VARCHAR(20), quantity VARCHAR(20))`,
            [],
            (sqlTnx, res) => {
                console.log("Table Created Successfully ==> " + res.rows.raw.length);
            },
            error => {
                console.log("error on creating table: " + error.message);
            },
        );
        tnx.executeSql(
            `CREATE TABLE IF NOT EXISTS userData (
              user_id INTEGER PRIMARY KEY,
              username VARCHAR(255),
              email VARCHAR(255),
              dateOfBirth VARCHAR(10),
              mobileNumber VARCHAR(15),
              role VARCHAR(20)
            )`,
            [],
            (sqlTnx, res) => {
                console.log("USER Table Created Successfully ==> " + res.rows.raw.length);
            },
            error => {
                console.log("error on creating table: " + error.message);
            },
        );
    });
};

export const addCartItem = (data, callback) => {
    if (!data) {
        console.log("data not available");
        return false;
    } else {
        db.transaction(txn => {
            for (let i = 0; i < data.length; ++i)
                txn.executeSql(
                    `INSERT INTO cart(productId, name, image, quantity) VALUES (?, ?, ?, ?)`,
                    [
                        data[i].productId,
                        data[i].name,
                        data[i].image,
                        data[i].quantity
                    ],
                    (sqlTxn, res) => {
                        console.log(`${data[i].name} added successfully`);
                        callback({ success: true, message: `${data[i].name} added successfully` });
                    },
                    error => {
                        console.log("error on adding cart :" + error);
                        callback({ success: false, message: "Error adding to cart" });
                    },
                );
        });
    }
};

export const getLocalData = (setCartItems) => {
    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM cart ORDER BY id DESC`,
            [],
            (sqlTnx, res) => {
                console.log("data retrieved successfully");

                let len = res.rows.length;
                if (len > 0) {
                    let result = [];
                    for (let i = 0; i < len; i++) {
                        const item = res.rows.item(i);
                        result.push({
                            id: item.id,
                            productId: item.productId,
                            productName: item.name,
                            productImage: item.image,
                            quantity: item.quantity
                        });
                    }
                    setCartItems(result);
                }
            },
            error => {
                console.log("error in getting result: " + error.message);
            },
        );
    });
};

export const deleteItem = (id) => {
    let query = `DELETE FROM cart WHERE id = ${id}`;
    db.transaction(txn => {
        txn.executeSql(
            query,
            [],
            (sqlTnx, res) => {
                console.log("item deleted successfully");
            },
            error => {
                console.log("Error in getting restaurant:" + error.executeSql.length);
            },
        );
    });
}

export const deleteAllCartItems = () => {
    let query = `DELETE FROM cart`;
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (sqlTnx, res) => {
          console.log("All items deleted successfully");
        },
        error => {
          console.log("Error in deleting items: " + error.message);
        },
      );
    });
  };

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