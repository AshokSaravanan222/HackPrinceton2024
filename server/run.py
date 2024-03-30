from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()
verb_api_key = os.getenv("VERBWIRE_API_KEY")


url = "https://api.verbwire.com/v1/nft/send/enableCrossChainSend"

payload = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"sourceChain\"\r\n\r\npolygon\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"destChain\"\r\n\r\npolygon\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"destContractAddress\"\r\n\r\n0xFc32A51A4a6659bfeC783D443d8B4ae5d95101F0\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"sourceContractAddress\"\r\n\r\n0xB75B6F30898b46D96b70eC91ED1172D5bdDFf94B\r\n-----011000010111000001101001--\r\n\r\n"
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


