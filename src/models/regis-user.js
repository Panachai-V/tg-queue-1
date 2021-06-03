export default class RegisUserFForDri {
    constructor(
        username,
        password, 
        email, 
        taxId, 
        roleId,
        prefix,
        firstname,
        lastname,
        phone) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.taxId = taxId;
      this.roleId = roleId;
      this.prefix = prefix;
      this.firstname = firstname;
      this.lastname = lastname;
      this.phone = phone;
    }
  }