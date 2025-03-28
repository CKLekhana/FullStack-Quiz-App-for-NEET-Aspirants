import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { AttemptsPieChart, HighscoresPieChart } from "../components/charts";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizSection from "../components/quizChapters";
import Leaderboard from "../components/Leaderboard";

const api_url = "http://localhost:5000/api/dashboard"

const Dashboard = () => {
    const [user, setUser] = useState(null); // user updation
    const [high_scores, setHighscores] = useState(null); // highscores
    const [attempts, setAttempts] = useState(null); //attempts
    const [leaderboard, setLeaderboard] = useState(null); //leaderboard
    const [quiz_chapters, setQuizchapters] = useState(null); // quiz_chapters
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        //console.log(token);
        if (!token)
            navigate("/");
        else {
            fetch(`${api_url}`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data.user);
                    setHighscores(data.high_scores);
                    setAttempts(data.attempts);
                    setLeaderboard(data.leaderboard);
                    setQuizchapters(data.quiz_chapters);
                })
                .catch(() => navigate("/"));

        }
    }, [navigate]);

    //console.log(leaderboard);
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard rounded">
                <div className="row p-3 gx-5 rounded d-flex justify-content-center">


                    <div className="nav flex-column nav-pills rounded d-flex align-items-center justify-content-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <button className="nav-link btn" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={()=>navigate("/profile")}>Profile</button>
                            <button className="nav-link btn active" id="v-pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-dashboard" type="button" role="tab" aria-controls="v-pills-dashboard" aria-selected="true">Dashboard</button>
                            <button className="nav-link btn" id="v-pills-discover-tab" data-bs-toggle="pill" data-bs-target="#v-pills-discover" type="button" role="tab" aria-controls="v-pills-discover" aria-selected="false" onClick={()=>navigate("/discover")}>Discover</button>
                            
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button className="nav-link btn" id="v-pills-logout-tab" data-bs-toggle="pill" data-bs-target="#v-pills-logout" type="button" role="tab" aria-controls="v-pills-logout" aria-selected="false" onClick={logout}>Log Out</button>

                        </div>

                    </div>


                    <div className="main col-9">
                        <div className="row user-details rounded">
                            <div className="user-intro d-flex justify-content-between align-items-center flex-row">
                                <h3>Welcome, <span>{user && user.username}</span> !!!</h3>
                                <div className="points-coin-logo d-flex justify-content-between align-items-center flex-row">
                                    <img src={require("../logos/coins.png")} width={30} height={30} />
                                    <div className="points">{user && user.total_points || 350}</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-row justify-content-between">
                                <div>
                                    <div className="d-flex align-items-center flex-column justify-content-center">
                                        <h6>Quiz Attempts</h6>
                                        <AttemptsPieChart attempts={attempts} />
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center flex-column justify-content-center">
                                        <h6>High Scores</h6>
                                        <HighscoresPieChart highscores={high_scores} />
                                    </div>
                                </div>
                                <div>
                                    <div className="achievements-container rounded">
                                        <h6 className="achievement-title">Achievements</h6>

                                        <div className="achievement-item">
                                            <div className="d-flex align-items-center justify-content-center flex-row">
                                                Current Rank
                                            </div>
                                            <div className="achievement-value">{user && user.current_rank || 23}</div> {/* Example static value */}
                                        </div>

                                        <div className="achievement-item">
                                            <div className="d-flex align-items-center justify-content-center flex-row">
                                                Highest Rank
                                            </div>
                                            <div className="achievement-value">{user && user.highest_rank || 4}</div> {/* Example static value */}
                                        </div>

                                        <div className="achievement-item">
                                            <div className="d-flex align-items-center justify-content-center flex-row">
                                                Badges Earned
                                            </div>
                                            <div className="achievement-value">10</div> {/* Example static value */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row quiz-leaderboard rounded">
                            <div className="col quiz-details rounded p-3">
                                <div className="quiz-header d-flex justify-content-between align-items-center flex-row ">

                                    <h6 className="mb-0">Quizzes</h6>
                                    <div className="view-all d-flex justify-content-between align-items-center flex-row">
                                        View All
                                    </div>

                                </div>
                                <QuizSection quizChapters={quiz_chapters}/>
                            </div>
                            <div className="col leaderboard-details rounded p-3">
                                <div className="leaderboard-header d-flex justify-content-between align-items-center flex-row ">

                                    <h6 className="mb-0">Leaderboard</h6>
                                    <div className="your-rank d-flex justify-content-between align-items-center flex-row">
                                        Your Rank
                                    </div>

                                </div>
                                <Leaderboard leaderboard={leaderboard}/>
                            </div>

                        </div>

                    </div>

                </div >
            </div>
        </div>
    );
};

export default Dashboard;