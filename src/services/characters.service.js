import axios from "axios";
import Base from "./base";

export default class CharacterService extends Base {
  constructor() {
    super();
    this.path = `${this.baseUrl}/characters`;
  }

  async getCharacters(pagination) {
    const response = await axios.get(this.path, {
      params: {
        offset: pagination.offset,
        limit: pagination.limit
      }
    });
    return response.data.data;
  }

  async getCharacter(id) {
    const response = await axios.get(`${this.path}/${id}`);
    return response.data.data;
  }
}
