from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)