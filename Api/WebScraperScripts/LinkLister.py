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

link=sys.argv[1]

driver=webdriver.Chrome(executable_path= PATH, options=options)
driver.get(link)
time.sleep(5)
links=driver.find_elements_by_tag_name('a')

try:
    downloadIndex=int(sys.argv[2])
    downloading=False
    dirContents=os.listdir(os.getcwd()+r"\CloudContents")
    tempDownloadName=None
    links[downloadIndex].click()
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
except:
    for i in range(len(links)):
        a=links[i]

        if(a.get_attribute('href')!=None):
            print(a.get_attribute('href'),",",end="") 
    driver.quit()
    print("OK")

