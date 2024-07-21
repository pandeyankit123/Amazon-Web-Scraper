import asyncio
from playwright.async_api import async_playwright
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

async def fetch_product_data(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url)
        
        title = await page.locator('span#productTitle').inner_text() or 'Title not found'
        
        # Narrowing down the price selector
        price = 'Price not found'
        price_elements = page.locator('span.a-price-whole')
        if await price_elements.count() > 0:
            price = await price_elements.nth(0).inner_text()  # Assuming the first match is the correct price
        
        description = await page.locator('#feature-bullets').inner_text() or 'Description not found'
        image = await page.locator('img#landingImage').get_attribute('src') or 'Image not found'
        
        await browser.close()
        
        return {
            'title': title.strip(),
            'price': price.strip(),
            'description': description.strip(),
            'image': image.strip()
        }

@api_view(['POST'])
def scrape_product(request):
    url = request.data.get('url')
    try:
        product_data = asyncio.run(fetch_product_data(url))
        return Response(product_data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

async def fetch_multiple_product_data(urls):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        product_data = []
        
        for url in urls:
            try:
                page = await browser.new_page()
                await page.goto(url)
                
                title = await page.locator('span#productTitle').inner_text() or 'Title not found'
                
                # Narrowing down the price selector
                price = 'Price not found'
                price_elements = page.locator('span.a-price-whole')
                if await price_elements.count() > 0:
                    price = await price_elements.nth(0).inner_text()  # Assuming the first match is the correct price
                
                description = await page.locator('#feature-bullets').inner_text() or 'Description not found'
                image = await page.locator('img#landingImage').get_attribute('src') or 'Image not found'
                
                product_data.append({
                    'title': title.strip(),
                    'price': price.strip(),
                    'description': description.strip(),
                    'image': image.strip(),
                })
                await page.close()
            except Exception as e:
                product_data.append({
                    'title': 'Error',
                    'price': 'Error',
                    'description': 'Error',
                    'image': 'Error',
                    'error': str(e)
                })
        
        await browser.close()
        return product_data

@api_view(['POST'])
def compare_products(request):
    urls = request.data.get('urls', [])
    try:
        product_data = asyncio.run(fetch_multiple_product_data(urls))
        return Response(product_data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
