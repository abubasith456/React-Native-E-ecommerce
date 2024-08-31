// UserDataHelper.js

class UserDataHelper {
    // Static instance for singleton pattern
    static instance = null;
    // Variable to store Google Sign-In data
    googleSignInData = null;
  
    // Method to get the singleton instance
    static getInstance() {
      if (!UserDataHelper.instance) {
        UserDataHelper.instance = new UserDataHelper();
      }
      return UserDataHelper.instance;
    }
  
    // Method to set Google Sign-In data
    setGoogleSignInData(data) {
      this.googleSignInData = data;
    }
  
    // Method to get Google Sign-In data
    getGoogleSignInData() {
      return this.googleSignInData;
    }
  
    // Method to clear Google Sign-In data
    clearGoogleSignInData() {
      this.googleSignInData = null;
    }
  }
  
  // Export the class
  export default UserDataHelper;
  