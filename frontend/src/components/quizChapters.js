import React, {useEffect} from "react";
import { Card, ProgressBar, Button, Row, Col } from "react-bootstrap";
import { Tooltip } from "bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation


const QuizSection = ({quizChapters}) => {

    const safequizChapters = Array.isArray(quizChapters) ? quizChapters : [];

    const navigate = useNavigate(); // Navigation hook
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    }, []);
    return (
        <div className="quiz-section p-3 ">
            
            {safequizChapters.map((subject, index) => (
                <Card key={index} className="card mb-3 shadow-sm">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Card.Title className="mb-0">{subject.subject_name}</Card.Title>
                            <div style={{ width: "50%" }}>
                                <ProgressBar className="progress-bar" now={subject.progress} label={`${subject.progress}%`} />
                            </div>
                        </div>
                        <div className="chapter-section">
            {subject.chapters.slice(0, 3).map((chapter, i) => (
                <Col key={i} xs={6} md={4} className="mb-2">
                    <Card className="chapter p-1 text-center">
                        <div className="chapter-name" data-bs-toggle="tooltip" data-bs-placement="top" title={chapter.chapter_name}>
                            {chapter.chapter_name}
                        </div>
                        <Button variant="primary" size="sm">Start</Button>
                    </Card>
                </Col>
            ))}

            {/* "View All" Button */}
            <div className="next text-center mt-3">
                <Button 
                    variant="secondary" 
                    onClick={() => navigate(`/discover?subject=${subject.subject_id}`)}
                >
                    <img src={require("../logos/next.png")} width={30} height={30} alt="Next" />
                </Button>
            </div>
        </div>


                    </Card.Body>
                </Card>
            ))}
        </div>
        
    );
};

export default QuizSection;
