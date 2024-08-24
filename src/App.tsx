import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function TextBox(props: any) {
    const [text, setText] = useState("");
    console.log(text)
    return (
        <div className="m-3 flex flex-col grow">
        
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your message
            </label>

            <textarea 
                className="textarea textarea-bordered resize-none grow" 
                placeholder="Bio"
                value = {text}
                onChange={(e) => setText(e.target.value)}
            />

        </div>
    )
} 

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // 
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
      <div className="flex h-screen">

      {
        // <div className="m-5 bg-red-500">
        // <h1>Welcome to Tauri!</h1>
        // </div>
      }
        <div className="flex w-2/3">

          <TextBox />
          <TextBox />

        </div>

        <button className="btn btn-outline">Stress</button>
      </div>

    // <div className="container">
    //   <h1>Welcome to Tauri!</h1>
    //   <h1>Learning Stuff</h1>

    //   <div className="row">
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src="/vite.svg" className="logo vite" alt="Vite logo" />
    //     </a>
    //     <a href="https://tauri.app" target="_blank">
    //       <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>

    //   <p>Click on the Tauri, Vite, and React logos to learn more.</p>

    //   <form
    //     className="row"
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       greet();
    //     }}
    //   >
    //     <input
    //       id="greet-input"
    //       onChange={(e) => setName(e.currentTarget.value)}
    //       placeholder="Enter a name..."
    //     />
    //     <button type="submit">Greet</button>
    //   </form>

    //   <p>{greetMsg}</p>
    // </div>
  );
}

export default App;
