import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function TextBox(props: any) {
    const [text, setText] = useState("");

    var name = "test"

    async function test() {
        var greeting = await invoke("greet", {name})
        console.log(greeting);
    }
    test()

    return (
        <div className="m-3 flex flex-col grow">
        
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props.placeholder}
            </label>

            <textarea 
                className="textarea textarea-bordered resize-none grow" 
                placeholder={props.placeholder}
                value = {text}
                onChange={
                    (e) => {
                        setText(e.target.value)
                        props.setSolutionText(e.target.value)
                    }
                }
            />

        </div>
    )
} 

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [solution, setSolution] = useState("");
  const [bruteSolution, setBruteSolution] = useState("");

  async function greet() { 
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    console.log(greetMsg);
  }

  console.log("Solution: " + solution)

  return (
      <div className="flex h-screen">
        <div className="flex w-2/3">
          <TextBox 
            placeholder="Your solution here" 
            solutionText={solution} 
            setSolutionText={setSolution}
          />
          <TextBox 
            placeholder="Brute force solution"
            solutionText={bruteSolution}
            setSolutionText={setBruteSolution}
          />
         </div>
        <button 
          className="btn btn-outline"
          onClick={() => greet()}
        >
          Stress
        </button>
      </div>
  );
}

export default App;
