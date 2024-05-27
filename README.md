

5. List Foods
    1. create food model 
    2. create data.ts
        1. Add sample foods
    3. Add image to assets
    4. create food service
    5. create home component
        1. add ts
        2. add html
        3. add css

6. search
    1. Add method to food service
    2. add search router
    3. show search result in home component
    4. generate search component
        1. add to home component
        2. add ts
        3. add html
        4. add css

7. Tags Bar
    1. create tag model
    2. Add sample tags to data.ts
    3. food service
        1. add get all tags method
        2. add get all foods by tag method 
    4. add tags route
    5. show tags result in home component
    6. generate Tags component
        1. add to home component
        2. add ts
        3. add html
        4. add css

8. Food page
    1. add method to food service
    2. Generate Food page component
        1. add Route
        2. add ts
        3. add html
        4. add css

9. Cart Page
    1. create CartItem Model
    2. create cart Model
    3. generate cart service
    4. Add to cart button in food page
    5. generate cart page component 
        1. add route
        2. add ts
        3. add html
        4. add css

10. Not Found!
    1. Generate Component
        1. add ts
        2. add html
        3. add css
    2. add to page
        1. home page 
        2. food page 
        3. cart page

11. Connect To Backend
    1. Create backend folder
    2. npm init -y
    3. npm install typescript 
    4. create tsconfig.json inside the backend file and then type the necessary components
    5. create .gitignore
    6. copy data.ts to backend/src
    7. npm install express cors
    8. create server.ts inside the src file
        1. install @types 
            "import express from 'express'; and click on ctrl + . to get that dependencies downloaded
            "import cors from 'cors';
            "
        2. add APIs
    9. npm install nodemon ts-node --save-dev
            " add this line inside the package.json inside the "script" dictionary
                "start": "cd src && nodemon server.ts",

                and then run 'npm start' inside the terminal
            "
    10. Add urls.ts to frontend
    11. Add HttpClient Module
    12. Update food service

12. Login Page
    1. Generate Component
        1. add to route
        2. add ts
        3. add html
            1. import reactive forms module
        4. add css
    2. add login api
        1. use json
        2. add jsonwebtoken 
        3. test using postman
    3. Generate user service
        1. generate user model
        2. add user subject
        3. add login method
            1. add user urls
            2. Generate IUserLogin interface
            3. add ngx-toaster
                # we need to npm install bgx-toastr
                # we need to import Toastr and BrowserAnimationModule inside the app.module and then add it to the imports
                # inside Angular.json file we need to go to style{"", "node_modules/ngx-toastr/toastr.css" }
                1. import module
                2. import BrowserAnimationsModule
                3. add styles in Angular.json
            4. add to header
        4. add local storage methods
        5. add layout method
            1. add to header 

13. make components for Login Page
    1. Input Container
    2. InPut Validation
    3. Text Input
    4. Default button

14. Connect Login API To MongoDB Atlas
    1. Moving API into routers
    2. create MongoDB Atlas
    3. create .env file
    4. install
        # past this inside the backend folder in the terminal
        # npm install mongoose dotenv bcryptjs express-async-handler
        1. mongoose
        2. dotenv
        3. bcryptjs
        4. jsonwebtoken
        5. express-async-handler
    5. Connect to MongoDB Atlas
    6. Use MongoDB instead of data.ts in apis

15. Register User
    1. Add Register api
    2. Add Register service method
    3. Add Register link
    4. Add Register Component

16. Loading!
    1. add image
    2. add component
    3. add service 
    4. add interceptor

17. Checkout page
    1. Create Order Model
    2. Create Checkout page component
        1. add to router
    3. add user to user service
    4. add cart to cart service
    5. create order item list component 
    6. Adding map to the checkout-page
        1. add leaflet npm package => npm install leaflet
            1. add @types/leaflet   => npm install --save-dev @types/leaflet
            2. add css to angular.json
        2. add addressLetLng to order model 
        3. create map component
            1. add to checkout page
            2. add ts
                1. change app map selector to map
            3. add html
            4. add css
        4. add auth Guard 
18. Payment page
    1. Generate component
    2. add 'getOrderForCurrentUser' api
    3. add order service method 
    4. connect component to server 
    5. make the map component readonly 

19. Adding Paypal
    1. Generate Component
        1. add to payment page
    2. Get paypal client Id
    3. add paypal JS to index.html
    4. set up Paypal button
    5. add pay api to order router
    6. get Paypal sandbox account

20. Order Track Page
    1. generate Component
        1. add to routes
    2. Add API
        1. add to urls.ts
    3. Add method to order.service
    4. add HTML
    5. add css
