function getBlobData(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result as string;
      console.log(data);
      resolve(data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function transcribeAudio(blob: Blob) {
  return getBlobData(blob).then((data) => {
    return fetch("https://localhost:5000/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_path: data }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data as {
          transcription: string;
        };
      });
  });
}