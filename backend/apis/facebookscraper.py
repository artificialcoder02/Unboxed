from apify_client import ApifyClient
from pymongo import MongoClient
from datetime import datetime
import argparse

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['unboxed']
collection = db['facebook_data']

# Argument parser setup
parser = argparse.ArgumentParser(description='Scrape Instagram for a specific hashtag.')
parser.add_argument('keyword', type=str, help='Hashtag keyword to search for')
args = parser.parse_args()

# Use the keyword from the argument
keyword = args.keyword

# Initialize the ApifyClient with your API token
apify_client = ApifyClient("apify_api_7qtgQaUS34NzuFZdxxUHIbphyKvc0I1JDZTy")

# Prepare the Actor input
#keyword = "Amikkr"
run_input = {
    "keywordList": [keyword],
    "resultsLimit": 10,
}

# Run the Actor and wait for it to finish
run = apify_client.actor("qgl7gVMdjLUUrMI5P").call(run_input=run_input)

# Function to extract necessary data from each item
def extract_relevant_data(item, keyword):
    now = datetime.utcnow()
    return {
        'platform' : "facebook",
        'keyword': keyword,
        #'scraped_at': now,
        'user_id': item.get('user', {}).get('id'),
        'user_name': item.get('user', {}).get('name'),
        'profile_url': item.get('user', {}).get('profileUrl'),
        'post_date': item.get('date'),
        'post_url': item.get('url'),
        'post_text': item.get('text'),
        'likes_count': item.get('likesCount'),
        'shares_count': item.get('sharesCount'),
        'views_count': item.get('viewsCount'),
        'comments_count': item.get('commentsCount'),
        'media_urls': [attachment.get('thumbnail') for attachment in item.get('attachments', []) if attachment.get('thumbnail')]
    }

# Fetch and process Actor results from the run's dataset
for item in apify_client.dataset(run["defaultDatasetId"]).iterate_items():
    post_data = extract_relevant_data(item, keyword)
    collection.insert_one(post_data)

print(f"Data successfully inserted into MongoDB.")
