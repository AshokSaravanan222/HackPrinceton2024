from pymongo import MongoClient

from flask import Flask, request, jsonify
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()
open_api_key = os.getenv("OPENAI_API_KEY")
verb_api_key = os.getenv("VERBWIRE_API_KEY")

client = OpenAI(api_key=open_api_key)
app = Flask(__name__)

# the mongodb database record
client=MongoClient("mongodb+srv://hackprinceton:<password>@cluster0.vgfyxhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db= client.get_database('wardrobe_record')

records=db.wardrobe_database

class ClothingItem:
    def __init__(self, name, material, sustainability, brand):
        self.name=name
        self.material=material
        self.sustainability=sustainability
        self.brand=brand

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

@app.route('/give_coin')
def give_coin():
    wallet = "0xb3ebA584B5DD1F2eF5270e937c8248ac38F48727"

    url = "https://api.verbwire.com/v1/nft/data/owned?walletAddress=0x18FbEc1bF2b314261cad942150e731d8B057853A&chain=polygon&tokenType=nft721&sortDirection=ASC&limit=1000&page=1"
    headers = {
        "accept": "application/json",
        "X-API-Key": verb_api_key
    }
    response = requests.get(url, headers=headers)
    res_json = json.loads(response.text)

    if "nfts" in res_json:
        for nft in res_json["nfts"]:
            if nft['tokenSymbol'] == "QMVW":
                return send_coin(wallet, nft['tokenId'])
            else:
                return mint_coin(wallet)


def send_coin(wallet, token_id):
    pass


def mint_coin(wallet):
    url = "https://api.verbwire.com/v1/nft/mint/quickMintFromMetadataUrl"

    payload = f"-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"allowPlatformToOperateToken\"\r\n\r\ntrue\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"chain\"\r\n\r\nsepolia\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"recipientAddress\"\r\n\r\n{wallet}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"metadataUrl\"\r\n\r\nhttps://cloudflare-ipfs.com/ipfs/bafyreic4h7kir7vnq5dfcu4dnvge6el5awnnvbimyqa53abhlau2pbcop4/metadata.json\r\n-----011000010111000001101001--\r\n\r\n"
    headers = {
        "accept": "application/json",
        "content-type": "multipart/form-data; boundary=---011000010111000001101001",
        "X-API-Key": verb_api_key
    }
    response = requests.post(url, data=payload, headers=headers)
    return response.text


    


@app.route('/analyze_material')
def analyze_material():

    # data = request.get_json()
    data = {
        "message": "Cotton, Polyester, Nylon"
    }

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": "You are a sustainability expert."},
            {"role": "user", "content": 
f"""
Analyze sustainability of and rate out of 10 the following clothing material(s): {data['message']}
Format the output as JSON with each material as its own object with the following keys:
material_name
sustainability_rating
sustainability_description 
"""},
        ]
    )

    print(completion)

    sus_json = completion.choices[0].message.content

    start_index = sus_json.find("[")
    end_index = sus_json.rfind("]")
    json_part = sus_json[start_index:end_index + 1]

    print(json_part)

    sus_info = json.loads(json_part)

    print(sus_info) 

    return sus_info

@app.route('/vision1')
def vision1():
    # data = request.get_json()
    data = {
        "message": "https://media.istockphoto.com/photos/shirt-picture-id621353422?k=6&m=621353422&s=612x612&w=0&h=2xfhs4LSjRGO52x4Ky3cphTcteUjnUD-cUo_rveoJlQ="
    }
    response = client.chat.completions.create(
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
        ],
        max_tokens=300,
    )

    item_json = response.choices[0].message.content

    print(item_json)

    start_index = item_json.find("[")
    end_index = item_json.rfind("]")
    json_part = item_json[start_index:end_index + 1]

    print(json_part)

    item = json.loads(json_part)

    print(item)

    return item


# @app.route('/vision', methods=['POST'] )
@app.route('/vision2')
def vision2():
    # data = request.get_json()
    data = {
        "message": "https://fashinnovation.nyc/wp-content/uploads/2021/08/Everything-You-Need-To-Know-About-The-Clothing-Label-1.jpg"
    }
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text":
"""This is an image of a clothing label. What are the materials used to make this clothing item?
Format the output as JSON with each material as its own object with the following keys:
material_name
percentage           
"""},
                {
                "type": "image_url",
                "image_url": {
                    "url": data['message'],
                },
                },
            ],
            }
        ],
        max_tokens=300,
    )

    tag_json = response.choices[0].message.content

    start_index = tag_json.find("[")
    end_index = tag_json.rfind("]")
    json_part = tag_json[start_index:end_index + 1]

    tag = json.loads(json_part)

    return tag

if __name__ == '__main__':
    app.run(debug=True)