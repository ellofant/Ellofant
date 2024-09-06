export async function POST({ request }) {
    console.log("Form submission received");
    
    try {
      const data = await request.formData();
      const formData = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        phone: data.get('phone'),
        email: data.get('email'),
        message: data.get('message')
      };
  
      console.log("Form data received:", formData);
  
      return new Response(JSON.stringify({ message: "Form data received successfully" }), {
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