from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()
verb_api_key = os.getenv("VERBWIRE_API_KEY")


url = "https://api.verbwire.com/v1/nft/mint/quickMintFromMetadataUrl"

payload = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"allowPlatformToOperateToken\"\r\n\r\ntrue\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"chain\"\r\n\r\npolygon\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"metadataUrl\"\r\n\r\nhttps://cloudflare-ipfs.com/ipfs/bafyreic4h7kir7vnq5dfcu4dnvge6el5awnnvbimyqa53abhlau2pbcop4/metadata.json\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"recipientAddress\"\r\n\r\n{wallet}\r\n-----011000010111000001101001--\r\n\r\n"
headers = {
    "accept": "application/json",
    "content-type": "multipart/form-data; boundary=---011000010111000001101001",
    "X-API-Key": verb_api_key
}
response = requests.post(url, data=payload, headers=headers)
print(response.text)




# url = "https://api.verbwire.com/v1/nft/store/metadataFromImage"
# headers = {
#     "accept": "application/json",
#     "X-API-Key": verb_api_key
# }

# response = None
# files = { "filePath": ("coin.jpg", open("coin.jpg", "rb"), "image/jpeg") }

# payload = {
#     "name": "Slo Coin",
#     "description": "Slo Fashion Currency",
# }

# response = requests.post(url, data=payload, files=files, headers=headers)

# print(response.text)


