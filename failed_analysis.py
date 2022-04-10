#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 14 02:40:11 2021

@author: sven-kristjanbormann

Fail analysis:
    Finding out which wahlomat create problems and why
    using a modifed load_modules and analysis script
"""
#%% Basic setup
import pathlib
import os
import re
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

#%% Run the debugging analysis
for module in module_list:
    module_stem_folder = module.parts[0]
    if not module_stem_folder in fail_list:
        continue
    else:
        try:
            with open(module) as f:
                globals()[f'{module_stem_folder}_module_content'] = f.read()
            
        except UnicodeDecodeError: # Some files are not correctly encoded with utf-8
           try:
               with open(module, encoding='latin1') as f:
                 globals()[f'{module_stem_folder}_module_content'] = f.read()
                 failed_analysis(globals()[f'{module_stem_folder}_module_content'])
           except Exception as e:
                print(f'Unexpected error {e}')
        print(f"Running analysis for {module_stem_folder}")


#%%
def failed_analysis(module_content):
# A shortened version of the original analysis code for debugging
    globals()[f'{module_stem_folder}_raw_data_js']: str = module_content
    # Extract the data points with regex, regex needed slight changes compared to original
    # to match even if some spaces are missing.
    globals()[f'{module_stem_folder}_titles']: list = re.findall(
        r"^WOMT_aThesen\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$", globals()[f'{module_stem_folder}_raw_data_js'], re.MULTILINE
    )
    globals()[f'{module_stem_folder}_questions']: list = re.findall(
        r"^WOMT_aThesen\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$", globals()[f'{module_stem_folder}_raw_data_js'], re.MULTILINE
    )
    globals()[f'{module_stem_folder}_party_names']: list = re.findall(
        r"^WOMT_aParteien\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$", globals()[f'{module_stem_folder}_raw_data_js'], re.MULTILINE
    )
    globals()[f'{module_stem_folder}_party_abbrevs']: list = re.findall(
        r"^WOMT_aParteien\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$", globals()[f'{module_stem_folder}_raw_data_js'], re.MULTILINE
    )
    globals()[f'{module_stem_folder}_raw_answers']: list = re.findall(
        r"^WOMT_aThesenParteien\[(\d+)\]\[(\d+)\] ?= ?\'(.+?)\';$",
        globals()[f'{module_stem_folder}_raw_data_js'],
        re.MULTILINE,
    )         

    globals()[f'{module_stem_folder}_question_df']: DataFrame = pd.DataFrame(
        zip(globals()[f'{module_stem_folder}_titles'], globals()[f'{module_stem_folder}_questions']), columns=["title", "question"]
    )
    globals()[f'{module_stem_folder}_party_df']: DataFrame = pd.DataFrame(
        zip(globals()[f'{module_stem_folder}_party_names'], globals()[f'{module_stem_folder}_party_abbrevs']), columns=["full_name", "party"]
    )
    globals()[f'{module_stem_folder}_answers_df']: DataFrame = pd.DataFrame(
        globals()[f'{module_stem_folder}_raw_answers'], columns=["question", "party", "answer"]
    ).astype("int")
    # Exclude bad parties
# =============================================================================
#     bad_parties: pd.core.indexes.base.Index = party_df.loc[
#         answer_df.groupby("party")["answer"].std() == 0
#     ].index
#     for party in bad_parties:
#         answer_df = answer_df[answer_df["party"] != party]
#     # Pivot answer dataframe to have parties as columns
#     answer_df["party_name"] = answer_df["party"].apply(lambda x: party_df.loc[x, "party"])
#     answer_df = pd.pivot_table(
#         answer_df, values="answer", index="question", columns="party_name"
#     )
# =============================================================================
