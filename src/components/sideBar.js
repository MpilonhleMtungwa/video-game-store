import React, { useState } from "react";
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { SiApplearcade } from "react-icons/si";
import { PiStrategyBold } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import {
  GiPuzzle,
  GiPistolGun,
  GiRaceCar,
  GiSwordman,
  GiBoxingGlove,
  GiEmptyChessboard,
  GiLaddersPlatform,
  GiGlobe,
  GiDungeonGate,
  GiSoccerBall,
} from "react-icons/gi"; // Genre icons from react-icons
import { CgCardSpades } from "react-icons/cg";
import styles from "../styles/sidebar.module.css";

const Sidebar = ({ onPlatformSelect, onGenreSelect, onLoadAll }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>

      {!isCollapsed && (
        <>
          <div className={styles.section}>
            <h3>Platform</h3>
            <button onClick={() => onPlatformSelect("windows")}>
              <FaWindows className={styles.icon} /> Windows
            </button>
            <button onClick={() => onPlatformSelect("xbox")}>
              <FaXbox className={styles.icon} /> Xbox
            </button>
            <button onClick={() => onPlatformSelect("playstation")}>
              <FaPlaystation className={styles.icon} /> PlayStation
            </button>
          </div>

          <div className={styles.section}>
            <h3>Genre</h3>
            <button onClick={() => onGenreSelect("action")}>
              <GiSwordman className={styles.icon} /> Action
            </button>
            <button onClick={() => onGenreSelect("adventure")}>
              <GiGlobe className={styles.icon} /> Adventure
            </button>
            <button onClick={() => onGenreSelect("strategy")}>
              <PiStrategyBold className={styles.icon} /> Strategy
            </button>
            <button onClick={() => onGenreSelect("rpg")}>
              <GiDungeonGate className={styles.icon} /> RPG
            </button>
            <button onClick={() => onGenreSelect("shooter")}>
              <GiPistolGun className={styles.icon} /> Shooter
            </button>
            <button onClick={() => onGenreSelect("puzzle")}>
              <GiPuzzle className={styles.icon} /> Puzzle
            </button>
            <button onClick={() => onGenreSelect("sports")}>
              <GiSoccerBall className={styles.icon} /> Sports
            </button>
            <button onClick={() => onGenreSelect("racing")}>
              <GiRaceCar className={styles.icon} /> Racing
            </button>
            <button onClick={() => onGenreSelect("simulation")}>
              <GiRaceCar className={styles.icon} /> Simulation
            </button>
            <button onClick={() => onGenreSelect("family")}>
              <MdFamilyRestroom className={styles.icon} /> Family
            </button>
            <button onClick={() => onGenreSelect("board_games")}>
              <GiEmptyChessboard className={styles.icon} /> Board Games
            </button>
            <button onClick={() => onGenreSelect("card")}>
              <CgCardSpades className={styles.icon} /> Card Games
            </button>
            <button onClick={() => onGenreSelect("platformer")}>
              <GiLaddersPlatform className={styles.icon} /> Platformer
            </button>
            <button onClick={() => onGenreSelect("fighting")}>
              <GiBoxingGlove className={styles.icon} /> Fighting
            </button>
            <button onClick={() => onGenreSelect("arcade")}>
              <SiApplearcade className={styles.icon} /> Arcade
            </button>
          </div>

          <div className={styles.section}>
            <h3>All Games</h3>
            <button onClick={onLoadAll}>
              <FaWindows className={styles.icon} /> Load All Games
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
/*
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { SiApplearcade } from "react-icons/si";
import { PiStrategyBold } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import {
  GiPuzzle,
  GiPistolGun,
  GiRaceCar,
  GiSwordman,
  GiBoxingGlove,
  GiEmptyChessboard,
  GiLaddersPlatform,
  GiSoccerBall,
} from "react-icons/gi"; // Genre icons from react-icons
import { CgCardSpades } from "react-icons/cg";
import styles from "../styles/sidebar.module.css";

const Sidebar = ({ onPlatformSelect, onGenreSelect, onLoadAll }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>

      {!isCollapsed && (
        <>
          <div className={styles.section}>
            <h3>Platform</h3>
            <button onClick={() => onPlatformSelect("windows")}>Windows</button>
            <button onClick={() => onPlatformSelect("xbox")}>Xbox</button>
            <button onClick={() => onPlatformSelect("playstation")}>
              PlayStation
            </button>
          </div>

          <div className={styles.section}>
            <h3>Genre</h3>
            <button onClick={() => onGenreSelect("action")}>Action</button>
            <button onClick={() => onGenreSelect("adventure")}>
              Adventure
            </button>
            <button onClick={() => onGenreSelect("strategy")}>Strategy</button>
            <button onClick={() => onGenreSelect("rpg")}>RPG</button>
            <button onClick={() => onGenreSelect("shooter")}>Shooter</button>
            <button onClick={() => onGenreSelect("puzzle")}>Puzzle</button>
            <button onClick={() => onGenreSelect("sports")}>Sports</button>
            <button onClick={() => onGenreSelect("simulation")}>
              Simulation
            </button>
            <button onClick={() => onGenreSelect("family")}>Family</button>
            <button onClick={() => onGenreSelect("board_games")}>
              Board Games
            </button>
            <button onClick={() => onGenreSelect("card")}>Card Games</button>
            <button onClick={() => onGenreSelect("platformer")}>
              Platformer
            </button>
            <button onClick={() => onGenreSelect("fighting")}>Fighting</button>
            <button onClick={() => onGenreSelect("arcade")}>Arcade</button>
          </div>

          <div className={styles.section}>
            <h3>All Games</h3>
            <button onClick={onLoadAll}>Load All Games</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
*/
