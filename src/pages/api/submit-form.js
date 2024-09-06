import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  console.log("Form submission received");
  
  try {
    const data = await request.formData();
    const formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phone: data.get('phone'),
      email: data.get('email'),
      message: data.get('message'),
      timestamp: new Date().toISOString()
    };

    console.log("Form data received:", formData);

    // Read the current submissions
    const filePath = path.join(process.cwd(), 'submissions.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Add the new submission
    jsonData.submissions.push(formData);

    // Write the updated submissions back to the file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: "Form data received and saved successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error processing form submission:", error);

    return new Response(JSON.stringify({ message: "Error processing form submission", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}