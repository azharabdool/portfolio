# Foundry Supply & Demand Planning Study

A manufacturing planning brief and local data study prepared for a proposed Foundry workflow.

## Overview

The brief proposes comparing forecast demand with production actuals and product master data for manufacturing planning. Local analysis can validate input grain, keys and planned variance calculations.

Origin: 2026 supplied certification brief and CSV inputs. Implementation of the full proposed Foundry workflow is not verified.

## Technical Approach

Inspect product/time keys and source shapes before joining. The brief calls for an ontology, variance/fill-rate indicators and a Workshop/Quiver view. A new validation script is explicitly portfolio work; it does not prove the proposed platform application was completed.

## Tech Stack

CSV data; Python standard library for post-project validation; proposed Palantir Foundry / Ontology / Workshop / Quiver.

## Key Features

- Input-shape/schema validation
- documented proposed pipeline
- clear separation of brief versus implementation.

## Architecture / Pipeline

Forecast / actuals / product master --> validate grain and keys --> proposed Foundry planning view

## Results

Supplied inputs contain 32 forecast rows, 40 production rows and four product-master rows. These describe input shapes, not a deployed system or optimisation result. Dataset provenance/redistribution remains a publication gate.

## Running the Project

```sh
python inspect_data.py --data-dir PATH_TO_AUTHORISED_CSV_FOLDER
# Required: demand_forecast.csv, production_actuals.csv, products.csv
```

## Project Structure

inspect_data.py: new input validation; data schema notes: in README; datasets remain outside the public tree.

## What I Learned

Planning dataset joins, checking data grain and bounding what implementation evidence supports.

## Possible Improvements

Implement and export the proposed ontology/workflow when authorised; define duplicate-key handling and time alignment; verify calculations against business definitions.

## Portfolio Cleanup / Post-project Improvements

Created a labelled data-input validation script and proposal documentation. No implemented manufacturing AI system is claimed.
