import axios from "axios";
import Base from "./base";

export default class CharacterService extends Base {
  constructor() {
    super();
    this.path = `${this.baseUrl}/characters`;
  }

  async getCharacters() {}

  async getCharacter(id) {
    const response = await axios.get(`${this.path}/${id}`);
    return response.data.data;
  }
}
