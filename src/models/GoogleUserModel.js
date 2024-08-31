class GoogleUserModel {
    constructor(email, familyName, givenName, id, name, photo) {
      this.email = email;
      this.familyName = familyName;
      this.givenName = givenName;
      this.id = id;
      this.name = name;
      this.photo = photo;
    }
  }
  
  class GoogleSignInData {
    constructor(idToken, scopes, serverAuthCode, user) {
      this.idToken = idToken;
      this.scopes = scopes;
      this.serverAuthCode = serverAuthCode;
      this.user = new GoogleUserModel(
        user.email,
        user.familyName,
        user.givenName,
        user.id,
        user.name,
        user.photo
      );
    }
  
    // Example method to parse JSON into a GoogleSignInData object
    static fromJson(json) {
      return new GoogleSignInData(
        json.idToken,
        json.scopes,
        json.serverAuthCode,
        json.user
      );
    }
  }

  export default GoogleSignInData;