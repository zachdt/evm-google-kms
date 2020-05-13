# geth-google-kms
Key management system for ethereum transaction singing and broadcast built on Google KMS/OAuth and Signatory.

Project bounty: https://gitcoin.co/issue/etclabscore/bounty-integrate-signatory/1/100021650

## Purpose

Enable organizational users of a consortium Geth environment to use Google KMS to sign and broadcast transcations.  Allows for useage of Google Cloud IAM and Google OAuth to access keys.

Kaleido, a popular private ethereum platform, already supports Azure and AWS KMS natively, this project hopes to extend similar functionality to the Google Cloud Platform.  

Service can extend to support all ethereum blockchains.

## Features
  - Google IAM service-to-service authentication
  - Google OAuth end-user authentication
  - Google KMS key storage/generation for Geth
  - Transaction signing/broadcasting to demo Kaleido environment using Signatory
  - Easy service deployment using GCP Cloud Run
  
## Bounty Demo
  - Basic wallet frontend using Googe OAuth and React pointing to test environment
