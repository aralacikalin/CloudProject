from selenium import webdriver
import os
import time
import sys

from pynput.keyboard import Key, Controller

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from selenium.webdriver.common.keys import Keys


options = webdriver.ChromeOptions() 
options.add_argument("--disable-popup-window")
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
#for making the browser in focus for pressing enter
driver.minimize_window()  
driver.maximize_window()

links=driver.find_elements_by_xpath('.//a')
for link in links:
    if("magnet" in link.get_attribute("href")):
        link.click()
        break

time.sleep(5)

#accepting open prompt by pressing enter
keyboard=Controller()
keyboard.press(Key.left)
keyboard.release(Key.left)
keyboard.press(Key.enter)
keyboard.release(Key.enter)


#TODO: Check if download has started or not

try:
    driver.switch_to.window(driver.window_handles[0])
except Exception:
    print("no other tab")



try:
    WebDriverWait(driver, 10).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')

    time.sleep(5)
    

    alert = driver.switch_to.alert
    alert.accept()
    print("alert accepted")
except TimeoutException:
    print("no alert")
print("OK")

driver.quit()