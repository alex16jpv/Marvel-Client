export default class Base {
  baseUrl;
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }
}
