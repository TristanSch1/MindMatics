import { useEffect, useState } from "react";
import DifficultyFilter from "../components/results/DifficultyFilter";
import Table from "../components/results/Table";
import SelectPlayer from "../components/results/SelectPlayer";
import { authUtils } from "../utils/authUtils";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../_config/routes";
import TitleBlock from "../components/ui/TitleBlock";
import { useSession } from "../context/SessionContext";
import { appConfig } from "../_config/appConfig";

const fetchResults = async () => {
  const response = await fetch(`${appConfig.apiPath}/results/leaderboard`);
  const results = await response.json();
  if (results.error) {
    console.error(results.error);
    throw new Error(results.error);
  }
  if (response.status !== 200) {
    throw new Error("Error while fetching results");
  }
  return results.data;
};

const Home = () => {
  const { session } = useSession();

  const [playerSelected, setPlayerSelected] = useState();
  const [difficultySelected, setDifficultySelected] = useState();
  const [scores, setScores] = useState();

  useEffect(() => {
    fetchResults().then((data) => setScores(data));
  }, []);

  if (!session) return null;
  return (
    <>
      <div
        className={
          "w-full mb-16 sm:mb-20 md:md-32 lg:mb-48 xl:mb-64 flex flex-col"
        }
      >
        <div
          className={
            "w-fit self-end text-red-500 hover:underline hover:cursor-pointer text-lg"
          }
          onClick={authUtils.logout}
        >
          Log out
        </div>
        <div className={"flex flex-col gap-12"}>
          <TitleBlock />
          <h3>Want to be mental(l)y challenged ?</h3>
          <Link to={ROUTES.game}>
            <Button large>Start game</Button>
          </Link>
        </div>
      </div>
      <div className={"flex flex-col gap-8"}>
        <h2>Leaderboard (top 100)</h2>
        <div className="flex justify-between gap-2">
          <SelectPlayer
            setPlayerSelected={setPlayerSelected}
            user={session.username}
            playerSelected={playerSelected}
          />
          <DifficultyFilter
            setDifficultySelected={setDifficultySelected}
            difficultySelected={difficultySelected}
          />
        </div>
        <Table
          scores={scores}
          playerSelected={playerSelected}
          difficultySelected={difficultySelected}
        />
      </div>
    </>
  );
};

export default Home;
