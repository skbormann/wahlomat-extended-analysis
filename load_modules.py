#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Nov  9 22:54:07 2021

@author: sven-kristjanbormann

Next step in the analysis after downloading the wahlomat files and unpacking them,
is to run the analysis script on each folder/wahlomat.

"""

import pathlib
import os
from analysis import analysis

os.chdir('data')
p = pathlib.Path('.')
module_list = list(p.glob('**/module_definition.js'))

# %% Loop over all modules
# Record with ones succeeded and which failed
success = []
fail = {}
for module in module_list:
    module_stem_folder = module.parts[0]
    try:
        with open(module) as f:
            module_content = f.read()

    except UnicodeDecodeError:  # Some files are not correctly encoded with utf-8
        try:
            with open(module, encoding='latin1') as f:
                module_content = f.read()

        except Exception as e:
            print(f'Unexpected error {e}')
    print(f"Running analysis for {module_stem_folder}")
    try:
        analysis(module_content, module_stem_folder)
        success.append(f'{module_stem_folder}')
    except Exception as e:
        print(
            f"Problem {e} occured while running analysis for {module_stem_folder}")
        fail[f'{module_stem_folder}'] = f"{e}"
