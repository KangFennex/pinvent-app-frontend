import { useEffect, useState } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader"
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";


const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectUser);
    const { email } = user;


    useEffect(() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email, navigate])


    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        picture: user?.picture,
    }

    const [profile, setProfile] = useState(initialState);
    const [profilePicture, setProfilePicture] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value })
    };

    const handleImageChange = (e) => {
        setProfilePicture(e.target.files([0]))
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Handle image upload
            let imageURL;
            if (
                profilePicture &&
                (
                    profilePicture.type === "image/jpeg" ||
                    profilePicture.type === "image/jpg" ||
                    profilePicture.type === "image/png"
                )
            ) {
                const image = new FormData()
                image.append("file", profilePicture)
                image.append("cloud_name", "dxynlegpc")
                image.append("upload_preset", "lvvcpkbr")

                // First save image to cloudinary
                const response = await fetch(
                    "https://api.cloudinary.com/v2/dxynlegpc/image/upload",
                    { method: "post", body: image }
                );
                const imgData = await response.json();
                imageURL = imgData.url.toString();
                toast.success("Image uploaded successfully");
            }
            // Save profile
            const formData = {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                picture: profilePicture ? imageURL : profile.picture,
            };
            const data = await updateUser(formData)
            console.log(data)
            toast.success("User updated")
            setIsLoading(false)
            navigate("/profile")

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <div className="profile --my2">
            {isLoading && <Loader />}

            <Card cardClass={"card --flex-dir-column"}>
                <span className="profile-photo">
                    <img src={user?.picture} alt="Profile Pic" />
                </span>
                <form className="--form-control --m" onSubmit={saveProfile}>
                    <span className="profile-data">
                        <p>
                            <label>Name:</label>
                            <input type="text" name="name" value={profile?.name} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Email:</label>
                            <input type="text" name="email" value={profile?.email} disabled />
                            <br />
                            <code>Email cannot be changed</code>
                        </p>
                        <p>
                            <label>Phone:</label>
                            <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Bio:</label>
                            <textarea name="bio" value={profile?.bio} onChange={handleInputChange} cols="30" rows="10"></textarea>
                        </p>
                        <p>
                            <label>Photo:</label>
                            <input type="file" name="picture" onChange={handleImageChange} cols="30" rows="10" />
                        </p>
                        <div>
                            <button className="--btn --btn-primary">Confirm Changes</button>
                        </div>
                    </span>
                </form>
            </Card>
            <br />
            <ChangePassword />
        </div>
    )
}

export default EditProfile
