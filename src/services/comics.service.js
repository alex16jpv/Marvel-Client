import axios from "axios";
import Base from "./base";

export default class ComicsService extends Base {
  constructor() {
    super();
    this.path = `${this.baseUrl}/comics`;
  }

  async getComics(pagination) {
    const response = await axios.get(this.path, {
      params: {
        titleStartsWith: pagination.titleStartsWith,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data.data;
  }

  async getComic(id) {
    const response = await axios.get(`${this.path}/${id}`);
    return response.data.data;
  }
}
