from pymongo import MongoClient

from flask import Flask, request, jsonify
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()
open_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=open_api_key)
app = Flask(__name__)

client=MongoClient("mongodb+srv://hackprinceton:<password>@cluster0.vgfyxhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db= client.get_database('wardrobe_record')

records=db.wardrobe_database

class ClothingItem:
    def __init__(self, name, material, sustainability, brand):
        self.name=name
        self.material=material
        self.sustainability=sustainability
        self.brand=brand

class Wardrobe:
    def __init__(self):
        self.inventory=[]

    def add_item(self, item):
        self. inventory.append(item)

    def remove_item(self, item):
        self.inventory.remove(item)

    def check_sustainability(self, item):
        if item.sustainability=="sustainability":
            return "Keep"
        elif item.sustainability=="recyclable":
            return "Recycle"
        elif item.sustainability=="non-sustainable":
            return "Send it to us"
        
    def recycle_item(self, item):
        if item.sustainability=="recyclable":
            recycling_response=self.send_to_recycling_center(item)
            return recycling_response
        else:
            return "Item is not recyclable"
        
    
wardrobe=Wardrobe()

@app.route('/wardrobe/add_item', method=['POST'])
def add_item():
    data=request.json
    item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
    wardrobe.add_item(item)
    return jsonify({'message':'Item added to wardrobe successfully'})


@app.route('/wardrobe/check_sustainability', methods=['POST'])
def check_sustainability():
    data=request.json
    item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
    sustainability_action=wardrobe.check_sustainability(item)
    return jsonify({'sustainability_action': sustainability_action})

@app.route('/wardrobe/recycle_item', methods=['POST'])
def recycle_item():
    data=request.json
    item=ClothingItem(data['name'], data['material'], data['sustainability'], data['brand'])
    recycling_response=wardrobe.recycle_item(item)
    return jsonify({'recycling_response':recycling_response})



@app.route('/api')
def api():
    return jsonify({'message': 'Hello, World!'})


@app.route('/gpttest', methods=['POST'] )
def gpttest():
    data = request.get_json()
    completion = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": data['message']},
        ]
    )

# @app.route('/vision', methods=['POST'] )
@app.route('/vision')
def vision():
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
material name
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