import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {storage} from "./firebase";

export const uploadImageToFirebase = async (file: File, path: string): Promise<string> => {
    const uuid = crypto.randomUUID();
    const imageRef = storageRef(storage, `${path}/${uuid}`);
    const snapshot = await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref);
};
