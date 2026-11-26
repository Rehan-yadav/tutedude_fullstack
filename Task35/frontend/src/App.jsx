
import { useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutDetails from "./components/WorkoutDetails";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";

function App() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/workouts"
        );

        dispatch({
          type: "SET_WORKOUTS",
          payload: response.data,
        });
      } catch (error) {
        console.log("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="home">
        {/* <h1>Workout Buddy</h1> */}

        <div className="workouts">
          <div>
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails
                  key={workout._id}
                  workout={workout}
                />
              ))}
          </div>

          <WorkoutForm />
        </div>
      </div>
    </>
  );
}

export default App;
