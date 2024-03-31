from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import base64

load_dotenv()
open_api_key = os.getenv("OPENAI_API_KEY")
verb_api_key = os.getenv("VERBWIRE_API_KEY")

open_client = OpenAI(api_key=open_api_key)
app = Flask(__name__)
CORS(app)

# the mongodb database record
client=MongoClient("mongodb+srv://hackprinceton:<password>@cluster0.vgfyxhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.get_database('wardrobe_record')

records = db.wardrobe_database

# class ClothingItem:
#     def __init__(self, name, material, sustainability, brand):
#         self.name=name
#         self.material=material
#         self.sustainability=sustainability
#         self.brand=brand

# class Wardrobe:
#     def __init__(self):
#         self.inventory=[]

#     def add_item(self, item):
#         self. inventory.append(item)

#     def remove_item(self, item):
#         self.inventory.remove(item)

#     def check_sustainability(self, item):
#         if item.sustainability=="sustainability":
#             return "Keep"
#         elif item.sustainability=="recyclable":
#             return "Recycle"
#         elif item.sustainability=="non-sustainable":
#             return "Send it to us"
        
#     def recycle_item(self, item):
#         if item.sustainability=="recyclable":
#             recycling_response=self.send_to_recycling_center(item)
#             return recycling_response
#         else:
#             return "Item is not recyclable"
        
    
# wardrobe=Wardrobe()

# @app.route('/wardrobe/add_item', method=['POST'])
# def add_item():
#     data=request.json
#     item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
#     wardrobe.add_item(item)
#     return jsonify({'message':'Item added to wardrobe successfully'})


# @app.route('/wardrobe/check_sustainability', methods=['POST'])
# def check_sustainability():
#     data=request.json
#     item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
#     sustainability_action=wardrobe.check_sustainability(item)
#     return jsonify({'sustainability_action': sustainability_action})

# @app.route('/wardrobe/recycle_item', methods=['POST'])
# def recycle_item():
#     data=request.json
#     item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
#     recycling_response=wardrobe.recycle_item(item)
#     return jsonify({'recycling_response':recycling_response})



# @app.route('/api')
# def api():
#     return jsonify({'message': 'Hello, World!'})

@app.route('/count_coins', methods=['POST'])
def count_coins():
    wallet = request.json['wallet']
    count = 0 
    url = f"https://api.verbwire.com/v1/nft/data/owned?walletAddress={wallet}&chain=sepolia&tokenType=nft721&sortDirection=ASC&limit=1000&page=1"
    headers = {
        "accept": "application/json",
        "X-API-Key": verb_api_key
    }
    response = requests.get(url, headers=headers)
    res_json = json.loads(response.text)

    if "nfts" in res_json:
        for nft in res_json["nfts"]:
            if nft['tokenSymbol'] == "SHOPTEST":
                count += 1
    return str(count)

@app.route('/give_coin', methods=['POST'])
def give_coin():
    wallet = request.get_json().get('wallet')
    url = "https://api.verbwire.com/v1/nft/data/owned?walletAddress=0x18FbEc1bF2b314261cad942150e731d8B057853A&chain=sepolia&tokenType=nft721&sortDirection=ASC&limit=1000&page=1"
    headers = {
        "accept": "application/json",
        "X-API-Key": verb_api_key
    }
    response = requests.get(url, headers=headers)
    res_json = json.loads(response.text)

    if "nfts" in res_json:
        for nft in res_json["nfts"]:
            if nft['tokenSymbol'] == "SHOPTEST":
                return send_coin(wallet, nft['tokenID'])
    return mint_coin(wallet)


def send_coin(wallet, token_id):
    url = "https://api.verbwire.com/v1/nft/update/transferToken"

    payload = f"-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"chain\"\r\n\r\nsepolia\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"contractAddress\"\r\n\r\n0x478De3FD901DA6b889554E862E03231E54Ae15D7\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"fromAddress\"\r\n\r\n0x18FbEc1bF2b314261cad942150e731d8B057853A\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"toAddress\"\r\n\r\n{wallet}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"tokenId\"\r\n\r\n{token_id}\r\n-----011000010111000001101001--\r\n\r\n"
    headers = {
        "accept": "application/json",
        "content-type": "multipart/form-data; boundary=---011000010111000001101001",
        "X-API-Key": verb_api_key
    }

    response = requests.post(url, data=payload, headers=headers)

    return response.text


def mint_coin(wallet):
    url = "https://api.verbwire.com/v1/nft/mint/mintFromMetadataUrl"

    payload = f"-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"quantity\"\r\n\r\n1\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"chain\"\r\n\r\nsepolia\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"allowPlatformToOperateToken\"\r\n\r\ntrue\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"recipientAddress\"\r\n\r\n{wallet}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"metadataUrl\"\r\n\r\nhttps://cloudflare-ipfs.com/ipfs/bafyreic4h7kir7vnq5dfcu4dnvge6el5awnnvbimyqa53abhlau2pbcop4/metadata.json\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"contractAddress\"\r\n\r\n0x478De3FD901DA6b889554E862E03231E54Ae15D7\r\n-----011000010111000001101001--\r\n\r\n"
    headers = {
        "accept": "application/json",
        "content-type": "multipart/form-data; boundary=---011000010111000001101001",
        "X-API-Key": verb_api_key
    }
    response = requests.post(url, data=payload, headers=headers)
    return response.text


@app.route('/vision1', methods=['POST'])
def vision1():
    id = request.get_json().get('id')
    data = {"message": f"https://slo-fashion.s3.us-east-2.amazonaws.com/{id}.jpg"}
    response = open_client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text":
"""This is an image of a piece of clothing. Give it a simple but descriptive name as well as save the overall hexadecimal color of the clothing item.
Format the output as JSON surrounded by square brackets with following keys:
clothing_name
color           
"""},
                {
                "type": "image_url",
                "image_url": {
                    "url": data['message'],
                },
                },
            ],
            }
        ]
    )
    
    item_json = response.choices[0].message.content

    start_index = item_json.find("[")
    end_index = item_json.rfind("]")
    json_part = item_json[start_index:end_index + 1]

    item = json.loads(json_part)

    return item


@app.route('/vision2', methods=['POST'])
def vision2():
    id2 = request.get_json().get('id')
    data2 = {"message": f"https://slo-fashion.s3.us-east-2.amazonaws.com/{id2}.jpg"}

    response2 = open_client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text":
"""This is an image of a clothing label. What are the materials used to make this clothing item?
Also, you are a sustainability expert. Analyze sustainability of and rate out of 10 the following clothing material(s).
Format the output as JSON with each material as its own object with the following keys:
material_name
material_percentage  
sustainability_rating
sustainability_description          
"""},
                {
                "type": "image_url",
                "image_url": {
                    "url": data2['message'],
                },
                },
            ],
            }
        ]
    )

    tag_json = response2.choices[0].message.content

    start_index2 = tag_json.find("[")
    end_index2 = tag_json.rfind("]")
    json_part2 = tag_json[start_index2:end_index2 + 1]

    tag = json.loads(json_part2)

    return tag

if __name__ == '__main__':
    app.run(debug=True)