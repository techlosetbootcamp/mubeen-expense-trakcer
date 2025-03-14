import { View, Text, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import styles from "./UpdateProfile.style";
import useUpdateProfile from "./useUpdateProfile";

const UpdateProfile = () => {
  const {
    navigation,
    username,
    profilePicture,
    handleUpdateProfile,
    setUsername,
    email,
    setEmail,
    isUpdating,
    handleImagePick,
  } = useUpdateProfile();

  const renderAvatar = () => {
    if (profilePicture) {
      return <Image source={{ uri: `data:image/jpeg;base64,${profilePicture}` }} style={styles.profileImage} />;
    }
    const firstLetter = username?.charAt(0)?.toUpperCase() || "?";
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{firstLetter}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrowText}>
        <AntDesign
          name="arrowleft"
          size={36}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.header, { marginLeft: 70, marginTop: 2 }]}>
          Update Profile
        </Text>
      </View>

      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={() => handleImagePick(false)}>
          {renderAvatar()}
        </TouchableOpacity>
        <TouchableOpacity style={styles.pencilIconContainer} onPress={() => handleImagePick(true)}>
          <SimpleLineIcons name="pencil" size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter new email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter new name"
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <View style={styles.modalButton}>
          <TouchableOpacity
            onPress={handleUpdateProfile}
            disabled={!isUpdating}
          >
            <Text style={styles.modalButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;