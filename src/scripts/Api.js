class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c0f10755-3119-4811-a4e2-2f45d80cb193",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

export default Api;
