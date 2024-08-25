export const getBase64FileType = async (string) => {
    let fileType = "";
    if (string.startsWith("/9j/")) {
        fileType = "jpeg";
    } else if (string.startsWith("iVBORw0KGgo")) {
        fileType = "png";
    } else if (string.startsWith("R0lGODlh") || string.startsWith("R0lGODdh")) {
        fileType = "gif";
    } else if (string.startsWith("JVBERi0x")) {
        fileType = "pdf";
    } else {
        fileType = "unknown";
    }
    return fileType;
};

export const getFileSize = async (file) => {
    const padding = file.endsWith("==") ? 2 : file.endsWith("=") ? 1 : 0;
    const base64Length = file.length;
    const fileSizeInBytes = (base64Length * 3) / 4 - padding;
    const fileSize = fileSizeInBytes / 1024;
    return fileSize;
};
