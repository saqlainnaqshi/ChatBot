import "./App.css";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";

function App() {
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const selectOption = (option) => {
    setOption(option);
  };

  const back = () => {
    setOption({});
    setResult("");
    setInput("");
  };

  const doStuff = async (prompt) => {
    try {
      setLoading(true);
      const { name, description, ...rest } = option;

      // Prepare the data object to be sent to the server
      const requestData = {
        prompt: prompt.prompt + ":" + input,
        llm_config: {
          max_new_tokens: 128,
          min_length: 0,
          early_stopping: false,
          num_beams: 1,
          num_beam_groups: 1,
          use_cache: true,
          temperature: 0.75,
          top_k: 15,
          top_p: 0.78,
          typical_p: 1,
          epsilon_cutoff: 0,
          eta_cutoff: 0,
          diversity_penalty: 0,
          repetition_penalty: 1,
          encoder_repetition_penalty: 1,
          length_penalty: 1,
          no_repeat_ngram_size: 0,
          renormalize_logits: false,
          remove_invalid_values: false,
          num_return_sequences: 1,
          output_attentions: false,
          output_hidden_states: false,
          output_scores: false,
          encoder_no_repeat_ngram_size: 0,
          n: 1,
          presence_penalty: 0,
          frequency_penalty: 0,
          use_beam_search: false,
          ignore_eos: false,
          skip_special_tokens: true
        },
        adapter_name: null
      };

      const response = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();

      setResult(responseData.output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation
          doStuff={doStuff}
          setInput={setInput}
          result={result}
          back={back}
          option={option}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;