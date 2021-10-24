import axios, { AxiosResponse } from "axios";
import parser from "fast-xml-parser";

const config = {
  headers: { Accept: "application/xml" },
};

const url = "http://localhost:44308/books";

const getBooks = async () => {
  const response: AxiosResponse = await axios.get(url, config);
  let jsonResponse: any = parseXmlToJson(response.data);
  return jsonResponse.ArrayOfBook.Book;
};

const getBookById = async (id: any) => {
  const response: AxiosResponse = await axios.get(url + "/" + id, config);
  console.log(response.data);

  let jsonResponse: any = parseXmlToJson(response.data);
  return jsonResponse.Book;
};

function parseXmlToJson(xml: any) {
  if (parser.validate(xml) === true) {
    return parser.parse(xml);
  }
  return "Not able to parse";
}

export { getBookById, getBooks };
