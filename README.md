# About

Lambda function that finds leaked Contentful PATs and write those to a file in a S3 bucket.

## Contents

* Lambda function that searches for leaked PATs using Github's code search API
* Executable to do the same search locally
* Serverless setup

## Deploying to AWS

```shell
AUDIT_BUCKET=XXX GITHUB_ORGANIZATION_ID=YYY GITHUB_ACCESS_TOKEN=ZZZ $(npm bin)/serverless deploy
```
