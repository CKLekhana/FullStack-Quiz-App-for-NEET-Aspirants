import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ProgressBar, Button, Row, Col, Spinner } from "react-bootstrap";
import { Tooltip } from "bootstrap";
const api_url = "http://localhost:5000/api/discover";

const Discover = () => {
    const [quiz_chapters, setQuizchapters] = useState([]); // Ensure an array to prevent map() errors
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        } else {
            fetch(api_url, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    setQuizchapters(data.quiz_chapters || []);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/");
                });
        }
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                tooltipTriggerList.forEach((tooltipTriggerEl) => {
                    new Tooltip(tooltipTriggerEl);
                });
    }, [navigate]);

    return (
        <div className="discover-container">
            <div className="discover rounded">
                <div className="row p-3 gx-5 rounded d-flex justify-content-center">
                    {/* Sidebar Navigation */}
                    <div className="nav flex-column nav-pills rounded d-flex align-items-center justify-content-center">
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <button className="nav-link btn" onClick={() => navigate("/profile")}>Profile</button>
                            <button className="nav-link btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
                            <button className="nav-link btn active">Discover</button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button className="nav-link btn" onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");
                            }}>Log Out</button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="main col p-3 d-flex flex-column align-items-center">
                        <div className="col quiz-details rounded">
                            <div className="quiz-header d-flex justify-content-center align-items-center">
                                <h3 className="mb-0">Quizzes</h3>
                            </div>

                            {/* Show Loading Spinner While Fetching Data */}
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <div className="quiz-section">
                                    {quiz_chapters.length === 0 ? (
                                        <p className="text-center text-muted">No quizzes available.</p>
                                    ) : (
                                        quiz_chapters.map((subject, index) => (
                                            <Card key={index} className="card mb-3 shadow-sm">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <Card.Title className="mb-0">{subject.subject_name}</Card.Title>
                                                        <div style={{ width: "50%" }}>
                                                            <ProgressBar className="progress-bar" now={subject.progress} label={`${subject.progress}%`} />
                                                        </div>
                                                    </div>

                                                    {/* Display ALL Chapters */}
                                                    <Row className="chapter-section">
                                                        {subject.chapters.map((chapter, i) => (
                                                            <Col key={i} xs={6} md={4} className="mb-2">
                                                                <Card className="chapter p-1 text-center">
                                                                    <div className="chapter-name" data-bs-toggle="tooltip" data-bs-placement="top" title={chapter.chapter_name}>
                                                                        {chapter.chapter_name}
                                                                    </div>
                                                                    <Button variant="primary" size="sm">Start</Button>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discover;
