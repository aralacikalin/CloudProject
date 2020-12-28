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


links=driver.find_elements_by_xpath('.//a')
for link in links:
    if("magnet" in link.get_attribute("href")):
        link.click()
        break

time.sleep(5)




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