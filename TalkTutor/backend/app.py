from flask import Flask, request, jsonify
from models.coedit_large import CoEditLargeModel
from models.generate import GenerateAssistant
from flask_sqlalchemy import SQLAlchemy
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode
import json
from database_models import db, EditedPrompts, GeneratedTexts

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/lalit/Desktop/CMPE277/Project/TalkTutor 3/TalkTutor/backend/chatgpt.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

# Encryption and Decryption setup
def encrypt(text):
    key = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(text.encode())
    json_k = ['nonce', 'ciphertext', 'tag']
    json_v = [b64encode(x).decode('utf-8') for x in (cipher.nonce, ciphertext, tag)]
    result = json.dumps(dict(zip(json_k, json_v)))
    return result, b64encode(key).decode('utf-8')

def decrypt(enc_dict, key):
    try:
        enc_dict = json.loads(enc_dict)
        key = b64decode(key)
        json_k = ['nonce', 'ciphertext', 'tag']
        jv = {k:b64decode(enc_dict[k]) for k in json_k}
        cipher = AES.new(key, AES.MODE_EAX, nonce=jv['nonce'])
        plaintext = cipher.decrypt_and_verify(jv['ciphertext'], jv['tag'])
        return plaintext.decode('utf-8')
    except (ValueError, KeyError):
        return "Decryption failed"


coedit_large_model = CoEditLargeModel()
poetic_assistant = GenerateAssistant(api_key="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")

@app.route('/edit-text', methods=['POST'])
def edit_text():
    try:
        data = request.get_json()
        input_text = data.get('text')
        edit_type = data.get('edit_type')
        edited_text = coedit_large_model.edit_text(input_text, edit_type)

        # Encrypting data before storing
        encrypted_input, key_input = encrypt(input_text)
        encrypted_output, key_output = encrypt(edited_text)

        # Storing encrypted data
        new_edit = EditedPrompts(original_text=encrypted_input, edited_text=encrypted_output)
        db.session.add(new_edit)
        db.session.commit()


        return jsonify({'edited_text': edited_text, 'keys': {'input': key_input, 'output': key_output}})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        system_message = data.get('system_message')
        response = poetic_assistant.generate_response(user_input, system_message)
        print(response)

        # Encrypting data before storing
        encrypted_prompt, key_prompt = encrypt(user_input)
        encrypted_response, key_response = encrypt(response)

        # Storing encrypted data
        new_generated_text = GeneratedTexts(prompt=encrypted_prompt, response=encrypted_response)
        db.session.add(new_generated_text)
        db.session.commit()

        return jsonify({'response': response, 'keys': {'prompt': key_prompt, 'response': key_response}})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)