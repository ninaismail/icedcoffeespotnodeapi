# IcedCoffeeSpot Node.js API

This repository is a Node.js API for the IcedCoffeeSpot application.

## Requirements

- Node.js (version 12.13.0 or higher)
- MongoDB Server (optional)
- Google OAth2.0 Client App: [Make One](https://developers.google.com/identity/protocols/oauth2)

## Usage

Setting up your development environment on your local machine

1. Clone the repository: 
git clone git@github.com:ninaismail/icedcoffeespotnodeapi.git
cd icedcoffeespotnodeapi
2. Create a `.env` file: cp .env.example
3. Install dependencies: 

```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

### Before starting

1. Create a database:

```bash
mongosh
> use icedcoffeespot
```

2. Setup your credentials in the .env file:

```bash
DATABASE_URL = mongodb://127.0.0.1/icedcoffeeapp
SEC_PASS_KEY = {SEC_PASS_KEY}
JWT_SEC = {JWT_SEC}
GOOGLE_CLIENT_ID = {GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET = {GOOGLE_CLIENT_SECRET}
CLIENT_URL_SUCCESS = {CLIENT_URL_SUCCESS}
CLIENT_URL = {CLIENT_URL}
GOOGLE_CALLBACK_URL = {GOOGLE_CALLBACK_URL}
```

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature)
3. Make changes and commit them (git commit -am 'Add feature')
4. Push to the branch (git push origin feature)
5. Create a new Pull Request


Do not hesitate to contribute to the project by adapting or adding features, Bug reports and fixes or pull requests are welcome.




