const UserRepository = require('./userRepository');

module.exports = class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  findById(id) {
    return this.userRepository.findById(id)
      .then(user => UserService.mapUserToDto(user));
  }

  addUser(user) {
    return this.userRepository.addUser(user);
  }

  editUser(dto) {
    const user = UserService.mapDtoToUser(dto);
    return this.userRepository.editUser(dto.id, user);
  }

  deleteUser(id) {
    return this.userRepository.deleteUser(id);
  }

  changePassword(id, salt, passwordHash) {
    return this.userRepository.changePassword(id, salt, passwordHash);
  }

  static mapUserToDto(user) {
    return user ? {
      id: user._id,
      email: user.email,
      age: user.age,
      login: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address || {},
    } : {};
  }

  static mapDtoToUser(dto) {
    return dto ? {
      email: dto.email,
      age: dto.age,
      login: dto.fullName,
      firstName: dto.firstName,
      lastName: dto.lastName,
      address: dto.address,
    } : {};
  }
};
