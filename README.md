# Welcome to my GraphQL recipe Challenge

## Not mandatory dependencies: 
-  **dotenv**: create enviroment variables
- **type-graphql**: Decorators of graphql it is an faster and declarative way to write graphql code    
- **class-validator**: dependency of "type-graphql"
-  **reflect-metadata**: Some decorators to implement with "typeorm"

## How to start
- ### First of all clone this repository:  `git clone https://github.com/gustavom12/RecipesChallenge.git`
- ### Run `npm i` to install all dependencies

## Config database: 
- **Ensure you have installed mysql and Xampp or Wampp**
- **Start mysql server and create a new Database Named "RecipeChallenge"** (if you want, you could change database's name in config.ts file)
- ###   Run `npm run build && npm run start`
# Important info
### In some queries, you must be authenticated so you must send a "bearer token" in your header request,  (you could get this token by singing up and login).
### To test graphql protected queries, I recomend to use Postman or insomia.

### Once you have tested this, you can deactivate it in "config.ts" file

# Happy testing! 
