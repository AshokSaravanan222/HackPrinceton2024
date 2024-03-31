from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import base64
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
open_api_key = os.getenv("OPENAI_API_KEY")
verb_api_key = os.getenv("VERBWIRE_API_KEY")
mongo_uri = os.getenv("MONGODB_URI")

open_client = OpenAI(api_key=open_api_key)
mongo_client = MongoClient(mongo_uri, server_api=ServerApi('1'))
app = Flask(__name__)
CORS(app)

@app.route('/get_user', methods=['GET'])
@cross_origin()
def get_user():
    email = request.args.get('email')
    user = None
    try:
        collection = mongo_client['slo']['users']
        user = collection.find_one({"email": email})
    except Exception as e:
        print(e)
    return user

            
@app.route('/add_user', methods=['POST'])
@cross_origin()
def add_user():
    email = request.json['email']
    user= [{
        "email": email,
        "name": "",
        "clothes": [],
        "wallet": "",
    }]
    try:
        collection = mongo_client['slo']['users']
        collection.insert_many(user)
    except Exception as e:
        print(e)
    return "User added"

@app.route('/add_clothes', methods=['POST'])
@cross_origin()
def add_clothes():
    _email = request.form['email']
    _name = request.form['name']
    _color = request.form['color']
    _image_url = request.form['image']
    _label = json.loads(request.form['label'])

    clothesItem = {
        "name": _name,
        "color": _color,
        "image": _image_url,
        "label": _label
    }

    try:
        collection = mongo_client['slo']['users']
        user = collection.find_one({"email": _email})
        clothes = user['clothes']
        clothes.append(clothesItem)

        collection.update_one(
            {"email": _email},
            {"$set": {"clothes": clothes}, "$currentDate": {"lastModified": True}},
        )
    except Exception as e:
        print(e)
    return "Clothes added"

@app.route('/delete_clothes', methods=['POST'])
@cross_origin()
def delete_clothes():
    _email = request.form['email']
    _item_url = request.form['item_url']

    try:
        collection = mongo_client['slo']['users']
        user = collection.find_one({"email": _email})
        clothes = user['clothes']

        for item in clothes:
            if item['image'] == _item_url:
                clothes.remove(item)
                break

        collection.update_one(
            {"email": _email},
            {"$set": {"clothes": clothes}, "$currentDate": {"lastModified": True}},
        )
    except Exception as e:
        print(e)
    return "Clothes removed"

@app.route('/update_user', methods=['POST'])
@cross_origin()
def update_user():
    user = request.json['user']
    try:
        collection = mongo_client['slo']['users']
        collection.update_one(
            {"email": user['email']},
            {"$set": {"name": user['name'], "wallet": user['wallet']}, "$currentDate": {"lastModified": True}},
)
    except Exception as e:
        print(e)
    return "User updated"


@app.route('/count_coins', methods=['POST'])
@cross_origin()
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
@cross_origin()
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
@cross_origin()
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
f"""This is an image of a piece of clothing. Give it a simple but descriptive name as well as save the overall hexadecimal color of the clothing item.
Format the output as JSON surrounded by square brackets with following keys:
clothing_name
color 
image_url: https://slo-fashion.s3.us-east-2.amazonaws.com/{id}.jpg
label: None        
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
@cross_origin()
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
f"""This is an image of a clothing label. What are the materials used to make this clothing item?
Also, you are a sustainability expert. Analyze sustainability of and rate out of 10 the following clothing material(s).
Format the output as JSON with each material as its own object with the following keys:
material_name
material_percentage  
sustainability_rating
sustainability_description
image_url: https://slo-fashion.s3.us-east-2.amazonaws.com/{id2}.jpg          

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