import re
import json
import time
import random
import datetime
from bson import json_util
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient
import argparse

# MongoDB setup
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['unboxed']  # Database name
collection = db['instagram_data']  # Collection name

# Argument parser setup
parser = argparse.ArgumentParser(description='Scrape Instagram for a specific hashtag.')
parser.add_argument('keyword', type=str, help='Hashtag keyword to search for')
args = parser.parse_args()

# Use the keyword from the argument
keyword = args.keyword

def extract_likes_comments(description):
    likes_match = re.search(r'(\d+) likes', description)
    comments_match = re.search(r'(\d+) comments', description)
    
    likes = int(likes_match.group(1)) if likes_match else 'Unknown'
    comments_count = int(comments_match.group(1)) if comments_match else 'Unknown'
    
    return likes, comments_count

def scrape_post_data(driver, keyword):
    time.sleep(2)
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    description = soup.find('meta', property='og:description')['content'] if soup.find('meta', property='og:description') else 'N/A'
    likes, comments_count = extract_likes_comments(description)
    image_url = soup.find('meta', property='og:image')['content'] if soup.find('meta', property='og:image') else 'N/A'
    user_id = soup.find('meta', property='instapp:owner_user_id')['content'] if soup.find('meta', property='instapp:owner_user_id') else 'N/A'
    post_url = soup.find('link', rel='canonical')['href'] if soup.find('link', rel='canonical') else 'N/A'
    now = datetime.datetime.utcnow()

    return {
        "platform": "instagram",
        "keyword": keyword,
        "description": description,
        "likes": likes,
        "comments_count": comments_count,
        "image_url": image_url,
        "user_id": user_id,
        "post_url": post_url,
        #"scraped at" : now
    }

# WebDriver setup
driver = webdriver.Chrome()
driver.get("http://www.instagram.com")

username = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
password = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))

username.clear()
username.send_keys("Enter Username here")
password.clear()
password.send_keys("Enter Password here")

login_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()
#not_now = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Not Now")]'))).click()

# Custom keyword input
#keyword = input("Enter the hashtag keyword you want to search for: ")

time.sleep(20)
hashtag_url = f"https://www.instagram.com/explore/tags/{keyword}/"
driver.get(hashtag_url)

WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "article")))

time.sleep(8)
alinks = driver.find_elements(By.TAG_NAME, 'a')
links = [link.get_attribute('href') for link in alinks]

for scroll in range(1, 3):
    driver.execute_script("window.scrollBy(0, 12000);")
    time.sleep(1)
    driver.execute_script("window.scrollBy(0, 5000);")
    time.sleep(5)
    driver.execute_script("window.scrollBy(0, -4000);")
    time.sleep(1)
    driver.execute_script("window.scrollBy(0, 5000);")
    time.sleep(random.randint(1, 5))
    alinks = driver.find_elements(By.TAG_NAME, 'a')
    links += [link.get_attribute('href') for link in alinks]

posts = list(set([str(link) for link in links if str(link).startswith('https://www.instagram.com/p/')]))

print(f"Found {len(posts)} unique posts")

for post_url in posts[:10]:  # Limiting to the first 10 unique posts
    driver.get(post_url)
    post_data = scrape_post_data(driver, keyword)
    print(json.dumps(post_data, indent=4,default=json_util.default))
    
    # Insert the scraped data along with the keyword into MongoDB
    collection.insert_one(post_data)

