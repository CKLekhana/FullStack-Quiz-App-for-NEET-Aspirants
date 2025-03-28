import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const api_url = "http://localhost:5000/api/profile";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState({ username: false, email: false });
    const [updatedUser, setUpdatedUser] = useState({ username: "", email: "" });
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${api_url}/user-data`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.success) {
            setUser(data.user);  // ✅ Ensure the UI updates
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetch(`${api_url}/user-data`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                    setUpdatedUser({ username: data.user.user_name, email: data.user.user_email });
                } else {
                    navigate("/");
                }
            })
            .catch(() => navigate("/"));
    }, [navigate]);

    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleChange = (e) => {
        console.log(e.target.name);
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const [showForm, setShowForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const resetForm = () => {
        setOldPassword("");
        setNewPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        setShowForm(false);
        resetForm(); // Reset after form submission
    };

    const handleSave = async (field) => {
        const endpoint = field === "username" ? "/change-username" : "/change-email";
        //console.log("Sending request to:", `${api_url}${endpoint}`);
        //console.log("Request body:", JSON.stringify({ [field]: updatedUser[field] }));

        const response = await fetch(`${api_url}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ [field]: updatedUser[field] })
        });

        const result = await response.json();
        //.log("Response status:", response.status);
        //console.log("Response JSON:", result);

        if (result.success) {
            await fetchUserData();
            setEditMode({ ...editMode, [field]: false });
        } else {
            alert("Failed to update " + field);
            setEditMode({ ...editMode, [field]: false });
        }
    };

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [confirmation, setConfirmation] = useState("");

    // Function to reset form fields
    const resetDeleteForm = () => {
        setConfirmation("");
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirmation === "DELETE") {
            console.log("Account Deleted!");
            // Call API to delete the account here
            setShowForm(false);
            resetForm(); // Reset form after submission
        } else {
            alert("Type 'DELETE' to confirm.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile rounded">
                <div className="row p-3 gx-5 rounded d-flex justify-content-center">
                    <div className="nav flex-column nav-pills rounded d-flex align-items-center justify-content-center">
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <button className="nav-link btn active">Profile</button>
                            <button className="nav-link btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
                            <button className="nav-link btn" onClick={() => navigate("/discover")}>Discover</button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button className="nav-link btn" onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");
                            }}>Log Out</button>
                        </div>
                    </div>

                    <div className="main col-9 d-flex flex-column align-items-center justify-content-start">
                        {/* Username Field */}
                        <div className="cont d-flex flex-row align-items-center justify-content-between">
                            <div>User Name</div>
                            {editMode.username ? (
                                <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
                            ) : (
                                <h3>{user?.user_name || "Loading..."}</h3>
                            )}
                            {editMode.username ? (
                                <>
                                    <button onClick={() => handleSave("username")}>Save</button>
                                    <button onClick={() => setEditMode({ ...editMode, username: false })}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => handleEdit("username")}>Edit</button>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="cont d-flex flex-row align-items-center justify-content-between">
                            <div>User Email</div>
                            {editMode.email ? (
                                <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
                            ) : (
                                <h3>{user?.user_email || "Loading..."}</h3>
                            )}
                            {editMode.email ? (
                                <>
                                    <button onClick={() => handleSave("email")}>Save</button>
                                    <button onClick={() => setEditMode({ ...editMode, email: false })}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => handleEdit("email")}>Edit</button>
                            )}
                        </div>

                        <div className="cont cont-3 d-flex flex-row align-items-center justify-content-between">
                            <div style={{ textAlign: "center", marginTop: "50px" }}>
                                {/* 🔵 Button to Open Form */}
                                <button
                                    onClick={() => setShowForm(true)}
    
                                >
                                    Change Password
                                </button>

                                {/* 🔄 Password Form (Pop-up) */}
                                {showForm && (
                                    <div style={{
                                        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                                        background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                                        width: "400px", textAlign: "left"
                                    }}>
                                        <h3>Change Password</h3>

                                        <form onSubmit={handleSubmit}>
                                        <div style={{ display: "flex", flexDirection:"column",justifyContent: "center", marginTop: "10px" , gap:"10px"}}>
                                                <label>Old Password</label>
                                            <input
                                                type="password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                style={{ width: "100%", padding: "8px", marginBottom: "10px", border:"1px solid #64038a" }}
                                                required
                                            />
                                            </div>  

                                                <div style={{ display: "flex", flexDirection:"column",justifyContent: "center", marginTop: "10px" , gap:"10px"}}>
                                                <label>New Password</label>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                style={{ width: "100%", padding: "8px", marginBottom: "10px", border:"1px solid #64038a" }}
                                                required
                                            />
                                            </div>        
                                            

                                            {/* 🔄 Buttons */}
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" , gap:"10px"}}>
                                                <button type="submit" style={{ padding: "8px 15px", background: "green", color: "white", border: "none", borderRadius: "5px", width:"100px" }}>
                                                    Save
                                                </button>
                                                <button type="button" onClick={() => {setShowForm(false); resetForm();}} style={{ padding: "8px 15px", background: "red", color: "white", border: "none", borderRadius: "5px", width:"100px" }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                            <div style={{ textAlign: "center", marginTop: "50px" }}>
            {/* 🔴 Button to Open Delete Form */}
            <button 
                onClick={() => setShowDeleteForm(true)} 
                style={{
                    padding: "10px 20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Delete Account
            </button>

            {/* ⚠ Delete Account Confirmation Pop-up */}
            {showDeleteForm && (
                <div style={{
                    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                    width: "400px", textAlign: "left"
                }}>
                    <h3 style={{ color: "red" }}>⚠ Confirm Deletion</h3>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                        This action **CANNOT** be undone. Type <b>'DELETE'</b> to confirm.
                    </p>

                    <form onSubmit={handleDelete}>
                        
                        {/* 🔄 Buttons */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap:"5px"}}>
                            <button type="submit" style={{ padding: "8px 15px", background: "red", color: "white", border: "none", borderRadius: "5px", width:"100px" }}>
                                Delete
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setShowDeleteForm(false);
                                    resetDeleteForm(); // Reset form when closing
                                }} 
                                style={{ padding: "8px 15px", background: "gray", color: "white", border: "none", borderRadius: "5px", width:"100px" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
                                        
                                    
                            
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default Profile;
