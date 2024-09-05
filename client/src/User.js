class User {
  // Constructor to initialize user properties
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Method to display user info
  displayUserInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Password: ${this.password}`);
  }
}

export default User;