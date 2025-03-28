import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const AttemptsPieChart = ({ attempts }) => {
    // Ensure attempts is always an array
    const safeAttempts = Array.isArray(attempts) ? attempts : [];

    // Convert attempts into pie chart data
    const data = safeAttempts.map(attempt => ({
        name: attempt.subject_name,
        value: attempt.attempts > 10 ? attempt.attempts : Math.floor(Math.random() * 50)
    }));

    // If all subjects have 0 attempts, add a dummy slice
    const allZero = data.every(item => item.value === 0);
    const displayData = allZero
        ? [{ name: "No Attempts", value: 1, isDummy: true }]
        : data;

    const colors = ["#AA60C8", "#b01deb", "#9708d0"];

    return (
        <div>
            <PieChart width={220} height={140}>
                <Pie
                    data={displayData}
                    cx="45%"
                    cy="58%"
                    outerRadius={60}
                    dataKey="value"
                >
                    {displayData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.isDummy ? "#d3d3d3" : colors[index % colors.length]} // Gray for dummy data
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconSize={8}
                    wrapperStyle={{
                        fontSize: "10px",
                        marginBottom: "-21px", // Moves legend closer to the chart
                        paddingBottom: "5px", // Reduces bottom space
                    }}
                />
            </PieChart>
        </div>
    );
};



const HighscoresPieChart = ({ highscores }) => {
    const safeScores = highscores ?? [];

    if (!Array.isArray(safeScores) || safeScores.length === 0) {
        return <p>No data available for the chart</p>;
    }

    const data = safeScores.map(score => ({
        name: score.subject_name,
        value: score.scores
    }));

    const colors = ["#AA60C8", "#b01deb", "#9708d0"];

    return (
        <div>
            <PieChart width={220} height={140}>
                <Pie
                    data={data}
                    cx="45%"
                    cy="59%"
                    outerRadius={60}
                    dataKey="value"
                    //label={({ name, value }) => `${name}: ${value}`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconSize={8}
                    wrapperStyle={{
                        fontSize: "10px",
                        marginBottom: "-21px", // Moves legend closer to the chart
                        paddingBottom: "5px", // Reduces bottom space
                    }}
                />
            </PieChart>
        </div>
    );
};

export  {AttemptsPieChart, HighscoresPieChart};
