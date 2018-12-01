import csv
import requests
from bs4 import BeautifulSoup

test_url = "https://mediabiasfactcheck.com/new-york-times/"
page = requests.get(test_url)

soup = BeautifulSoup(page.text, 'html.parser')
