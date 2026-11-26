
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/workouts/${workout._id}`
      );

      dispatch({
        type: "DELETE_WORKOUT",
        payload: response.data,
      });
    } catch (error) {
      console.log("Error deleting workout:", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>

      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>

      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>

      <span className="delete-btn" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
