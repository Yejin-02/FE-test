import React from "react";

type PostFormProps = {
  postTitle: string;
  postBody: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  onRemoveFile: (file: File) => void;
};

const PostForm: React.FC<PostFormProps> = ({
  postTitle,
  postBody,
  onTitleChange,
  onBodyChange,
  onFileChange,
  selectedFiles,
  onRemoveFile,
}) => (
  <div>
    <input
      type="text"
      value={postTitle}
      onChange={onTitleChange}
      placeholder="제목"
      style={{ width: "1000px" }}
      required
    />
    <textarea
      value={postBody}
      onChange={onBodyChange}
      placeholder="내용"
      style={{ width: "1000px" }}
      required
    />
    <input type="file" accept="image/*" multiple onChange={onFileChange} />
    <div>
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>첨부된 이미지 미리보기:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedFiles.map((file, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  onClick={() => onRemoveFile(file)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default PostForm;
