from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import time
import sys

options = webdriver.ChromeOptions() 
options.add_argument("download.default_directory="+os.path.abspath(os.getcwd())+r"\SeleniumWebDriver")
options.add_experimental_option("prefs", {
  "download.default_directory": os.getcwd()+r"\CloudContents",
  "download.prompt_for_download": False,
  "download.directory_upgrade": True,
  "safebrowsing.enabled": True
})

PATH= os.path.abspath(os.getcwd())+r"\WebScraperScripts\SeleniumWebDriver\chromedriver"

#TODO automaticly close chrome after downloading.

driver=webdriver.Chrome(executable_path= PATH, options=options)
driver.get(sys.argv[1])

downloading=True
dirContents=os.listdir(os.getcwd()+r"\CloudContents")
print(dirContents)

