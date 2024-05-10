from fastapi import FastAPI, HTTPException
import requests
from bs4 import BeautifulSoup
import json
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import asyncio

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
client = OpenAI(
    api_key=  PUT_HERE_YOUR_API_KEY
)


@app.get("/search_similar/{product_name}")
async def search_similar_items(product_name: str):

    prompt = f"give me 5 similar items to {product_name} in a json format where number is the key and the value is the item name"
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a book summarization AI."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        items = json.loads(response.choices[0].message.content)
        results = await asyncio.gather(*(search_all_sites(item) for item in items.values()))
        return results, 200
    except Exception as e:
        raise f"Unable to connect to chat-gpt API - {str(e)}"


@app.get("/search/{product_name}")
async def search_all_sites(product_name: str):
    results = []
    # Adding each specific search function into a dictionary for easier iteration
    search_functions = {
        "Best Buy": search_bestbuy,
        "Walmart": search_walmart,
        "Newegg": search_newegg
    }

    # Loop through the dictionary and execute each search function
    for site, func in search_functions.items():
        try:
            result = await func(product_name)
            results.append({
                "site": site,
                "item": result.get("item"),
                "price": result.get("price"),
                "url": result.get("url", "No URL found")  # Assuming your search functions return a URL
            })
        except Exception as e:
            results.append({
                "site": site,
                "error": str(e)
            })

    if not results:
        raise HTTPException(status_code=404, detail="No products found")
    return results, 200


@app.get("/search/bestbuy/{product_name}")
async def search_bestbuy(product_name: str):
    url = "https://www.bestbuy.com/site/searchpage.jsp"
    params = {"st": product_name, "intl": "nosplash"}
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    response = requests.get(url, headers=headers, params=params)
    soup = BeautifulSoup(response.text, 'html.parser')
    products = soup.select('ol.sku-item-list li.sku-item')
    item_link = products[0].select_one('div.column-middle h4.sku-title > a')
    price = products[0].select_one(
        'div.column-right > div.sku-list-item-price div[data-testid="customer-price"] > span')
    item_url = "https://www.bestbuy.com" + item_link['href'] if item_link else "No URL found"
    return {"item": item_link.text if item_link else "Product not found",
            "price": price.text[1:] if price else "Price not available", "url": item_url}


@app.get("/search/walmart/{product_name}")
async def search_walmart(product_name: str):
    search_url = f"https://www.walmart.com/search/?q={product_name}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    try:
        json_data = json.loads(soup.find('script', id='__NEXT_DATA__').string)
        price = json_data['props']['pageProps']['initialData']['searchResult']['itemStacks'][0]['items'][0]['price']
        name = json_data['props']['pageProps']['initialData']['searchResult']['itemStacks'][0]['items'][0]['name']
        item_url = f"https://www.walmart.com/ip/{json_data['props']['pageProps']['initialData']['searchResult']['itemStacks'][0]['items'][0]['id']}"
        return {"item": name, "price": price, "url": item_url}
    except (KeyError, TypeError, AttributeError):
        return {"item": "Product not found", "price": "Price not available", "url": "No URL found"}


@app.get("/search/newegg/{product_name}")
async def search_newegg(product_name: str):
    url = "https://www.newegg.com/p/pl"
    params = {"d": product_name}
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    response = requests.get(url, headers=headers, params=params)
    soup = BeautifulSoup(response.text, 'html.parser')
    cells = soup.find_all("div", attrs={"class": "item-cell"})
    for cell in cells:
        if cell.find("div", attrs={"class": "txt-ads-link"}) is None:
            title_tag = cell.find_all("a", attrs={"class": "item-title"})
            name = title_tag[0].text
            price = cell.find("li", attrs={"class": "price-current"})
            item_url = title_tag[0]['href'] if title_tag[0] else "No URL found"
            return {"item": name if name else "Product not found",
                    "price": price.text.split()[0].replace('$', '').replace(',',
                                                                            '') if price else "Price not available",
                    "url": item_url}
    return "Product not found", 404


async def main():
    # Testing or other logic can be added here if necessary

    # Start the FastAPI app
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)


if __name__ == "__main__":
    uvicorn.run("fetching_data:app", host="127.0.0.1", port=8000, reload=True)


# To run this application:
# Run the server using: uvicorn fetching_data:app --reload
# The API will be available at http://127.0.0.1:8000 after you start uvicorn.
