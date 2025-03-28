const pool = require("../config/db");
require("dotenv").config();

const discover = async (req, res) => {
    try {

        // Get chapters for each subject
        const [quiz_chapters] = await pool.query(
            `SELECT c.subject_id, s.subject_name,
                    JSON_ARRAYAGG(JSON_OBJECT('chapter_id', chapter_id, 'chapter_name', chapter_name)) AS chapters
             FROM chapters c
             JOIN subjects s ON c.subject_id = s.subject_id
             GROUP BY c.subject_id`
        );
        
        //console.log(quiz_chapters);
        quiz_chapters.forEach(subject => {
            subject.progress =  Math.floor(Math.random() * 101);// Assign random progress between 0 and 1
        });
        
        res.json({
            success: true,
            quiz_chapters: quiz_chapters
        });
    } catch (error) {
        console.error("Quiz Chapters Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = discover;
