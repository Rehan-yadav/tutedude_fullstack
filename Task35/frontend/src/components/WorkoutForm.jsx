
import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/workouts",
        {
          title,
          load: Number(load),
          reps: Number(reps),
        }
      );

      dispatch({
        type: "CREATE_WORKOUT",
        payload: response.data,
      });

      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong"
      );

      setEmptyFields(
        error.response?.data?.emptyFields || []
      );
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        placeholder="Enter workout name"
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
        placeholder="Enter weight"
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        placeholder="Enter repetitions"
      />

      <button>Add Workout</button>

      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
