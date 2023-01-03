import { useState } from "react";
import DifficultyFilter from "../components/results/DifficultyFilter";
import Table from "../components/results/Table";
import SelectPlayer from "../components/results/SelectPlayer";
import { DIFFICULTY } from "../_config/appConfig";

const user = {
  pseudo: 'player 1',
}

const scores = [
  {
    user: {
      pseudo: "player 1",
    },
    score: 24,
    difficulty: 2
  },
  {
    user: {
      pseudo: "player 2",
    },
    score: 45,
    difficulty: 1
  },
  {
    user: {
      pseudo: "player 1",
    },
    score: 5,
    difficulty: 3
  },
]

const Home = () => {

  const [playerSelected, setPlayerSelected] = useState();
  const [difficultySelected, setDifficultySelected] = useState();

  return (
    <div>
      <h1 className={
        "text-transparent bg-clip-text bg-gradient-to-l from-violet-500 to-teal-500"
      }>Mindmatics</h1>

      <h2>Classement</h2>
      <div className="flex justify-around">
        <SelectPlayer setPlayerSelected={setPlayerSelected} user={user.pseudo} playerSelected={playerSelected} />
        <DifficultyFilter difficulties={DIFFICULTY} setDifficultySelected={setDifficultySelected} />
      </div>
      <Table scores={scores} playerSelected={playerSelected} difficultySelected={difficultySelected} />
    </div>
  );
};

export default Home;
