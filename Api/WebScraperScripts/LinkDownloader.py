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


driver=webdriver.Chrome(executable_path= PATH, options=options)
driver.get(sys.argv[1])

downloading=False
dirContents=os.listdir(os.getcwd()+r"\CloudContents")
tempDownloadName=None

checkCount=0

while(not downloading):
    time.sleep(1)
    dirContents=os.listdir(os.getcwd()+r"\CloudContents")
    for f in dirContents:
        if "crdownload" in f:
            downloading=True
            tempDownloadName=f
    checkCount+=1
    if(checkCount>20):
        break
time.sleep(1)

while(downloading):
    time.sleep(1)
    dirContents=os.listdir(os.getcwd()+r"\CloudContents")
    if not(tempDownloadName in dirContents):
        downloading=False
time.sleep(3)
driver.quit()

