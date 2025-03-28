const pool = require("../config/db");
require("dotenv").config();

const dashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get username
        const [result] = await pool.query(
            "SELECT user_name FROM users_auth WHERE user_id = ?", [userId]
        );
        const username = result.length ? result[0].user_name : null;

        // Get total points and rankings of user
        const [stats] = await pool.query(
            "SELECT total_points, current_rank, highest_rank FROM user_stats WHERE user_id = ?", [userId]
        );
        const { total_points, current_rank, highest_rank } = stats.length ? stats[0] : {};

        // Get highest scores of user in each subject
        const [scores] = await pool.query(
            `SELECT  hs.subject_id, s.subject_name, hs.scores
                FROM high_scores hs
                JOIN subjects s ON s.subject_id = hs.subject_id
                WHERE hs.user_id = ?
            `, [userId]
        );

        // Get user quiz attempts in each subject
        const [attempts] = await pool.query(
            `SELECT s.subject_id, s.subject_name, COUNT(ua.user_id) AS attempts
             FROM subjects s
             LEFT JOIN user_activity_log ua ON s.subject_id = ua.subject_id AND ua.user_id = ?
             GROUP BY s.subject_id, s.subject_name`,
            [userId]
        );

        // Get first users with top 3 ranks
        const [leaderboard] = await pool.query(
            `
                SELECT us.current_rank AS user_rank,ua.user_id,
                        ua.user_name, us.total_points
                FROM users_auth ua
                JOIN user_stats us ON ua.user_id = us.user_id
            
            ORDER BY user_rank`
        );
        

        // Get chapters for each subject
        const [quiz_chapters] = await pool.query(
            `SELECT c.subject_id, s.subject_name,
                    JSON_ARRAYAGG(JSON_OBJECT('chapter_id', chapter_id, 'chapter_name', chapter_name)) AS chapters
             FROM chapters c
             JOIN subjects s ON c.subject_id = s.subject_id
             GROUP BY c.subject_id`
        );

        quiz_chapters.forEach(subject => {
            subject.progress =  Math.floor(Math.random() * 101);// Assign random progress between 0 and 1
        });
        
        
        //console.log(quiz_chapters);
        
        res.json({
            success: true,
            user: {username: username, total_points:total_points, current_rank:current_rank, highest_rank: highest_rank },
            high_scores: scores,
            attempts: attempts,
            leaderboard: leaderboard,
            quiz_chapters: quiz_chapters
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = dashboard;
