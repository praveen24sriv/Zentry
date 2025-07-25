import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }
  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      // This fails if user is not logged in
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("User not logged in or session expired:", error.message);
      return null;
    }
  }
  async Logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
