from transformers import AutoTokenizer, T5ForConditionalGeneration

class CoEditLargeModel:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("grammarly/coedit-large")
        self.model = T5ForConditionalGeneration.from_pretrained("grammarly/coedit-large")

    def edit_text(self, input_text, edit_type):
        edit_prefix = self.get_edit_prefix(edit_type)
        full_input_text = edit_prefix + input_text
        print(edit_prefix, input_text)
        input_ids = self.tokenizer.encode(full_input_text, return_tensors="pt")
        outputs = self.model.generate(input_ids, max_length=256)
        edited_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return edited_text
    
    def get_edit_prefix(self, edit_type):
        # Define prefixes for different edit types
        edit_prefixes = {
            "Fix the grammar": "Fix grammatical errors in this sentence: ",
            "Make this text coherent": "Make this text more coherent: ",
            "Rewrite this to make it easier to understand": "Rewrite this to make it easier to understand: ",
            "Paraphrase this": "Paraphrase the following: ",
            "Write this more formally": "Write this in a more formal tone: ",
            "Write this in a neutral way": "Write this in a neutral tone: ",
            "Write this in a funny way": "Write this in a humorous way: ",
        }
        return edit_prefixes.get(edit_type, "")
