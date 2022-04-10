#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 11 01:23:25 2022

@author: sven-kristjanbormann

Build dataframe:
    Build a dataframe which contains the results of all wahlomats and export
    the result as a CSV.
    
How to do it:
    Use the code from load_module.py and analysis.py to create the dataframes
    for each wahlomat and then append them.
"""

# %% Setup
import pathlib
import re
import os
import pandas as pd
from pandas.core.frame import DataFrame

os.chdir('data')
p = pathlib.Path('.')
module_list = list(p.glob('**/module_definition.js'))

fail_list = ['schleswigholstein2005',
 'niedersachsen2008',
 'saarland2004',
 'bundestagswahl2005',
 'rlp2006',
 'sachsen2004',
 'sachsenanhalt2006',
 'bayern2003',
 'nrw2005',
 'bundestagswahl2009',
 'hamburg2008',
 'europa2004',
 'bremen2007',
 'bw2006']

# %% Loop over all modules
# Run over all modules which previously were successful and exclude the failed
# ones for now.
success = []
fail = {}
for module in module_list:
    module_stem_folder = module.parts[0]
    if module_stem_folder not in fail_list:
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
            #analysis(module_content, module_stem_folder)
            '''
            Add here the code to build append the dataframes
            
            
            '''
            # Download the raw JS data
            raw_data_js: str = module_content
            # Extract the data points with regex, regex needed slight changes compared to original
            # to match even if some spaces are missing.
            titles: list = re.findall(
                r"^WOMT_aThesen\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$", raw_data_js, re.MULTILINE
            )
            questions: list = re.findall(
                r"^WOMT_aThesen\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$", raw_data_js, re.MULTILINE
            )
            party_names: list = re.findall(
                r"^WOMT_aParteien\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$", raw_data_js, re.MULTILINE
            )
            party_abbrevs: list = re.findall(
                r"^WOMT_aParteien\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$", raw_data_js, re.MULTILINE
            )
            raw_answers: list = re.findall(
                r"^WOMT_aThesenParteien\[(\d+)\]\[(\d+)\] ?= ?\'(.+?)\';$",
                raw_data_js,
                re.MULTILINE,
            )

            # %% Create dataframes
            question_df: DataFrame = pd.DataFrame(
                zip(titles, questions), columns=["title", "question"]
            )
            party_df: DataFrame = pd.DataFrame(
                zip(party_names, party_abbrevs), columns=["full_name", "party"]
            )
            answer_df: DataFrame = pd.DataFrame(
                raw_answers, columns=["question", "party", "answer"]
            ).astype("int")
            # Exclude bad parties
            bad_parties: pd.core.indexes.base.Index = party_df.loc[
                answer_df.groupby("party")["answer"].std() == 0
            ].index
            for party in bad_parties:
                answer_df = answer_df[answer_df["party"] != party]
            # Pivot answer dataframe to have parties as columns
            answer_df["party_name"] = answer_df["party"].apply(
                lambda x: party_df.loc[x, "party"])
            answer_df = pd.pivot_table(
                answer_df, values="answer", index="question", columns="party_name"
            )
            success.append(f'{module_stem_folder}')
        except Exception as e:
            print(
                f"Problem {e} occured while running analysis for {module_stem_folder}")
    else:
        continue
        #fail[f'{module_stem_folder}'] = f"{e}"

