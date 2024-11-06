import { v4 as uuidv4 } from 'uuid'

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

class UserModel {
  private users: User[] = [];

  create(userData: Omit<User, "id">): User {
      const newUser = { id: uuidv4(), ...userData };
      this.users.push(newUser);
      return newUser;
  }

  findAll(): User[] {
      return this.users;
  }

  findById(id: string): User | undefined {
      return this.users.find(user => user.id === id);
  }

  update(id: string, userData: Partial<Omit<User, "id">>): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;

    const updatedUser = {
        ...this.users[userIndex],
        ...userData
    };
    
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: string): boolean {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) return false;
      this.users.splice(index, 1);
      return true;
  }
}

export default new UserModel();
