import React, { useState } from "react";

const Translation = ({ doStuff, setInput, result, back, loading, option }) => {
    const [userPrompt, setUserPrompt] = useState("");

    const handleDoStuff = () => {
        // Combine the selected option's prompt and the user-entered prompt
        const combinedPrompt = `${option.prompt}: ${userPrompt}`;
        // Prepare the request data object with the combined prompt and other configuration options
        const requestData = {
            prompt: combinedPrompt,
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
        // Call the doStuff function with the request data object
        doStuff(requestData);
        console.log(requestData)
    };
    

    return (
        <div>
            <textarea
                className="text-area"
                cols={55}
                rows={10}
                value={userPrompt} // Bind the value of the textarea to the userPrompt state
                onChange={(e) => setUserPrompt(e.target.value)} // Update the userPrompt state when the textarea value changes
            ></textarea>
            <button className="button-warning pure-button" onClick={back}>
                Back
            </button>
            <button className="action-btn" onClick={handleDoStuff}>
                DO YOU STUFF!
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <h3 className="result-text">{result.length > 0 ? result : ""}</h3>
            )}
        </div>
    );
};

export default Translation;
