from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import time
import sys

options = webdriver.ChromeOptions() 
options.add_argument("download.default_directory="+os.path.abspath(os.getcwd())+r"\SeleniumWebDriver")

PATH= os.path.abspath(os.getcwd())+r"\WebScraperScripts\SeleniumWebDriver\chromedriver"

#TODO automaticly click keep to downloading file

driver=webdriver.Chrome(executable_path= PATH, options=options)
driver.get(sys.argv[1])
