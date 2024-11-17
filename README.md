# SHASHA - BUY

**SHASHA - BUY** is a web application that allows users to compare prices from different websites and find the best deals for their desired items. This README file provides instructions on how to set up and run the application on your local machine.
## Supported Websites
SHASHA - BUY currently compares prices from the following online retailers:

- **Wesbuy**: Known for a wide range of products at competitive prices.
- **Walmart**: Offers a vast assortment of goods from groceries to tech gadgets.
- **Newegg**: Specializes in consumer electronics, with a focus on computer parts and hardware.
## Prerequisites
Before getting started, make sure you have the following software installed on your computer:

- Node.js (version 14 or higher)
- Python (version 3.6 or higher)
- pip (Python package installer)

## Demo 


https://github.com/user-attachments/assets/207dc476-5ea5-4e4d-b815-a2cd4eba7ec2



## Installation

1. Clone the repository to your local machine using git clone. 
2. Navigate to the project directory: 
  cd shasha-buy-price-comparison-page
### Running the Application
To run the SHASHA - BUY application, you need to start both the Next.js frontend server and the FastAPI backend server for fetching data.

### Start the FastAPI backend server:

Run the server using: uvicorn fetching_data:app --reload
The API will be available at http://127.0.0.1:8000 after you start uvicorn.
### Install the required dependencies for the Next.js frontend:
1. cd shasha_buy
2. npm install
3. npm run dev
This command will start the Next.js development server at http://localhost:3000.

## Open your web browser and visit http://localhost:3000 to access the SHASHA - BUY application.

## Accessing the Advanced Search Feature
A specific version of SHASHA - BUY includes the ability to search for similar items using OpenAI's API. To access this feature, you need to check out the specific commit:
git checkout 2ec09623eb6bdcf89a73808dfb73bd136804e4ce
### Configuring the OpenAI API Key
To use the similar item search feature, you must obtain an API key from OpenAI. Once you have your API key, insert it into the designated place in the `fetch_data.py` file:

- Open `fetch_data.py`
- Locate the line `put here your api key`
- Replace `put here your api key` with your actual OpenAI API key

## Running the Application
To run the SHASHA - BUY application, you need to start both the Next.js frontend server and the FastAPI backend server for fetching data.



## Usage
Once the application is running, you can use the search form on the home page to enter an item name and search for the best deals across different websites. The application will fetch the prices from various websites and display the results on the search results page.

# Contributing
We welcome contributions to the SHASHA - BUY project! Whether it's bug fixes, feature additions, or improvements in documentation, here's how you can contribute:

1. **Fork the repository** - Start by forking the SHASHA - BUY repository to your GitHub account.
2. **Create a new branch** - Create a branch in your forked repository for your feature or bug fix. Name it something relevant to the changes you're making.
3. **Make your changes** - Update the code or documentation as needed. Make sure your changes are clear and easy to understand.
4. **Commit your changes** - Use descriptive commit messages that explain your modifications clearly and concisely.
5. **Push your changes** - Push the changes to your fork on GitHub.
6. **Submit a pull request** - Open a pull request from your forked repository to the main SHASHA - BUY repository. Provide a clear description of the problem and solution, including any relevant issue numbers.

Join us in improving SHASHA - BUY and making shopping more enjoyable and efficient for everyone!

# License
The SHASHA - BUY project is licensed under the MIT License. This license permits anyone to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided the original copyright and license notice are included in all copies or substantial portions of the software. See the LICENSE file in the repository for full details.

# Contact
If you have any questions, feedback, or suggestions about the SHASHA - BUY project, please don't hesitate to reach out to us. We look forward to hearing from you and welcome your input on making SHASHA - BUY even better.

Happy shopping! Let's make finding the best deals online easier and more fun for everyone!




