from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import time

options = webdriver.ChromeOptions() 
options.add_argument("download.default_directory="+os.path.abspath(os.getcwd())+r"\SeleniumWebDriver")

PATH= os.path.abspath(os.getcwd())+r"\SeleniumWebDriver\chromedriver"
if os.path.exists(PATH):
    print("tesss")


driver=webdriver.Chrome(executable_path= PATH, options=options)
driver.get("https://code.visualstudio.com/download")
links=driver.find_elements_by_xpath('.//a')
for i in range(len(links)):
    a=links[i]

    print(a.get_attribute('href'))
    
    try:
        oldUrl=driver.current_url
        a.send_keys(Keys.CONTROL + Keys.ENTER) #opens link in new tab
        windows = driver.window_handles
        driver.switch_to.window(windows[0])
        newUrl=driver.current_url
        if newUrl!=oldUrl:
            driver.back()
            links=driver.find_elements_by_xpath('.//a')
        

    except:
        continue
