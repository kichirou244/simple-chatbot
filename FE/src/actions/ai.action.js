const baseUrl = import.meta.env.VITE_BASE_URL;

export const askAI = async (formData) => {
  const response = await fetch(`${baseUrl}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok)
    throw new Error(`API Error: ${response.status} ${response.statusText}`);

  const data = await response.json();

  return data;
};
