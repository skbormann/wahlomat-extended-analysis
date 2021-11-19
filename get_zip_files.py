#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov  6 19:53:15 2021

@author: sven-kristjanbormann
Download the list of available wahlomat zip files,  create new list to download
the zip files with the wahlomat definitions, download the zip files and extract
the content.
"""
import re
import urllib
import os
import zipfile

#%% Download the raw html website which lists the available zip files.
raw_zip_hmtl: str = urllib.request.urlopen(
    "https://www.bpb.de/politik/wahlen/wahl-o-mat/45817/weitere-wahlen"
    ).read().decode()

#%% Extract the zip files, clean the links and create working links for internallly linked zip-files
zip_files: list = re.findall('href=\".+?\.zip\"', raw_zip_hmtl, re.MULTILINE)

zip_files=[f.replace("href=","").strip('"') for f in zip_files]
    
INTERNAL_LINK_START = "https://www.bpb.de"
zip_files_links =[]
# Create final list with the prefix for the internal links added
for f in zip_files:
    if re.search('/system',f):
        zip_files_links.append(f"{INTERNAL_LINK_START}" + f)
    else:
        zip_files_links.append(f)    

#%% Create folder names
zip_files_names = []
for f in zip_files_links:
    if re.search(r'wahl-o-mat.de',f):
        zip_files_names.append(f.split(sep="/")[3])
    elif f.split(sep="/")[2]=="www.bpb.de":
        zip_files_names.append(f.split(sep="/")[6].split(sep=".")[0])
zip_files_names = [f.replace("wahlomat-","").replace("-","") for f in zip_files_names]

#%% Create data and graphs folder
try:
    os.mkdir(f"{os.path.join(os.getcwd(),'data')}")
except FileExistsError:
    print("Folder 'data' already exists.")

try:
    os.mkdir(f"{os.path.join(os.getcwd(), 'graphs')}")  
except FileExistsError:
    print("Folder 'graphs' already exists.") 
    
os.chdir('data')   
#%%Download all zip files and extract them 
 
for i, f in enumerate(zip_files_links):
    urllib.request.urlretrieve(f, filename=f"{os.getcwd()}/{zip_files_names[i]}.zip")

# Based on https://stackoverflow.com/questions/31346790/unzip-all-zipped-files-in-a-folder-to-that-same-folder-using-python-2-7-5
extension = ".zip"    
for file in os.listdir():
    if zipfile.is_zipfile(file):
        file_name=os.path.abspath(file)
        try: 
            os.mkdir(f"{os.path.join(os.getcwd(),file.split(sep='.')[0])}")
        except FileExistsError:
            pass
        with zipfile.ZipFile(file_name) as f:
            f.extractall(path=f"{os.path.join(os.getcwd(),file.split(sep='.')[0])}")
        os.remove(file_name)
        
