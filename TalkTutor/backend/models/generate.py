# models/generate.py
from openai import OpenAI

class GenerateAssistant:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    def generate_response(self, user_input, system_message):
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
    
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_input}
            ]
        )
        print(completion)
        return completion.choices[0].message.content
