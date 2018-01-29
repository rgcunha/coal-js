export class Connection {
  constructor({email, token, handle = null}) {
    this._email = email;
    this._token = token,
    this._handle = handle;
  }

  get email() {
    return this._email;
  }

  get token() {
    return this._token;
  }

  get handle() {
    return this._handle;
  }

  set email(email) {
    this._email = email;
  }

  set token(token) {
    this._token = token;
  }

  set handle(handle) {
    this._handle = handle;
  }
}
