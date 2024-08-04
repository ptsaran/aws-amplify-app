import { useEffect, useState, ChangeEvent } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';

const client = generateClient<Schema>();


function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (file) {
      try {
        const result = uploadData({
          path: `picture-submissions/${file.name}`,
          data: file,
      })
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };




  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </main>
  );
}

export default App;
