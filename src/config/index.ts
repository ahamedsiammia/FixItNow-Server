import dotenv from "dotenv"
import { SignOptions } from "jsonwebtoken";
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")});


export default {
    port : process.env.PORT,
    app_url : process.env.APP_URL,
    backend_app_url : process.env.BACKEND_APP_URL,
    database_url : process.env.DATABASE_URL,
    bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS ,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret  : process.env.JWT_REFRESH_SECRET as string,
    jwt_access_expires_in :process.env.JWT_ACCESS_EXPIRES_IN as SignOptions ,
    jwt_refresh_expires_in   : process.env.JWT_REFRESH_EXPIRES_IN  as SignOptions,
    stripe_secrete_key : process.env.STRIPE_SECRETE_KEY as string,
    stripe_product_price_id : process.env.STRIPE_PRODUCT_PRICE_ID as string,
    stripe_webhook_secret : process.env.STRIPE_WEBHOOK_SECRET as string,
    ssl_comarz_store_id : process.env.SSL_COMARZ_STORE_ID,
    ssl_comarz_store_password : process.env.SSL_COMARZ_STORE_PASSWORD
}   