import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  GiConsoleController,
} from "react-icons/gi"; // Genre icons from react-icons
import { CgCardSpades } from "react-icons/cg";
import styles from "../styles/sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleGenreClick = (genre) => {
    navigate(`/games/${genre}`);
  };

  const handlePlatformClick = (platform) => {
    navigate(`/games/platform/${platform}`);
  };

  const handleLoadAllGames = () => {
    navigate("/games/all");
  };

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
            <button onClick={() => handlePlatformClick("windows")}>
              <FaWindows className={styles.icon} /> Windows
            </button>
            <button onClick={() => handlePlatformClick("xbox")}>
              <FaXbox className={styles.icon} /> Xbox
            </button>
            <button onClick={() => handlePlatformClick("playstation")}>
              <FaPlaystation className={styles.icon} /> PlayStation
            </button>
          </div>

          <div className={styles.section}>
            <h3>Genre</h3>
            <button onClick={() => handleGenreClick("action")}>
              <GiSwordman className={styles.icon} /> Action
            </button>
            <button onClick={() => handleGenreClick("adventure")}>
              <GiGlobe className={styles.icon} /> Adventure
            </button>
            <button onClick={() => handleGenreClick("strategy")}>
              <PiStrategyBold className={styles.icon} /> Strategy
            </button>
            <button onClick={() => handleGenreClick("role-playing-games-rpg")}>
              <GiDungeonGate className={styles.icon} /> RPG
            </button>
            <button onClick={() => handleGenreClick("shooter")}>
              <GiPistolGun className={styles.icon} /> Shooter
            </button>
            <button onClick={() => handleGenreClick("puzzle")}>
              <GiPuzzle className={styles.icon} /> Puzzle
            </button>
            <button onClick={() => handleGenreClick("sports")}>
              <GiSoccerBall className={styles.icon} /> Sports
            </button>
            <button onClick={() => handleGenreClick("racing")}>
              <GiRaceCar className={styles.icon} /> Racing
            </button>
            <button onClick={() => handleGenreClick("simulation")}>
              <GiRaceCar className={styles.icon} /> Simulation
            </button>
            <button onClick={() => handleGenreClick("family")}>
              <MdFamilyRestroom className={styles.icon} /> Family
            </button>
            <button onClick={() => handleGenreClick("board-games")}>
              <GiEmptyChessboard className={styles.icon} /> Board Games
            </button>
            <button onClick={() => handleGenreClick("card")}>
              <CgCardSpades className={styles.icon} /> Card Games
            </button>
            <button onClick={() => handleGenreClick("platformer")}>
              <GiLaddersPlatform className={styles.icon} /> Platformer
            </button>
            <button onClick={() => handleGenreClick("fighting")}>
              <GiBoxingGlove className={styles.icon} /> Fighting
            </button>
            <button onClick={() => handleGenreClick("arcade")}>
              <SiApplearcade className={styles.icon} /> Arcade
            </button>
          </div>

          <div className={styles.section}>
            <h3>All Games</h3>
            <button onClick={() => handleLoadAllGames("/games/all")}>
              <GiConsoleController className={styles.icon} /> Load All Games
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
