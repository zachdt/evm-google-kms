# kaleido-google-kms
Key management system for Kaleido consortium blockchain platform built on Google KMS/OAuth and Signatory.  

Project bounty: https://gitcoin.co/issue/etclabscore/bounty-integrate-signatory/1/100021650

## Purpose

Enable organizational users of a Kaleido consortium geth environment to use Google KMS to sign and broadcast transcations.  Allows for useage of Google Cloud IAM and Google OAuth to access keys.

Kaleido already supports Azure and AWS KMS natively, this project hopes to extend similar functionality to the Google Cloud Platform.  

Signatory allows this key storage system to support public Ethereum blockchains.

## Features
  - Google IAM service-to-service authentication
  - Google OAuth end-user authentication
  - Google KMS key storage/generation for Kaleido
  - Transaction signing/broadcasting to Kaleido environment using Signatory
  - Easy service deployment using GCP Cloud Run
  
## Bounty Demo
  - Basic wallet frontend using Googe OAuth and React pointing to test environment
