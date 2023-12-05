from flask import Flask, request, jsonify
from models.coedit_large import CoEditLargeModel
from models.generate import GenerateAssistant

app = Flask(__name__)
coedit_large_model = CoEditLargeModel()
poetic_assistant = GenerateAssistant(api_key="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")

@app.route('/edit-text', methods=['POST'])
def edit_text():
    try:
        data = request.get_json()
        input_text = data.get('text')
        edit_type = data.get('edit_type')
        edited_text = coedit_large_model.edit_text(input_text, edit_type)
        return jsonify({'edited_text': edited_text})

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

        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)