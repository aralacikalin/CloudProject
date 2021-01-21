from selenium import webdriver
import os
import time
import sys


from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from selenium.webdriver.common.keys import Keys



PATH= os.path.abspath(os.getcwd())+r"\WebScraperScripts\SeleniumWebDriver\geckodriver"
fp = webdriver.FirefoxProfile(os.path.abspath(os.getcwd())+r"\WebScraperScripts\SeleniumWebDriver\wn4kfhhq.default-release")
driver=webdriver.Firefox(executable_path= PATH,firefox_profile=fp)

driver.get(sys.argv[1])
#for making the browser in focus for pressing enter

downloading=False
dirContents=os.listdir(os.getcwd()+r"\TorrentDownloads")
tempDownloadName=None


links=driver.find_elements_by_xpath('.//a')
isNotFound=True
for link in links:
    try:
        if("magnet" in link.get_attribute("href")):
            link.click()
            isNotFound=False
            break
    except:
        driver.quit()
        print("NO")
        time.sleep(2)
        quit()

if(isNotFound):
    driver.quit()
    print("NO")
    time.sleep(2)
    quit()


time.sleep(2)

try:
    driver.switch_to.window(driver.window_handles[0])
except Exception:
    print("no other tab")

checkCount=0
while(not downloading):
    newDirContents=os.listdir(os.getcwd()+r"\TorrentDownloads")
    if(newDirContents!=dirContents):
        downloading=True
        break
    print(checkCount)
    if(checkCount>20):
        break
    checkCount+=1
    time.sleep(1)

if(downloading):
    print("OK")
else:
    print("NO")



driver.quit()
quit()