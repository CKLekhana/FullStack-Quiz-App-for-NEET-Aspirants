import React from "react";
import { Table } from "react-bootstrap";

const Leaderboard = ({leaderboard}) => {
    const safeleaderboard = Array.isArray(leaderboard) ? leaderboard : [];
    return (
        <div className="leaderboard-section">
            <Table bordered hover responsive className="leaderboard-table shadow-sm">
                <thead className="lb-table-header">
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody className="lb-table-body">
                    {safeleaderboard.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.user_rank}</td>
                            <td>{user.user_name}</td>
                            <td>{user.total_points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Leaderboard;
