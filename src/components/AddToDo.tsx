import { useState } from "react"
import { useTodos } from "../store/todo";

function AddToDo() {
  const[todo, setTodo] = useState("");
  const { onhandelToDo } = useTodos();

    function handelSubmit(e:any){
      e.preventDefault()
      onhandelToDo(todo);
      setTodo("")
    }

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
        <button type="submit">ADD</button>
      </form>
    </div>
  )
}

export default AddToDo