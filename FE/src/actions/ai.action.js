const baseUrl = import.meta.env.VITE_BASE_URL;

export const askAI = async (formData) => {
  const response = await fetch(`${baseUrl}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
};
