
import { UserRepository } from '../repositories/UserRepository';
import { User, UserDTO, LoginRequest, RegisterRequest, AuthResponse } from '../models/User';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmailAndPassword(loginData.email, loginData.password);
    
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    const userDTO: UserDTO = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    return { success: true, user: userDTO };
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(registerData.email);
    
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = await this.userRepository.create(registerData);
    
    const userDTO: UserDTO = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };

    return { success: true, user: userDTO };
  }
}
