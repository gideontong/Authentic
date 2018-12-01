import csv
import requests
from bs4 import BeautifulSoup

test_url = "https://mediabiasfactcheck.com/new-york-times/"
page = requests.get(test_url)

soup = BeautifulSoup(page.text, 'html.parser')

'''

This Python program was never finished.
It's original intent was to scrape mediabiasfactcheck.com and create our own CSV, but that was never completed because we found better alternatives.

'''