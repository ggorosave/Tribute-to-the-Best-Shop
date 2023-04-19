# Tribute to the Best Shop
This is not the best shopping website in the world, it is just a tribute. E-commerce websites have become an essential part of our society. Tribute to the Best Shop is a MERN stack e-commerce site that allows users to create an account, add items to their cart, and checkout and pay at their convenience. This project was originally assigned to me as extra credit through the University of Arizona Web Development Boot Camp. However, I noticed the use of Redux in the assignment was outdated and decided to refactor it. I refactored the styling using [Chakra-UI](https://chakra-ui.com/) and followed to [Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) docs to use the most up-to-date method for building reducers. [Stripe](https://stripe.com/docs) is used to manage payments. Minimal changes were made on the back end.

### Deployed Application
[Tribute to the Best Shop](https://tribute-to-the-best-shop.herokuapp.com/)

![Tribute to the Best Shop](./client/public/images/Tribute%20Shop%20Home.png)

## Table of Contents
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Usage
Use the link above to find the deployed application. You may start adding items to the cart from the home screen, but checkout will be locked until you login. You can click on the links at the top to sign up or login. Once logged in, you'll be able to checkout at your convenience. Since this is not a real e-commerce site, Stripe only runs in test mode. On the Stripe checkout screen, you can use the card number 4242 4242 4242 4242 for the card number, any three digits for the CVC, and any future date for the expiration. Once your order is placed, you should be taken to a success screen. You may have noticed the links on the nav bar changed once you logged in. You can now view your order history or logout. 

**Note:** There is currently an error occurring with Stripe checkout and I'm looking into fixing the problem as soon as possible. 

## License
This project is covered under the [MIT License](https://github.com/ggorosave/Tribute-to-the-Best-Shop/blob/main/LICENSE).

## Questions

If you have any questions about the repo, contact me at [ggorosave@gmail.com](mailto:ggorosave@gmail.com) or through [LinkedIn](https://www.linkedin.com/in/grantgorosave/). Find more of my work at [ggorosave](https://https://github.com/ggorosave).