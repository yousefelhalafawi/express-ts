[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/yousefelhalafawi/express-ts)
# Express TypeScript API  
  
A RESTful API built with Express.js and TypeScript featuring category and product management with image upload capabilities.  
  
## Features  
  
- **Category Management**: Full CRUD operations for product categories  
- **Product Management**: Complete product lifecycle with category relationships  
- **Image Upload**: File upload handling with validation and storage  
- **Input Validation**: Joi schema validation for all endpoints  
- **Error Handling**: Centralized error management with custom AppError class  
- **TypeScript**: Full type safety throughout the application  
- **MongoDB Integration**: Mongoose ODM for database operations  
  
## Tech Stack  
  
- **Runtime**: Node.js  
- **Framework**: Express.js 5.1.0  
- **Language**: TypeScript 5.8.3  
- **Database**: MongoDB with Mongoose 8.14.1  
- **Validation**: Joi 17.13.3  
- **File Upload**: Multer 1.4.5  
- **Development**: ts-node-dev for hot reload  
  
## Prerequisites  
  
- Node.js >=18  
- MongoDB 4.4+  
- npm (latest version)  
  
## Installation  
  
1. Clone the repository:  
```bash  
git clone https://github.com/yousefelhalafawi/express-ts  
cd express-ts
2. Install dependencies:
npm install
3.Create environment file:
# .env  [header-2](#header-2)
PORT=3010  
DB_URL=mongodb://localhost:27017/express-ts-app
4.Running the Application
Development Mode
npm run dev
Production Build
npm run build  
npm start
