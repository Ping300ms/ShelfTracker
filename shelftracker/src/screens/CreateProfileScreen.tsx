import TopBar from "../components/common/TopBar.tsx";
import CreateProfileForm from "../components/createProfileScreen/CreateProfileForm.tsx";

function CreateProfileScreen() {

    return (
        <div className="create-profile-container">
            <TopBar title="Nouveau profil" />
            <CreateProfileForm />
        </div>
    );
}

export default CreateProfileScreen;
