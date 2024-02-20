import {useState} from "react";
import {BsFillFileEarmarkPlusFill} from "react-icons/bs";
import {MdCloudDone} from "react-icons/md";
import toast from "react-hot-toast";

declare global {
    var cloudinary: any
}

type Props = {
    onChange: (e: string) => void
}

const CVupload = ({onChange}: Props) => {
    const [uploadedCVName, setUploadedCVName] = useState("")
    const uploadWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            maxFiles: 1,
            clientAllowedFormats: ["pdf", "doc", "docx"],
            maxFileSize: 5500000,
            folder: "JobFinder",
        },
        (error: any, result: any) => {
            if (!error && result && result.event === "success") {
                setUploadedCVName(result.info.original_filename)
                onChange(result.info.secure_url)
                toast.success("Завантажено")
            }
        }
    );

    return (
        <div
            onClick={() => uploadWidget.open()}
            className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed border-2 border-primary-main
                p-5
                flex flex-col
                justify-center items-center
                gap-4
                text-neutral-main
            "
        >
            {
                uploadedCVName
                    ?
                    <div className="flex justify-center items-center gap-2">
                        <MdCloudDone size={28}/>
                        {uploadedCVName}
                    </div>
                    :
                    <>
                        <BsFillFileEarmarkPlusFill size={40}/>
                        <div className="text-base font-light">
                            Click to upload your CV
                        </div>
                    </>
            }
        </div>
    )
};

export default CVupload;